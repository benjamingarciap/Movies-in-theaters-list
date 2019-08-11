import React,  { Component, useState, useEffect } from 'react'
import axios from 'axios'
import service from '../../services/api-service'
import { Link } from 'react-router-dom'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
//spiner
import CircularProgress from '@material-ui/core/CircularProgress';


class EditMovie extends Component {
  constructor(){
    super()
    this.state = {
      title : '',
      director: '',
      stars: '',
      imageUrl: '',
      description: '',
      showtimes: '',
      trailer: ''
    }
  
    // this.state = {}
  }
  
  getSingleMovie = () => {
    const { params } = this.props.match
    
    console.log(this.props)
    axios.get(`http://localhost:5000/api/movies/${params.id}`)
    .then( responseFromApi =>{
      console.log(responseFromApi)
      const theMovie = responseFromApi.data
      this.setState({...this.state, 
        title: theMovie.title,
        director: theMovie.director,
        stars: theMovie.stars,
        imageUrl: theMovie.imageUrl,
        description: theMovie.description,
        showtimes: theMovie.showtimes,
        trailer: theMovie.trailer
      })
    })
    .catch(err=> console.log(err))
  }
  componentDidMount(){
    this.getSingleMovie()
    const { classes } = this.props
  }
  handleFormSubmit = (e) => {
    const title = this.state.title
    const director = this.state.director
    const stars = this.state.stars
    const imageUrl = this.state.imageUrl
    const description = this.state.description
    const showtimes = this.state.showtimes
    const trailer = this.state.trailer

    e.preventDefault()
    const { params } = this.props.match
    //axios.put(`http://localhost:5000/api/movies/${this.props.theMovie._id}`, {title, director, stars, imageUrl, description, showtimes, trailer})
    axios.put(`http://localhost:5000/api/movies/${params.id}`, {title, director, stars, imageUrl, description, showtimes, trailer})
    .then(()=> {
     // this.props.getTheMovie()
    })
    .catch( err => console.log(err) )
  }
  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name] : value })
  }
  // handleChangeTitle = (event) => {  
  //   this.setState({
  //     title:event.target.value
  //   })
  // }
  
  //this method handles just the file upload
  handleFileUpload = e => {
    console.log(`The file to be uploaded is: ${e.target.files[0]}`)

    const uploadData = new FormData()
    uploadData.append('image', e.target.files[0])

    service.handleUpload(uploadData)
    .then(response => {
      //console.log(`response is ${response}`)
      this.setState({ imageUrl: response.secure_url})
    })
    .catch(err => {
      console.log(`Error while uploading the file: ${err}`)
    })
  }
  render(){
      return(
        <div id="edit-container">
          <h3>Edit form</h3>
          <form onSubmit={this.handleFormSubmit}>
            <label>Title:</label>
            <input type="text" name="title" value={!this.state.title ? undefined :this.state.title} onChange={e => this.handleChange(e)}/> 
            <label>Director:</label>
            <input type="text" name="director" value={this.state.director} onChange={e => this.handleChange(e)}/>
            <label>Stars:</label>
            <input type="text" name="stars" value={this.state.stars} onChange={e => this.handleChange(e)}/>
            <label>Description:</label>
            <textarea name="description" value={this.state.description} onChange={e => this.handleChange(e)}/>
            <label>Trailer link</label>
            <input type="text" name="trailer" value={this.state.trailer} onChange={e => this.handleChange(e)}/>
            <label>Image</label>
            <input type="file" onChange={(e) => this.handleFileUpload(e)} />  
            <input type="submit" value="submit" />
          </form>
          <Link to={`/movies/${this.props.match.params.id}`}>Back</Link>
        </div>
      )
  }

}
export default EditMovie