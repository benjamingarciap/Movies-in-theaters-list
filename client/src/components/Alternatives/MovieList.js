import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

//material-ui
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
//material-ui grid
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
//material-ui card
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


class MovieList extends Component {
  constructor(props){
    super(props)
    this.state = {listOfMovies: []}
  }

  getAllMovies = () =>{
    axios.get('http://localhost:5000/api/movies')
    .then(resFromApi => {
      console.log(resFromApi)
      this.setState({
        listOfMovies:resFromApi.data
      })
    })
    .catch(err=>{console.log("this error while fetching movies from the api", err)})
  }

  componentWillMount() {
    this.getAllMovies()
  }
  
  

  render(){
    return(
        <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <div>
            <Link to="/movies/add">Add movie</Link>
              {this.state.listOfMovies.map((movie)=>{
                return(

                <div key={movie._id} className="movie-card-container">
                    <div className="movie-card-top">
                      <img src={movie.imageUrl} alt={`${movie.title} poster`}></img>
                      <Link to={`/movies/${movie._id}`}><h3>{movie.title}</h3></Link>
                      <div>
                        <h4>Director</h4>
                        <p>{movie.director}</p>
                      </div>
                      <div className="stars">
                        <h4>Stars</h4>
                        {console.log(this.state)}
                        {movie.stars.map((star, idx)=>{
                          return(<p key={idx}>{star}</p>)
                        })}
                      </div>
                      {/* <div>
                        <h4>Trailer</h4>
                        <iframe src={movie.trailer} title={movie.title}
                        width="560" height="315" frameBorder="0" allowFullScreen></iframe>
                      </div> */}
                      </div>
                      <div className="description">
                        <p>{movie.description}</p>
                      </div>
                // </div>
                ) 
              })}
            </div>
        </Container>
        </React.Fragment>

    )
  }

}
export default MovieList