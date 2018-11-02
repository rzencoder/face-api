import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => (
        <div className="image-container">
            <img id="imageInput" src={imageUrl} alt="faces" width="500px" height="auto"/>
            <div className="bounding-box" style={{
              top: box.topRow, right: box.rightCol, left: box.leftCol, bottom: box.bottomRow,
            }}></div>
        </div>
);

export default FaceRecognition;
