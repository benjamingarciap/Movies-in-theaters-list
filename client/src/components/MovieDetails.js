import React, {  useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3, 2),
  },
  paper: {
    padding: theme.spacing(2, 2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const MovieDetails = (props) => {
  const classes = useStyles();
  const [data, setData] = useState({ movie:[] })


  useEffect(()=>{
    axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
    .then( responseFromApi =>{

      setData({ movie:responseFromApi.data })

    })
    .catch(err=> console.log(err))
  },[])

  const deleteMovie = () => {
        const { params } = props.match
        axios.delete(`http://localhost:5000/api/movies/${params.id}`)
        .then( responseFromApi=>{
          props.history.push('/')
        })
        .catch((err)=>console.log(err))
      }

  return (
    <div className={classes.root} id="detail-container"> 
        <Container maxWidth="md">
          <Paper className={classes.root}>
          <Paper className={classes.root} id="disappear">
              <div className='poster-container-father'>
                    <img alt={data.movie.title} src={data.movie.backdrop_path ? !data.movie.poster_path.split('/').includes("null") ?  `http://image.tmdb.org/t/p/original/${data.movie.backdrop_path}` : "https://res.cloudinary.com/dsncbmlkl/image/upload/v1565452396/placeholder2_syxiud.jpg" : null } className="poster-detail"/>
              </div>
            </Paper>
            <Paper className={classes.root}>
              <div className='detail-top-container'>
                    <div className='detail-image-container'>
                      <img alt={`${data.movie.title} poster`} src={data.movie.poster_path ? data.movie.poster_path.split('/').includes("null") ? 'https://res.cloudinary.com/dsncbmlkl/image/upload/v1565452396/placeholder2-sm_swvm3j.jpg' : data.movie.poster_path.split('.').includes("cloudinary") ? data.movie.poster_path : `http://image.tmdb.org/t/p/w500/${data.movie.poster_path}` : 'https://res.cloudinary.com/dsncbmlkl/image/upload/v1565452396/placeholder2-sm_swvm3j.jpg' } className="image-detail"/>
                    </div>
                    <div className='detail-text-container'>
                       <h1>{data.movie.title}</h1>
                       <p className="director"><span class="bold-text">Vote average:</span> {data.movie.vote_average}</p>
                       <div className="star-container">
                       <p className="director"><span class="bold-text">Popularity count:</span> {data.movie.popularity}</p>                  
                       </div> 
                       <div className="star-container">
                       <p className="director"><span class="bold-text">Original language:</span> {data.movie.original_language}</p>                  
                       </div> 
                       <div className="star-container">
                       <p className="director"><span class="bold-text">Release date:</span> {data.movie.release_date}</p>                  
                       </div> 
                       <div className='p-container'>
                         <h4>Description:</h4>
                         <p>{data.movie.overview}</p>
                       </div>
                    </div>
                    <div className='detail-button-container'>
                      <div className="upload-button-modal">
                        <Link to={`/movies/edit/${data.movie._id}` } className='detail-button'>Edit</Link>
                        <Link to="#" onClick={()=> deleteMovie() } className='detail-button'>Delete</Link>
                      </div>
                        <Link to="/" className='detail-link'>Back to movies</Link>
                    </div>
              </div>
            </Paper>
          </Paper>
        </Container>
    </div>
  );
};

export default MovieDetails;

