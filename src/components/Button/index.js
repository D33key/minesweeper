import React from "react";

import "./Button.scss";

const Button = (props) => {
    const renderContent = () => {
        if (props.state === 1) {
            if (props.value === -1) {
                return (
                    <span role="img" aria-label="bomb">
                        💣
                    </span>
                );
            } else if (props.value === 0) {
                return null;
            }
            return props.value;
        } else if (props.state === 2) {
            return (
                <span role="img" aria-label="flag">
                    🚩
                </span>
            );
        }

        return null;
    };
    return (
        <button
            className={`button ${props.state === 1 ? "visible" : ""} color-${
                props.value
            }`}
            onClick={props.onClick(props.row, props.col)}
            onContextMenu={props.onContext(props.row, props.col)}
        >
            {renderContent()}
        </button>
    );
};

export default Button;
