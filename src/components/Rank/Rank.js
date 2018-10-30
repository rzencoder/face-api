import React from 'react';

const Rank = ({name, entries}) => {
    return (
        <div>
                {`${name} , your current rank is...`}
          <div>
            {entries}
          </div>
        </div>
    )
}

export default Rank;