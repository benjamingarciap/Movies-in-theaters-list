const express = require(`express`)
const mongoose = require(`mongoose`)
const router  = express.Router();


const Movie = require(`../../models/movie-api`)

//GET route to get all the movies a & pagination
router.get('/movies',(req,res) => {
  var pageNo = parseInt(req.query.pageNo) 
  console.log(pageNo)
  var size = parseInt(req.query.size)
  var query = {}

  if(pageNo < 0 || pageNo === 0) {
        response = {"error" : true,"message" : "invalid page number, should start with 1"};
        return res.json(response)
  }
  query.skip = size * (pageNo - 1)
  query.limit = size
  // Find some documents
       Movie.find({},{},query,function(err,data) {
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
})

//GET route to get one movie by title
router.get(`/movies/title/:title`, (req, res, next)=>{
  Movie.findOne({title: req.params.title})
  .then(oneMovie => {
    res.status(200).json(oneMovie)
  })
  .catch(err => res.json(err))
})

//POST route to create a new movie
router.post(`/movies`, (req, res, next) => {
  console.log(req.body)
  Movie.create(req.body)
  .then(newMovie => {
    console.log(newMovie)
    console.log(`New movie added to the DB ${newMovie}`)
    res.status(200).json(newMovie)
  })
  .catch(err=> res.json(err))
})

//GET route to get a specific movie detailed view
router.get(`/movies/:id`, (req, res, next)=>{
  Movie.findById(req.params.id)
  .then(oneMovie => res.status(200).json(oneMovie))
  .catch(err => res.json(err))
})

//PUT route to update a specific movie
router.put(`/movies/:id`, (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({ message: `Specified id is not valid` })
  }
  Movie.findByIdAndUpdate(req.params.id, req.body)
  .then(()=>{
    res.json( {message: `Project with ${req.params.id} is updated succesfully`} )
  })
  .catch(err => res.json(err))
})

//DELETE route to delete a specific project
router.delete(`/movies/:id`, (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({ message: `Specified id is not valid` })
  }

  Movie.findByIdAndRemove(req.params.id)
  .then(()=>{
    res.json({ message: `Project with ${req.params.id} is removed successfully` })
  })
  .catch(err => res.json(err))

})


module.exports = router