import React, { memo, useState, useMemo } from 'react';
import styled from 'styled-components';
import levels from '../../config/levels';

import { Cell } from './components/Cell';
import { Field } from './components/Field';


const GameView = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px 0;
`;

const GameFieldView = styled.div`
    width: ${({ fieldSize, cellCount, space }) => fieldSize + cellCount * space}px;
    height: ${({ fieldSize, cellCount, space }) => fieldSize + cellCount * space}px;
    margin: 20px 0;
`;

function Game () {
    const [currentLevel, setLevel] = useState(0);
    const levelConfig = levels[currentLevel];
    const { cellCount, memoryCount } = levelConfig;
    const { field, hiddenCells } = useMemo(() => useGameField(cellCount, memoryCount), [cellCount, memoryCount]);

    return (
        <GameView>
            <GameFieldView {...levelConfig}>
                the game...
                <Field 
                    {...levelConfig}
                    field={field}
                    hiddenCells={hiddenCells}
                />
            </GameFieldView>
        </GameView>
    );
}

function useGameField(cellCount, memoryCount) {
    console.log('GAME FIELD CREATED');
    
    const cells = [...Array(cellCount * cellCount)].map((_, i) => i);
    const field = [...cells].fill(1);
    const hiddenCells = [];

    for (let i = 0; i < memoryCount; i++) {
        const rNum = Math.floor(Math.random() * cells.length);
        const toChange = cells.splice(rNum, 1).pop();

        hiddenCells.push(toChange);
        field[toChange] = 2;
    }

    return {
        field, hiddenCells,
    };
}

export default memo(Game);