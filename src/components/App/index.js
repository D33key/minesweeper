import React from "react";
import { generateCells } from "../../utils";
import Button from "../Button";
import NumberDisplay from "../NumberDisplay";

import "./App.scss";

const App = () => {
    const MAX_ROWS = 16;
    const MAX_COLS = 16;
    const MAX_BOMBS = 40;

    const [cells, setCells] = React.useState(
        generateCells(MAX_ROWS, MAX_COLS, MAX_BOMBS)
    );

    const renderCells = () => {
        return cells.map((row, rowIndex) => {
            return row.map((cell, colIndex) => {
                return (
                    <Button
                        key={`${rowIndex}-${colIndex}`}
                        state={cell.state}
                        value={cell.value}
                        row={rowIndex}
                        col={colIndex}
                    />
                );
            });
        });
    };

    return (
        <div className="app">
            <div className="header">
                <NumberDisplay value={0} />
                <div className="face">
                    <span role="img" aria-label="face">
                        🙂
                    </span>
                </div>
                <NumberDisplay value={23} />
            </div>
            <div className="body">{renderCells()}</div>
        </div>
    );
};

export default App;
