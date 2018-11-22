import React, { memo, useReducer, useMemo, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import levels from '../../config/levels';
import { Field } from './components/Field';
import { GameReducer, initialState, NEW_LEVEL, LOADER_HIDE, LOADER_SHOW } from './game.reducer';
import { getFromTheme } from '../../utils';
import Switch from 'rc-switch';

import 'rc-switch/assets/index.css';

const GameView = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 80px 0;
`;

const GameFieldView = styled.div`
    width: ${({ fieldSize, cellCount, space }) => fieldSize + cellCount * space}px;
    height: ${({ fieldSize, cellCount, space }) => fieldSize + cellCount * space}px;
    margin: 20px 0;
`;

const SwitchView = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

function Game ({ toggleTheme }) {
    const [{ level, showHidden, showLoader }, dispatch] = useReducer(GameReducer, initialState);
    const levelConfig = levels[level];
    const { cellCount, memoryCount } = levelConfig;
    const { field, hiddenCells } = useMemo(() => useGameField(cellCount, memoryCount), [cellCount, memoryCount]);

    useEffect(
        () => setTimeout(dispatch, 500, { type: LOADER_HIDE }),
        [level],
    );

    function updateLevel(param) {
        dispatch({ type: LOADER_SHOW });
        setTimeout(() => dispatch({ type: NEW_LEVEL, level: param ? level + 1 : 0 }), 500);
    }

    const GlobalStyle = createGlobalStyle`
        body {
            background: ${getFromTheme('body.bg')};
            color: ${getFromTheme('body.color')};
        }
    `;

    return (
        <GameView>
            <GlobalStyle />
            <GameFieldView {...levelConfig}>
                <SwitchView>
                    <div>Level: {level}</div>
                    <div>
                        Theme mode: <Switch onClick={toggleTheme} />
                    </div>
                </SwitchView>
                <Field
                    {...levelConfig}
                    visible={showLoader}
                    key={level}
                    level={level}
                    field={field}
                    hiddenCells={hiddenCells}
                    dispatch={dispatch}
                    showHidden={showHidden}
                    updateLevel={updateLevel}
                />
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