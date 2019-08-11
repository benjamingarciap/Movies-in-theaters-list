import React from 'react';
import service from "../services/api-service"

//modal
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

//form
//import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
//import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
//spiner
import CircularProgress from '@material-ui/core/CircularProgress';


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
  progress: {
    margin: theme.spacing(2),
  },
}));

const inputStyle = {
  width: '195px'
};



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddMovieModal({open, handleClose, handleCloseCancel}) {

  const classes = useStyles();
  const [values, setValues] = React.useState({
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

  });
  //spinner
  const [uploadTime, startTime] = React.useState(false)
  const handleSpinner =()=>[
    startTime(true)
  ]
  //imput logic
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  //this uploads image
  const handleFileUpload = e => {

    console.log(`The file to be uploaded is: ${e.target.files[0]}`)
    const uploadData = new FormData()
    uploadData.append('image', e.target.files[0])

    service.handleUpload(uploadData)
    .then(response => {
      setValues({ ...values, imageUrl: response.secure_url});
    })
    .catch(err => {
      console.log(`Error while uploading the file: ${err}`)
    })
  }

  //this submit the form
  const handleSubmit = e => {
    e.preventDefault()

    service.saveNewMovie(values)
    .then(res => {
      console.log(`added: ${res}`)
    })
    .catch(err => {
      console.log(`Error while adding the movie to the database: ${err}`)
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
     
          <form className={classes.container} id='add-movie-form' noValidate autoComplete="off" onSubmit={e => handleSubmit(e)}>
            <div className="modal-row">
              <TextField
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
                label="Vote average"
                className={classes.textField}
                value={values.vote_average}
                onChange={handleChange('vote_average')}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-name"
                label="Popularity count"
                className={classes.textField}
                value={values.popularity}
                onChange={handleChange('popularity')}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows="3"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                style={inputStyle}
                onChange={handleChange('overview')}
                value={values.description}
              />
            </div>
            <div className="modal-row">
            <TextField
              id="date"
              type="date"        
              label="Release date"
              className={classes.textField}
              value={values.release_date}
              onChange={handleChange('release_date')}
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="outlined-name"
              label="Original language"
              className={classes.textField}
              value={values.original_language}
              onChange={handleChange('original_language')}
              margin="normal"
              variant="outlined"
            />
            <div >
              <input type="file" 
                    onChange={(e) => {
                      handleFileUpload(e)
                      handleSpinner()
                      }}
                    name="file"
                    id="file"
                    className="inputfile"/>
              <label htmlFor="file">Upload image</label>
              <div className="position-relative">
                {uploadTime ? <CircularProgress className={classes.progress} /> :null}
                {/* {uploadTime ? <CircularProgress className={classes.progress} variant="determinate" value={progress} /> :null} */}
              </div>
            </div>
            </div>
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

