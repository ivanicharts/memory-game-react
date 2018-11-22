import React, { memo, useState, useEffect } from 'react';
import styled from 'styled-components';

import { Cell } from './Cell';

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
    const cellSize = countCellSize(fieldSize, cellCount, space);
    const { gameField, onCellClick } = useGameField(field, hiddenCells, updateLevel);
   
    useEffect(
        () => {
            dispatch({ type: 'hidden/show' })
            setTimeout(() => dispatch({ type: 'hidden/hide' }), 1500);
        },
        [level]
    );

    return (
        <FieldView
            animationState={!visible ? 1 : 0}
            onClick={!showHidden ? onCellClick : null}>
            {
                gameField.map((cellValue, i) => (
                    <Cell size={cellSize} space={space} key={i} id={i} value={cellValue} forceShow={showHidden} />
                ))
            }
        </FieldView>
    );
});

function useGameField(field, hiddenCells, updateLevel) {
    console.log('::USE GAME FIELD::');
    
    const [gameField, setField] = useState(field);
    const [gameHiddenCells, setHidden] = useState(hiddenCells);

    function onCellClick({ target }) {
        const id = Number(target.id);

        if (hiddenCells.includes(id)) {
            const updatedField = gameField.map((e, i) => i === id ? 3 : e);
            const updatedHidden = gameHiddenCells.filter(e => e !== id);

            setField(updatedField);
            setHidden(updatedHidden);

            return !updatedHidden.length && setTimeout(updateLevel, 1000, true);
        }

        const updatedField = gameField.map((e, i) => i === id ? 0 : e);
        setField(updatedField);

        return setTimeout(updateLevel, 1000, false);
    }

    return { gameField, onCellClick };
}

function countCellSize(fieldSize, cellCount, space) {
    return (fieldSize / cellCount - space);
}