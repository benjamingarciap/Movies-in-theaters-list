const express = require('express')
const app = express()
const fetch = require('node-fetch');
const Movie = require('../../models/movie-api')
const mongoose = require('mongoose')

const dbtitle = `technical-test-movies-external-api`;
mongoose.connect(`mongodb://localhost/${dbtitle}`, { useNewUrlParser: true });
Movie.collection.drop()

const apiUrl = "https://api.themoviedb.org/3/movie/now_playing?api_key=588e03eee999794b73b1105d24e29be8&page=1"


//// THIS IS WORKING
//// NECESITO ENCONTRAR LA MANERA DE CAMBIAR APIURL

let currentPage
let totalPages

async function fetchAllMoviesFromApi() {
     
   let apiUrl = "https://api.themoviedb.org/3/movie/now_playing?api_key=588e03eee999794b73b1105d24e29be8&page=1"
     
   while( currentPage <totalPages ){
      await fetch(apiUrl)
      .then(res=> res.json())
      .then(data =>{
         
         currentPage = data.page
         totalPages = data.total_pages
         
         var splited = apiUrl.split('=')
         var numOfUrl = splited[splited.length-1]
         numOfUrl++
         apiUrl = apiUrl.slice(0, apiUrl.indexOf("=",55)+1)+ numOfUrl
         
         data.results.map((movie)=>{
            const newMovie = new Movie(movie)
            newMovie.save()
            .then(() => {
               console.log(`saved new movie ${movie.title} to the DB`)
               console.log(`total results are ${data.total_results}`)
               console.log(`page ${data.page} of ${data.total_pages}`)
               currentPage === totalPages+1 ?  mongoose.connection.close() : null
               //console.log(data.results)
            })
            .catch(err => console.log(`error while saving movies to the DB ${err}`))
         })
         // res.send({ data });
      })
      .catch(err=>res.redirect('/error'))
   }
}

//First fetch
fetch(apiUrl)
.then(res=> res.json())
.then(data =>{
   currentPage = data.page
   totalPages = data.total_pages
   console.log(`fetched the first time `, data.page)
   console.log(`current page = `,currentPage,`of total pages = `, totalPages)
   fetchAllMoviesFromApi()
})
.catch(err=>res.redirect('/error'))

console.log('Started')

