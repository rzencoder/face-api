import React from 'react';
import './Home.css';

const Home = ({onRouteChange}) => (
        <div>    
          <h1>
            FaceMatch
          </h1>
          <p>Detect a face in an image</p>
          <div  className="btn-container">
            <button onClick={()=> onRouteChange('signin')}>Sign In</button>
            <button onClick={()=> onRouteChange('register')}>Register</button>
          </div>
        </div>
);

export default Home;
