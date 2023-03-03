const grabAllAdjCell = (cells, rowIndex, colIndex, maxRows, maxCols) => {
    // Top
    const topLeftCell =
        rowIndex > 0 && colIndex > 0 ? cells[rowIndex - 1][colIndex - 1] : null;
    const topCell = rowIndex > 0 ? cells[rowIndex - 1][colIndex] : null;
    const topRightCell =
        rowIndex > 0 && colIndex < maxCols - 1
            ? cells[rowIndex - 1][colIndex + 1]
            : null;

    //Aside
    const leftCell = colIndex > 0 ? cells[rowIndex][colIndex - 1] : null;

    const rightCell =
        colIndex < maxCols - 1 ? cells[rowIndex][colIndex + 1] : null;

    //Bottom
    const bottomLeftCell =
        rowIndex < maxRows - 1 && colIndex > 0
            ? cells[rowIndex + 1][colIndex - 1]
            : null;
    const bottomCell =
        rowIndex < maxRows - 1 ? cells[rowIndex + 1][colIndex] : null;
    const bottomRightCell =
        rowIndex < maxRows - 1 && colIndex < maxCols - 1
            ? cells[rowIndex + 1][colIndex + 1]
            : null;
    return {
        topLeftCell,
        topCell,
        topRightCell,
        leftCell,
        rightCell,
        bottomLeftCell,
        bottomCell,
        bottomRightCell,
    };
};

export const generateCells = (maxRows, maxCols, maxBombs) => {
    let cells = [];

    // -1 is a bomb, 0 - empty cell, etc.
    const cellValue = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8];

    // 0 - closed, 1 - visible, 2 - flagged
    const cellState = [0, 1, 2];

    //generate cells
    for (let i = 0; i < maxRows; i++) {
        cells.push([]);

        for (let j = 0; j < maxCols; j++) {
            cells[i].push({
                value: cellValue[1],
                state: cellState[0],
                red: false,
            });
        }
    }

    //set up bombs
    let bombsIsSet = 0;
    while (bombsIsSet < maxBombs) {
        const randRow = Math.floor(Math.random() * maxRows);
        const randCol = Math.floor(Math.random() * maxCols);
        const curCell = cells[randRow][randCol];

        if (curCell === cellValue[0]) {
            continue;
        } else {
            cells = cells.map((row, rowIndex) =>
                row.map((cell, cellIndex) => {
                    if (randRow === rowIndex && randCol === cellIndex) {
                        return (cells[randRow][randCol] = {
                            ...cells[randRow][randCol],
                            value: cellValue[0],
                        });
                    }
                    return cell;
                })
            );
            bombsIsSet++;
        }
    }

    //numbers for each cell
    for (let rowIndex = 0; rowIndex < maxRows; rowIndex++) {
        for (let colIndex = 0; colIndex < maxCols; colIndex++) {
            const curCell = cells[rowIndex][colIndex];
            if (curCell.value === -1) {
                continue;
            }

            let numOfBombs = 0;

            const {
                topLeftCell,
                topCell,
                topRightCell,
                leftCell,
                rightCell,
                bottomLeftCell,
                bottomCell,
                bottomRightCell,
            } = grabAllAdjCell(cells, rowIndex, colIndex, maxRows, maxCols);

            if (topLeftCell && topLeftCell.value === -1) {
                numOfBombs++;
            }
            if (topCell && topCell.value === -1) {
                numOfBombs++;
            }
            if (topRightCell && topRightCell.value === -1) {
                numOfBombs++;
            }
            if (leftCell && leftCell.value === -1) {
                numOfBombs++;
            }
            if (rightCell && rightCell.value === -1) {
                numOfBombs++;
            }
            if (bottomLeftCell && bottomLeftCell.value === -1) {
                numOfBombs++;
            }
            if (bottomCell && bottomCell.value === -1) {
                numOfBombs++;
            }
            if (bottomRightCell && bottomRightCell.value === -1) {
                numOfBombs++;
            }

            if (numOfBombs > 0) {
                cells[rowIndex][colIndex] = {
                    ...curCell,
                    value: numOfBombs,
                };
            }
        }
    }

    return cells;
};

export const Face = {
    smile: "🙂",
    warning: "😧",
    dead: "😵",
    win: "😎",
};

export const openMultiCells = (cells, row, col, maxRows, maxCols) => {
    const curCell = cells[row][col];
    if (curCell.state === 1 || curCell.state === 2) return cells;
    let newCells = cells.slice();
    newCells[row][col].state = 1;

    const {
        topLeftCell,
        topCell,
        topRightCell,
        leftCell,
        rightCell,
        bottomLeftCell,
        bottomCell,
        bottomRightCell,
    } = grabAllAdjCell(cells, row, col, maxRows, maxCols);

    if (topLeftCell?.state === 0) {
        if (topLeftCell.value === 0) {
            newCells = openMultiCells(
                newCells,
                row - 1,
                col - 1,
                maxRows,
                maxCols
            );
        } else {
            newCells[row - 1][col - 1].state = 1;
        }
    }

    if (topCell?.state === 0) {
        if (topCell.value === 0) {
            newCells = openMultiCells(newCells, row - 1, col, maxRows, maxCols);
        } else {
            newCells[row - 1][col].state = 1;
        }
    }

    if (topRightCell?.state === 0) {
        if (topRightCell.value === 0) {
            newCells = openMultiCells(
                newCells,
                row - 1,
                col + 1,
                maxRows,
                maxCols
            );
        } else {
            newCells[row - 1][col + 1].state = 1;
        }
    }

    if (leftCell?.state === 0) {
        if (leftCell.value === 0) {
            newCells = openMultiCells(newCells, row, col - 1, maxRows, maxCols);
        } else {
            newCells[row][col - 1].state = 1;
        }
    }

    if (rightCell?.state === 0) {
        if (rightCell.value === 0) {
            newCells = openMultiCells(newCells, row, col + 1, maxRows, maxCols);
        } else {
            newCells[row][col + 1].state = 1;
        }
    }

    if (bottomLeftCell?.state === 0) {
        if (bottomLeftCell.value === 0) {
            newCells = openMultiCells(
                newCells,
                row + 1,
                col - 1,
                maxRows,
                maxCols
            );
        } else {
            newCells[row + 1][col - 1].state = 1;
        }
    }

    if (bottomCell?.state === 0) {
        if (bottomCell.value === 0) {
            newCells = openMultiCells(newCells, row + 1, col, maxRows, maxCols);
        } else {
            newCells[row + 1][col].state = 1;
        }
    }

    if (bottomRightCell?.state === 0) {
        if (bottomRightCell.value === 0) {
            newCells = openMultiCells(
                newCells,
                row + 1,
                col + 1,
                maxRows,
                maxCols
            );
        } else {
            newCells[row + 1][col + 1].state = 1;
        }
    }

    return newCells;
};
