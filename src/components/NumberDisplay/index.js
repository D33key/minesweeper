import React from 'react';

import "./NumberDisplay.scss";

const NumberDisplay = (props) => {
    return (
        <div className='numberDisplay'>
            {props.value.toString().padStart(3, '0')}
        </div>
    );
};

export default NumberDisplay;