import React from 'react';

const Rank = ({ name, entries }) => (
        <div>
                {`${name} , your current rank is...`}
          <div>
            {entries}
          </div>
        </div>
);

export default Rank;
