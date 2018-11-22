import React, { memo, useReducer, useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import Loader from 'react-loaders';

import levels from '../../config/levels';
import { Cell } from './components/Cell';
import { Field } from './components/Field';
import { getFromTheme } from '../../utils';
import { GameReducer, initialState, NEW_LEVEL } from './game.reducer';

const GameSpin = styled(Loader)`
    div > div {
        background-color: ${getFromTheme('loader.bg')};
    }
`;

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

const SpinGroup = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function Game () {
    const [{ level, showHidden }, dispatch] = useReducer(GameReducer, initialState);
    const [showLoader, setShowLoader] = useState(true);
    const levelConfig = levels[level];
    const { cellCount, memoryCount } = levelConfig;
    
    const { field, hiddenCells } = useMemo(() => useGameField(cellCount, memoryCount), [cellCount, memoryCount]);

    useEffect(
        () => {
            console.log('EFFECT::SHOW_HIDE_SPINNER');
            
            setShowLoader(true);
            setTimeout(setShowLoader, 2000, false);
        },
        [level],
    );

    function checkLevel(param) {
        if (param) {
            dispatch({ type: NEW_LEVEL, level: level + 1 });
        } else {
            dispatch({ type: NEW_LEVEL, level: 0 });
        }
        // return dispatch({ type: param ?  })
    }

    return (
        <GameView>
            <GameFieldView {...levelConfig}>
            the game... {level}
                {
                    // showLoader
                    // ? (<SpinGroup><GameSpin type='line-scale' /></SpinGroup>)
                     (<Field
                        visible={showLoader}
                        {...levelConfig}
                        key={level}
                        level={level}
                        field={field}
                        hiddenCells={hiddenCells}
                        dispatch={dispatch}
                        showHidden={showHidden}
                        checkLevel={checkLevel}
                    />)
                }
            </GameFieldView>
        </GameView>
    );
}

function useGameField(cellCount, memoryCount) {
    console.log('::GAME FIELD CREATED::');
    
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