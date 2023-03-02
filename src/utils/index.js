export const generateCells = (maxRow, maxCols) => {
    const cells = [];

    // -1 is a bomb, 0 - empty cell, etc.
    const cellValue = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8];

    // 0 - closed, 1 - visible, 2 - flagged
    const cellState = [0, 1, 2];

    for(let i = 0; i < maxRow; i++) {
        cells.push([]);

        for (let j = 0; j < maxCols; j++) {
            cells[i].push({
                value: cellValue[1],
                state: cellState[0],
            });
        }
    }

    return cells;
}