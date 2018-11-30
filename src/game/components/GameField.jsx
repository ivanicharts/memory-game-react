import React, { memo, useState, useEffect } from 'react';
import styled from 'styled-components';


import { HIDDEN_CELL_HIDE, HIDDEN_CELL_SHOW } from '../game.reducer';
import { Cell } from './Cell';
import { WRONG_GUESSED_CELL, CORRECT_GUESSED_CELL } from '../game.utils';

const FieldView = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 20px 0;

    opacity: ${({ animationState }) => animationState};
    transform: scale(${({ animationState }) => animationState});
    transition: opacity .2s ease, transform .3s ease;
`;

export const Field = memo(function Field ({
    fieldSize = 0,
    cellCount = 0,
    space = 0,
    field = [],
    hiddenCells = [],
    level = 0,
    showHidden = false,
    dispatch,
    updateLevel,
    visible,
}) {
    const cellSize = fieldSize / cellCount - space;

    const { gameField, onCellClick } = useGameField(field, hiddenCells, updateLevel);
   
    useEffect(
        () => {
            dispatch({ type: HIDDEN_CELL_SHOW })
            setTimeout(() => dispatch({ type: HIDDEN_CELL_HIDE }), 1500);
        },
        [level]
    );

    return (
        <FieldView
            animationState={visible ? 1 : 0}
            onClick={!showHidden ? onCellClick : null}>
            {
                gameField.map((cellValue, i) => (
                    <Cell
                        size={cellSize}
                        space={space}
                        key={i}
                        id={i}
                        value={cellValue}
                        forceShowHidden={showHidden} />
                ))
            }
        </FieldView>
    );
});

function useGameField(field, hiddenCells, updateLevel) {
    const [gameField, setField] = useState(field);
    const [gameHiddenCells, setHidden] = useState(hiddenCells);

    function onCellClick({ target }) {
        const id = Number(target.id);

        if (hiddenCells.includes(id)) {
            const updatedField = gameField.map((e, i) => i === id ? CORRECT_GUESSED_CELL : e);
            const updatedHidden = gameHiddenCells.filter(e => e !== id);

            setField(updatedField);
            setHidden(updatedHidden);

            return !updatedHidden.length && setTimeout(updateLevel, 1000);
        }

        const updatedField = gameField.map((e, i) => i === id ? WRONG_GUESSED_CELL : e);
        setField(updatedField);

        return setTimeout(updateLevel, 1000, true);
    }

    return { gameField, onCellClick };
}