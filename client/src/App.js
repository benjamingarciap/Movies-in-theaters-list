import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom"
import './App.css';

import MovieListHooks from "./components/MovieListHooks"
import MovieDetails from "./components/MovieDetails"
import EditMovie from "./components/EditMovie"
import NoMatch from "./components/NoMatch"
import Album from "./components/styling/Material-ui"


class App extends Component {
  render(){
    return (
      <React.Fragment>  
          <div className="App">
            <Switch>
                <Route  exact path="/" component={MovieListHooks}/>
                <Route  exact path="/movies/:id" component={MovieDetails}/>
                <Route  exact path="/movies/edit/:id" component={EditMovie}/> 
                <Route  exact path="/pepe/album" component={Album}/>
                <Route  component={NoMatch}/>    {/* 404 error page */}
            </Switch>
          </div>
      </React.Fragment>
    );
  }
}

export default App;
