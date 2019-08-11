import React from 'react';
import { Link } from 'react-router-dom'

const NoMatch = (props) => (
      
        <React.Fragment>
          <h1>Page not found</h1>
          <Link to="/">Back to home</Link>

        </React.Fragment>
      
  );

export default NoMatch;