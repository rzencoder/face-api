import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {
  const faceBoxes = boxes.map((box, i )=> {
            return ( <div key={i} className="bounding-box" style={{
              top: box.topRow, right: box.rightCol, left: box.leftCol, bottom: box.bottomRow,
            }}></div> )
            })
  return (
        <div className="image-container">
            <img id="imageInput" src={imageUrl} alt="faces" width="500px" height="auto"/>
            {faceBoxes}  
        </div>
)
          };

export default FaceRecognition;
