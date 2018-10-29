import React, { Component } from 'react';
import './App.css';
import ImageForm from './components/ImageForm/ImageForm';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'b5c34b781c4b428281f05614d290d7db'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {}
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit = () => {
    const {input} = this.state;
    this.setState({
      imageUrl: input
    })
        app.models.predict(
            Clarifai.FACE_DETECT_MODEL,
            input)
          .then(
            function (response) {
              // do something with response
              console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
            },
            function (err) {
              // there was an error
              console.log('Error');
            }
          );
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <Rank />
        <ImageForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
