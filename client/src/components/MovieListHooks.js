import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

//material-ui
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

//material-ui grid
import Grid from '@material-ui/core/Grid';
//material-ui card
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//material-ui-stepper
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
//navbar
import Navbar from './Navbar'



//material-ui styles
const useStyles = makeStyles(theme=>({
  cardAction: {
    display: 'block',
    textAlign: 'initial'
  },
  root: {
    flexGrow: 1,
  },
  stepper: {
    maxWidth: 400,
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 500,
  },
}));



const MovieList = (props) => {

  //states
  const [value, setValue] = useState({listOfMovies: []});
  //state of steper
  const [activeStep, setActiveStep] = useState(1);
  //state search
  const [searchValue, setSearchValue] = useState("")
  


  const classes = useStyles();
  const theme = useTheme();

  useEffect(()=>{
    //get all movies 
    const numOfMoviesOnView = 22
    axios.get(`${process.env.REACT_APP_API_URL}/api/movies?pageNo=${activeStep}&size=${numOfMoviesOnView}`)
    .then(resFromApi => {
      setValue({ listOfMovies:resFromApi.data.message })
    })
    .catch(err=>{console.log("this error while fetching movies from the api", err)})
  },[])
  
  const deleteProject = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/movies/${id}`)
    .then( responseFromApi =>{
        window.location.reload()
    })
    .catch((err)=>{
        console.log(err)
    })
  }


  //stepper
  function handleNext() {
    setActiveStep(prevActiveStep => {
      return prevActiveStep + 1 
    });
    const numOfMoviesOnView = 22
    axios.get(`${process.env.REACT_APP_API_URL}/api/movies?pageNo=${activeStep+1}&size=${numOfMoviesOnView}`)
    .then(resFromApi => {
      setValue({ listOfMovies:resFromApi.data.message })
    })
    .catch(err=>{console.log("this error while fetching movies from the api", err)})

  }
  function handleBack() {
    if(activeStep < 2 ){
      return null 
    }
    setActiveStep(prevActiveStep => prevActiveStep - 1 );
    const numOfMoviesOnView = 22
    axios.get(`${process.env.REACT_APP_API_URL}/api/movies?pageNo=${activeStep-1}&size=${numOfMoviesOnView}`)
    .then(resFromApi => {
      setValue({ listOfMovies:resFromApi.data.message })
    })
    .catch(err=>{console.log("this error while fetching movies from the api", err)})
  }


  return (
    <React.Fragment>

              <Navbar/>
     
              <MobileStepper
               //id='fixed-stepper'
               variant="progress"
               steps={45}
               position="static"
               activeStep={activeStep}
               className={classes.root}
               nextButton={
                 <Button size="small" onClick={handleNext} disabled={activeStep === 45}>
                   Next
                   {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                 </Button>
               }
               backButton={
                 <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                   {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                   Back
                 </Button>
               }
               />
              

                <CssBaseline />
                <div className='spacer'/>
                <Container maxWidth="lg">
                  <div className={classes.root}>
                  <Grid container spacing={3}>     
                      {value.listOfMovies ? value.listOfMovies.map((movie)=>{
                            return(
                            <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id} className="movie-card-container">
                                <Card className={classes.card}>
                                    <CardActionArea>
                                      <Link to={`/movies/${movie._id}`} style={{ textDecoration: 'none'}}><CardMedia
                                        className={classes.media}
                                        image={movie.poster_path ? movie.poster_path.split('/').includes("null") ? 'https://res.cloudinary.com/dsncbmlkl/image/upload/v1565452396/placeholder1-lg_c8c5eh.jpg' : movie.poster_path.split('.').includes("cloudinary") ? movie.poster_path : `http://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'https://res.cloudinary.com/dsncbmlkl/image/upload/v1565452396/placeholder1-lg_c8c5eh.jpg'}
                                        title={movie.title}
                                      /></Link>
                                      <Link to={`/movies/${movie._id}`} style={{ textDecoration: 'none'}}><CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                          {movie.title}
                                        </Typography>
                                      </CardContent></Link>
                                    </CardActionArea>
                                    <CardActions>
                                      <Button size="small" color="primary">
                                        <Link to={`/movies/${movie._id}`}>View</Link>
                                      </Button>
                                      <Button size="small" color="primary">
                                      <Link to={`/movies/edit/${movie._id}`}>Edit</Link>
                                      </Button>
                                      <Button size="small" color="primary" onClick={() => {deleteProject(movie._id)}}>Delete</Button>
                                    </CardActions> 
                                  </Card>
                            </Grid>
                            ) 
                          }):null}
                  </Grid>
                    </div>
                </Container>
    </React.Fragment>
  );
};


export default MovieList