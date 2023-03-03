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
    const [win, setWin] = React.useState(false);
    const [gameOver, setGameOver] = React.useState(false);

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

    React.useEffect(() => {
        if (gameOver) {
            setFace(Face.dead);
            setIsBegin(false);
        }
    }, [gameOver]);

    React.useEffect(() => {
        if (win) {
            setFace(Face.win);
            setIsBegin(false);
        }
    }, [win]);

    const handleCellClick = (row, col) => () => {
        let newCells = cells.slice();
        if (!isBegin) {
            let isBomb = newCells[row][col].value === -1;
            while (isBomb) {
                newCells = generateCells(MAX_ROWS, MAX_COLS, MAX_BOMBS);
                if (newCells[row][col].value !== -1) {
                    isBomb = false;
                    break;
                }
            }

            setIsBegin(true);
        }
        const curCell = newCells[row][col];

        if (curCell.state === 2 || curCell.state === 1) return;

        if (curCell.value === -1) {
            setGameOver(true);
            newCells[row][col].red = true;
            newCells = showAllBomb();
            setCells(newCells);
            return;
        } else if (curCell.value === 0) {
            newCells = openMultiCells(newCells, row, col, MAX_ROWS, MAX_COLS);
        } else {
            newCells[row][col].state = 1;
        }

        //No available spaces to click => win
        let isOpenCells = false;
        for (let row = 0; row < MAX_ROWS; row++) {
            for (let col = 0; col < MAX_COLS; col++) {
                const curCell = newCells[row][col];

                if (curCell.value !== -1 && curCell.state === 0) {
                    isOpenCells = true;
                    break;
                }
            }
        }

        if (!isOpenCells) {
            newCells = newCells.map((row) =>
                row.map((cell) => {
                    if (cell.value === -1) {
                        return {
                            ...cell,
                            state: 2,
                        };
                    }
                    return cell;
                })
            );
            setWin(true);
        }
        setCells(newCells);
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
        setIsBegin(false);
        setTime(0);
        setCells(generateCells(MAX_ROWS, MAX_COLS, MAX_BOMBS));
        setGameOver(false);
        setBombFlagged(MAX_BOMBS);
        setWin(false);
    };

    const renderCells = () => {
        return cells.map((row, rowIndex) => {
            return row.map((cell, colIndex) => {
                return (
                    <Button
                        key={`${rowIndex}-${colIndex}`}
                        state={cell.state}
                        value={cell.value}
                        red={cell.red}
                        row={rowIndex}
                        col={colIndex}
                        onClick={handleCellClick}
                        onContext={onCellContext}
                    />
                );
            });
        });
    };

    const showAllBomb = () => {
        const curCells = cells.slice();
        return curCells.map((row) =>
            row.map((cell) => {
                if (cell.value === -1) {
                    return {
                        ...cell,
                        state: 1,
                    };
                }

                return cell;
            })
        );
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
