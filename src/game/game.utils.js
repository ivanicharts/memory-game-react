export function generateGameField(cellCount, memoryCount) {
    const cellsIndexes = [...Array(cellCount * cellCount)]
        .map((_, i) => i);
    const field = [...cellsIndexes].fill(1);
    const hiddenCells = [];

    for (let i = 0; i < memoryCount; i++) {
        const rNum = Math.floor(Math.random() * cellsIndexes.length);
        const toChange = cellsIndexes.splice(rNum, 1).pop();

        hiddenCells.push(toChange);
        field[toChange] = 2;
    }

    return {
        field, hiddenCells,
    };
}

export const WRONG_GUESSED_CELL = 0;
export const CORRECT_GUESSED_CELL = 3;
export const CELL = 1;
export const HIDDEN_CELL = 2;