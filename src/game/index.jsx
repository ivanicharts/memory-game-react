import React, { memo, useReducer, useMemo, useEffect } from 'react';

import levels from '../config/levels';
import { Field } from './components/GameField';
import { GameFieldView, GameView, SwitchView } from './components/Styled';
import {
    GameReducer, initialState, NEW_LEVEL,
    FIELD_HIDE, FIELD_SHOW,
} from './game.reducer';
import { generateGameField } from './game.utils';
import Switch from 'rc-switch';

import 'rc-switch/assets/index.css';

function Game ({ toggleTheme }) {
    const [{ level, showHidden, showField }, dispatch] = useReducer(
        GameReducer, initialState
    );

    const levelConfig = levels[level];
    const { cellCount, memoryCount } = levelConfig;

    const { field, hiddenCells } = useMemo(
        () => generateGameField(cellCount, memoryCount),
        [levelConfig]
    );

    useEffect(
        () => setTimeout(dispatch, 500, { type: FIELD_SHOW }),
        [levelConfig],
    );

    function updateLevel(shouldReset) {
        dispatch({ type: FIELD_HIDE });
        setTimeout(dispatch, 500, { type: NEW_LEVEL, level: shouldReset ? 0 : level + 1 });
    }

    return (
        <GameView>
            <GameFieldView {...levelConfig}>
                <SwitchView>
                    <div>Level: {level}</div>
                    <div>
                        Theme mode: <Switch onClick={toggleTheme} />
                    </div>
                </SwitchView>
                <Field
                    {...levelConfig}
                    visible={showField}
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

export default memo(Game);