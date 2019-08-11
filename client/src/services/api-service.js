import axios from "axios"

const service = axios.create({
  baseURL: `http://localhost:5000/api`
})

const errorHandler = err => {
  console.log(err)
  throw err
}

export default {
  service, 
  handleUpload(theFile){
    return service.post(`/upload`, theFile)
    .then(res=> res.data)
    .catch(errorHandler)
  },
  saveNewMovie(newMovie){
    return service.post(`/movies`, newMovie)
    .then(res => res.data)
    .catch(errorHandler)
  }
}