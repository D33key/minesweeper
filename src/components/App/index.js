import React from "react";
import { Face, generateCells, openMultiCells } from "../../utils";
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
    const [face, setFace] = React.useState(Face.smile);
    const [time, setTime] = React.useState(0);
    const [bombFlagged, setBombFlagged] = React.useState(MAX_BOMBS);
    const [isBegin, setIsBegin] = React.useState(false);

    React.useEffect(() => {
        const handleMouseDown = () => {
            setFace(Face.warning);
        };
        const handleMouseUp = () => {
            setFace(Face.smile);
        };
        // TODO!!!! not window
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    React.useEffect(() => {
        if (isBegin && time < 999) {
            const timer = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);

            return () => {
                clearInterval(timer);
            };
        }
    }, [isBegin]);

    const handleCellClick = (row, col) => () => {
        if (!isBegin) setIsBegin(true);

        const curCell = cells[row][col];
        let newCells = cells.slice();

        if (curCell.state === 2 || curCell.state === 1) return;

        if (curCell.value === -1) {
        } else if (curCell.value === 0) {
            newCells = openMultiCells(newCells, row, col, MAX_ROWS, MAX_COLS);
            setCells(newCells);
        } else {
            newCells[row][col].state = 1;
            setCells(newCells);
        }
    };

    const onCellContext = (row, col) => (e) => {
        e.preventDefault();

        if (!isBegin) return;

        const curCells = cells.slice();
        const curCell = cells[row][col];
        if (curCell.state === 1) {
            return;
        } else if (curCell.state === 0) {
            curCells[row][col].state = 2;
            setCells(curCells);
            setBombFlagged((prev) => prev - 1);
        } else {
            curCells[row][col].state = 0;
            setCells(curCells);
            setBombFlagged((prev) => prev + 1);
        }
    };

    const onFaceClick = () => {
        if (isBegin) {
            setIsBegin(false);
            setTime(0);
            setCells(generateCells(MAX_ROWS, MAX_COLS, MAX_BOMBS));
            setBombFlagged(MAX_BOMBS);
        }
    };

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
                        onClick={handleCellClick}
                        onContext={onCellContext}
                    />
                );
            });
        });
    };

    return (
        <div className="app">
            <div className="header">
                <NumberDisplay value={bombFlagged} />
                <div className="face" onClick={onFaceClick}>
                    <span role="img" aria-label="face">
                        {face}
                    </span>
                </div>
                <NumberDisplay value={time} />
            </div>
            <div className="body">{renderCells()}</div>
        </div>
    );
};

export default App;
