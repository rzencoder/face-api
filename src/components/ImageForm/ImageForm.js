import React from 'react';

const ImageForm = ({ onInputChange, onSubmit }) => (
        <div>
            <h3>Detect faces in an image</h3>
            <div>
                <input type="text" onChange={onInputChange}></input>
                <button onClick={onSubmit}>Detect</button>
            </div>
        </div>
);

export default ImageForm;
