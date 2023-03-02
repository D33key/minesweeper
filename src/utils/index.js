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

            // Top
            const topLeftBomb =
                rowIndex > 0 && colIndex > 0
                    ? cells[rowIndex - 1][colIndex - 1]
                    : null;
            const topBomb = rowIndex > 0 ? cells[rowIndex - 1][colIndex] : null;
            const topRightBomb =
                rowIndex > 0 && colIndex < maxCols - 1
                    ? cells[rowIndex - 1][colIndex + 1]
                    : null;

            //Aside
            const leftBomb =
                colIndex > 0 ? cells[rowIndex][colIndex - 1] : null;

            const rightBomb =
                colIndex < maxCols - 1 ? cells[rowIndex][colIndex + 1] : null;

            //Bottom
            const bottomLeftBomb =
                rowIndex < maxRows - 1 && colIndex > 0
                    ? cells[rowIndex + 1][colIndex - 1]
                    : null;
            const bottomBomb =
                rowIndex < maxRows - 1 ? cells[rowIndex + 1][colIndex] : null;
            const bottomRightBomb =
                rowIndex < maxRows - 1 && colIndex < maxCols - 1
                    ? cells[rowIndex + 1][colIndex + 1]
                    : null;

            if (topLeftBomb && topLeftBomb.value === -1) {
                numOfBombs++;
            }
            if (topBomb && topBomb.value === -1) {
                numOfBombs++;
            }
            if (topRightBomb && topRightBomb.value === -1) {
                numOfBombs++;
            }
            if (leftBomb && leftBomb.value === -1) {
                numOfBombs++;
            }
            if (rightBomb && rightBomb.value === -1) {
                numOfBombs++;
            }
            if (bottomLeftBomb && bottomLeftBomb.value === -1) {
                numOfBombs++;
            }
            if (bottomBomb && bottomBomb.value === -1) {
                numOfBombs++;
            }
            if (bottomRightBomb && bottomRightBomb.value === -1) {
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
