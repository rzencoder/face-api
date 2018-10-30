import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
    return (
        (isSignedIn ? 
        <nav>
            <p onClick={() => onRouteChange('signout')}>Sign Out</p>
        </nav> :
        <div>
            <nav>
                <p onClick={() => onRouteChange('signin')}>Sign In</p>
                <p onClick={() => onRouteChange('register')}>Register</p>
            </nav>
        </div>
        )
    )
}

export default Navigation;