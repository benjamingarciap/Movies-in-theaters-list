import React,  {  useState, useEffect } from 'react'
import axios from 'axios'
import service from '../services/api-service'
import { Link } from 'react-router-dom'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
//spiner
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3, 2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  progress: {
    margin: theme.spacing(2),
  },

  }));

const EditMovie = (props)=>{

  const classes = useStyles();
  const [movie, setMovie] = useState({
    genre_ids:[],
    vote_count:'',
    id:'',
    video:false,
    vote_average:'',
    title : '',
    popularity: '',
    poster_path:'',
    original_language:'',
    original_title:'',
    backdrop_path:'',
    adult:false,
    overview:'',
    release_date:''
  })

  //Spinner
  const [uploadTime, startTime] = React.useState(false)
  const handleSpinner =()=>[
    startTime(true)
  ]


  //Axios call
  const getSingleMovie = () => {
    const { params } = props.match
    //console.log(props)
    axios.get(`http://localhost:5000/api/movies/${params.id}`)
    .then( responseFromApi =>{
      //console.log(responseFromApi)
      const theMovie = responseFromApi.data
      setMovie({...movie, 
        genre_ids:theMovie.genre_ids,
        vote_count:theMovie.vote_count,
        id:theMovie.id,
        video:theMovie.video,
        vote_average:theMovie.vote_average,
        title : theMovie.title,
        popularity: theMovie.popularity,
        poster_path:theMovie.poster_path,
        original_language:theMovie.original_language,
        original_title:theMovie.original_title,
        backdrop_path:theMovie.backdrop_path,
        adult:theMovie.adult,
        overview:theMovie.overview,
        release_date:theMovie.release_date
      })
      //console.log("primer cambio al state", movie)
    })
    .catch(err=> console.log(err))
  }

  
  useEffect(()=>{
    //axios
    getSingleMovie()
    //spinner
    
  },[])

  const handleFormSubmit = (e) => {

    const genre_ids = movie.genre_ids
    const vote_count = movie.vote_count
    const id = movie.id 
    const video = movie.video 
    const vote_average = movie.vote_average 
    const title = movie.title
    const popularity = movie.popularity
    const poster_path = movie.poster_path 
    const original_language = movie.original_language 
    const original_title = movie.original_title 
    const backdrop_path = movie.backdrop_path 
    const adult = movie.adult 
    const overview = movie.overview 
    const release_date = movie.release_date


    e.preventDefault()
    const { params } = props.match
    axios.put(`http://localhost:5000/api/movies/${params.id}`, {genre_ids, vote_count, id, video, vote_average, title, popularity, poster_path, original_language, original_title, backdrop_path, adult, overview, release_date})
    .then(()=> {
     
     props.history.goBack()
    })
    .catch( err => console.log(err) )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setMovie({ [name] : value })
  }

  const handleFileUpload = e => {
    console.log(`The file to be uploaded is: ${e.target.files[0]}`)

    const uploadData = new FormData()
    uploadData.append('image', e.target.files[0])

    service.handleUpload(uploadData)
    .then(response => {
      //console.log(`response is ${response}`)
      setMovie({ poster_path: response.secure_url})
    })
    .catch(err => {
      console.log(`Error while uploading the file: ${err}`)
    })
  }

  return(
    <div className={classes.root} > 
        <Container maxWidth="md">
            <div className="edit-container">
                <Paper className={classes.root}>
                    <h2>Edit movie</h2>
                    <form onSubmit={handleFormSubmit} className='edit-container'>
                    <TextField
                      id="outlined-name"
                      label="Title"
                      name="title"
                      className={classes.textField}
                      value={!movie.title ? undefined :movie.title}
                      onChange={e => handleChange(e)}
                      margin="normal"
                      variant="outlined"
                      defaultValue=" "
                      /> 
                    <TextField
                      id="outlined-name"
                      label="Vote average"
                      name="vote_average"
                      className={classes.textField}
                      value={!movie.vote_average ? undefined :movie.vote_average}
                      onChange={e => handleChange(e)}
                      margin="normal"
                      variant="outlined"
                      defaultValue=" "
                      /> 
                    <TextField
                      id="outlined-name"
                      label="Popularity count"
                      name="popularity"
                      multiline
                      rows="3"
                      className={classes.textField}
                      value={!movie.popularity ? undefined :movie.popularity}
                      onChange={e => handleChange(e)}
                      margin="normal"
                      variant="outlined"
                      defaultValue=" "
                      />
                    <TextField
                      id="outlined-name"
                      multiline
                      rows="3"
                      label="Description"
                      name="overview"
                      className={classes.textField}
                      value={!movie.overview ? undefined :movie.overview}
                      onChange={e => handleChange(e)}
                      margin="normal"
                      variant="outlined"
                      defaultValue=" "
                      /> 
                    <TextField                     
                      label="Release date"
                      name="release_date"
                      className={classes.textField}
                      value={!movie.release_date ? undefined :movie.release_date}
                      onChange={e => handleChange(e)}
                      margin="normal"
                      variant="outlined"
                      defaultValue=" "
                      id="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      type="date"
                      />
                    <TextField
                      id="outlined-name"
                      label="Original language"
                      name="original_language"
                      className={classes.textField}
                      value={!movie.original_language ? undefined :movie.original_language}
                      onChange={e => handleChange(e)}
                      margin="normal"
                      variant="outlined"
                      defaultValue=" "
                      />
                      <div className='edit-form-buttons'>
                        <div className='edit-form-label-container'>
                          <div className="edit-buttons-container">
                          <div className='spinner'>
                              {uploadTime ? <CircularProgress className={classes.progress} /> :null}
                          </div>
                          <input type="file" 
                          onChange={(e) => {
                            handleSpinner()
                            handleFileUpload(e)
                          }}
                          name="file"
                          id="file"                        
                          className="inputfile"/>
                          <label htmlFor="file" className='label-for-edit'>Upload image</label>
                          </div>
                          <Button type="submit" to='/movies'  variant="contained" className={classes.button} id="button-edit">
                            Submit changes
                          </Button>
                          <Link to={`/movies/${props.match.params.id}`} className='detail-link'>Back</Link>           
                        </div>
                    </div>
                  </form>
                </Paper>
              </div>
          </Container>
      </div>
  )

}



export default EditMovie





