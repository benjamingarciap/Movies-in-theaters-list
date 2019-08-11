import React, { Component } from "react"
import service from "../../services/api-service"
import { Link } from "react-router-dom"

class AddMovie extends Component {
  constructor(props){
    super(props)
    this.state = {
      title : '',
      director: '',
      stars: '',
      imageUrl: '',
      description: '',
      showtimes: '',
      trailer: ''
    }
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]:value })
  }

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

  //this method submit the form
  handleSubmit = e => {
    e.preventDefault()

    service.saveNewMovie(this.state)
    .then(res => {
      console.log(`added: ${res}`)
    })
    .catch(err => {
      console.log(`Error while adding the movie to the database: ${err}`)
    })
  }

  render(){
    console.log(this.state)
    return(
      <div>
      <h2>New Movie</h2>
      <form onSubmit={e => this.handleSubmit(e)}>
          <label>Title</label>
          <input 
              type="text" 
              name="title" 
              value={ this.state.title } 
              onChange={ e => this.handleChange(e)} />
          <label>Director</label>
          <input 
              type="text" 
              name="director" 
              value={ this.state.director } 
              onChange={ e => this.handleChange(e)} />
          <label>Stars</label>
          <input 
              type="text" 
              name="stars" 
              value={ this.state.stars } 
              onChange={ e => this.handleChange(e)} />
          <label>Description</label>
          <textarea 
              type="text" 
              name="description" 
              value={ this.state.description } 
              onChange={ e => this.handleChange(e)} />
          <label>Trailer URL</label>
          <input 
              type="text" 
              name="trailer" 
              value={ this.state.trailer } 
              onChange={ e => this.handleChange(e)} />
          <input 
              type="file" 
              onChange={(e) => this.handleFileUpload(e)} /> 
          <button type="submit">Save new Movie</button>
          <Link to='/'>Back</Link>
      </form>
    </div>
    )
  }
}

export default AddMovie