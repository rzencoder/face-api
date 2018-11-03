import React from 'react';

const Rank = ({ name, entries }) => (
    <div>
      {`${name} , you have searched for ${entries} images`}
    </div>
);

export default Rank;
