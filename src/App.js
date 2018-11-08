import React, { Component } from 'react';
import './App.css';
import ImageForm from './components/ImageForm/ImageForm';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Home from './components/Home/Home';

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
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
    const image = document.getElementById('imageInput');
    const width = parseInt(image.width, 10);
    const height = parseInt(image.height, 10);
    const faceParameters = data.outputs[0].data.regions;
    const boxes = faceParameters.map((face) => {
      const faceData = face.region_info.bounding_box;
      return {
        leftCol: faceData.left_col * width,
        topRow: faceData.top_row * height,
        rightCol: width - (faceData.right_col * width),
        bottomRow: height - (faceData.bottom_row * height),
      };
    })
    console.log(boxes)
    return boxes;
   
    
  }

  displayFaceBoxes = (boxes) => {
    this.setState({ boxes });
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
        this.displayFaceBoxes(this.calculateFaceLocation(response));
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'landing') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true,
      route: route });
    } else {
      this.setState({
        route: route
      });
    }

  }

  render() {
    
    const {
      isSignedIn, imageUrl, route, boxes,
    } = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === 'landing' ?
        <Home onRouteChange={this.onRouteChange}/> :
        route === 'home'
          ? <div>
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <div className="face-search-container">
          <ImageForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
          <FaceRecognition boxes={boxes} imageUrl={imageUrl}/>
          </div>
        </div>
          :  <SignIn route={route} loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
      }

      </div>
    );
  }
}

export default App;
