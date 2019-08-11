import React, { useEffect } from 'react'
import service from "../services/api-service"
import axios from 'axios'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));

const inputStyle = {
  width: '195px'
};



export default function EditMovieModal({movie, open, handleClose}) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    title : '',
    director: '',
    stars: '',
    imageUrl: '',
    description: '',
    showtimes: '',
    trailer: '',
    
  });
  
  useEffect(()=>{
     axios.get(`http://localhost:5000/api/movies/${movie.id}`)
    .then( responseFromApi =>{
      console.log('response', responseFromApi)
      console.log('movie', movie.id)
      const theMovie = responseFromApi.data
      setValues({...values, 
        title: theMovie.title,
        director: theMovie.director,
        stars: theMovie.stars,
        imageUrl: theMovie.imageUrl,
        description: theMovie.description,
        showtimes: theMovie.showtimes,
        trailer: theMovie.trailer
      })
    })
    console.log('valuesfasdfasdfasdfasdf==========', values)
  
  },[])

  if(!movie){
    return <div/>
  }


  // const handleChange = name => event => {
  //   setValues({ ...values, [name]: event.target.value });
  // };

   const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ [name] : value })
  }
  const handleFormSubmit = (e) => {
    const title = values.title
    const director = values.director
    const stars = values.stars
    const imageUrl = values.imageUrl
    const description = values.description
    const showtimes = values.showtimes
    const trailer = values.trailer

    e.preventDefault()
    const { params } = this.props.match
    //axios.put(`http://localhost:5000/api/movies/${this.props.theMovie._id}`, {title, director, stars, imageUrl, description, showtimes, trailer})
    axios.put(`http://localhost:5000/api/movies/${params.id}`, {title, director, stars, imageUrl, description, showtimes, trailer})
    .then(()=> {
     // this.props.getTheMovie()
    })
    .catch( err => console.log(err) )
  }

  const handleFileUpload = e => {
    console.log(`The file to be uploaded is: ${e.target.files[0]}`)

    const uploadData = new FormData()
    uploadData.append('image', e.target.files[0])

    service.handleUpload(uploadData)
    .then(response => {
      //console.log(`response is ${response}`)
      setValues({ imageUrl: response.secure_url})
    })
    .catch(err => {
      console.log(`Error while uploading the file: ${err}`)
    })
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Add new movie to the database"}</DialogTitle>
        <DialogContent>
          <form className={classes.container} id='add-movie-form' noValidate autoComplete="off" onSubmit={e => handleFormSubmit(e)}>
            {/* <TextField
              id="outlined-name"
              label="Title"
              className={classes.textField}
              value={values.title}
              onChange={handleChange('title')}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-name"
              label="Director"
              className={classes.textField}
              value={values.director}
              onChange={handleChange('director')}
              margin="normal"
              variant="outlined"
            /> */}
             <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows="3"
              defaultValue="Default Value"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              style={inputStyle}
              //onChange={handleChange('description')}
              onChange={(e)=>handleChange(e)}
              name="description"
              value={values.description}
            />
            {/* <TextField
              id="outlined-name"
              label="Stars"
              className={classes.textField}
              value={values.stars}
              onChange={handleChange('stars')}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-name"
              label="Trailer URL"
              className={classes.textField}
              value={values.trailer}
              onChange={handleChange('trailer')}
              margin="normal"
              variant="outlined"
            /> */}
            <input type="file" 
                   onChange={(e) => handleFileUpload(e)} 
                   name="file"
                   id="file"
                   className="inputfile"/>
            <label htmlFor="file">Upload image</label>
            <DialogActions >
            <Button color="primary" type="submit" onClick={handleClose} to='/movies'>
                Add
              </Button>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
            </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}