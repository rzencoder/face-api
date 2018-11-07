import React from 'react';
import './Navigation.css';
import face from '../../face.png';

const Navigation = ({ onRouteChange, isSignedIn }) => (
    
    
    
    <div className="nav-container">
    <div className="logo-container">
    <div>
    <img className="logo" src={face} />
    </div>
    <div className="logo-text">Face<span>Match</span></div>
    </div>
  {isSignedIn
    ? <nav className="nav">
            <p onClick={() => onRouteChange('landing')}>Sign Out</p>
        </nav>
    : <div>
            <nav className="nav">
                <p onClick={() => onRouteChange('signin')}>Sign In</p>
                <p onClick={() => onRouteChange('register')}>Register</p>
            </nav>
        </div>
        
  }
  </div>
);

export default Navigation;
