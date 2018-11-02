import React, { Component } from 'react';
import './App.css';
import ImageForm from './components/ImageForm/ImageForm';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Home from './components/Home/Home';

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'landing',
  isSignedIn: false,
  user: {
    id: 0,
    name: '',
    email: '',
    entries: 0,
    joined: new Date(),
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  }

  calculateFaceLocation = (data) => {
    const faceParameters = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('imageInput');
    const width = parseInt(image.width, 10);
    const height = parseInt(image.height, 10);
    return {
      leftCol: faceParameters.left_col * width,
      topRow: faceParameters.top_row * height,
      rightCol: width - (faceParameters.right_col * width),
      bottomRow: height - (faceParameters.bottom_row * height),
    };
  }

  displayFaceBox = (box) => {
    this.setState({ box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onSubmit = () => {
    const { input } = this.state;
    this.setState({
      imageUrl: input,
    });
    fetch('http://localhost:3001/imageurl', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then(response => response.json())
      .then((response) => {
        if (response) {
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then(res => res.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(err => console.log(err));
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (this.state.route === 'landing') {
      this.setState(initialState);
    } else if (this.state.route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({
      route,
    });
  }

  render() {
    const {
      isSignedIn, imageUrl, route, box,
    } = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === 'landing' ?
        <Home onRouteChange={this.onRouteChange}/> :
        route === 'home'
          ? <div>
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
          <FaceRecognition box={box} imageUrl={imageUrl}/>
        </div>
          : (route === 'signin'
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          )
      }

      </div>
    );
  }
}

export default App;
