import React from "react";

import "./NumberDisplay.scss";

const NumberDisplay = (props) => {
    return (
        <div className="numberDisplay">
            {props.value < 0
                ? `-${Math.abs(props.value.toString().padStart(2, "0"))}`
                : props.value.toString().padStart(3, "0")}
        </div>
    );
};

export default NumberDisplay;
