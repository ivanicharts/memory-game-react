import React, { memo, useState, useEffect } from 'react';
import styled from 'styled-components';

import config from '../../../config/game';
import { Cell } from './Cell';


import { getFromTheme } from '../../../utils';

const FieldView = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 20px 0;

    opacity: ${({ opacity }) => opacity};
    transform: scale(${({ opacity }) => opacity});
    transition: opacity .2s ease, transform .3s ease;
`;


export const Field = memo(function Field ({
    fieldSize = 0,
    cellCount = 0,
    space = 0,
    memoryCount = 0,
    field = [],
    hiddenCells = [],
    level = 0,
    showHidden = false,
    dispatch,
    checkLevel,
    visible,
}) {
    const cellSize = countCellSize(fieldSize, cellCount, space);
    const { gameField, onCellClick } = useGameField(field, hiddenCells, checkLevel);
   
    useEffect(
        () => {
            dispatch({ type: 'hidden/show' })
            setTimeout(() => dispatch({ type: 'hidden/hide' }), 4000);
        },
        [level]
    );


    console.log('game field', level, field, gameField);
    
    return (
        <FieldView
            opacity={!visible ? 1 : 0}
            onClick={!showHidden ? onCellClick : null}>
            {
                gameField.map((cellValue, i) => (
                    <Cell size={cellSize} space={space} key={i} id={i} value={cellValue} forceShow={showHidden} />
                ))
            }
        </FieldView>
    );
});

function useGameField(field, hiddenCells, checkLevel) {
    const [gameField, setField] = useState(field);
    const [gameHiddenCells, setHidden] = useState(hiddenCells);

    function onCellClick(e) {
        console.log('on cell click', e.target.id, hiddenCells, hiddenCells.includes(Number(e.target.id)));
        
        const { id } = e.target;

        if (hiddenCells.includes(Number(id))) {
            const updatedField = gameField.map((e, i) => i === +id ? 3 : e);
            const updatedHidden = gameHiddenCells.filter(e => e !== Number(id));

            setField(updatedField);
            setHidden(updatedHidden);

            console.log('up', updatedHidden, gameHiddenCells, id);
            

            return !updatedHidden.length && setTimeout(checkLevel, 1000, true);
        }

        const updatedField = gameField.map((e, i) => i === +id ? 0 : e);
        setField(updatedField);

        return checkLevel(false);
    }

    return { gameField, onCellClick };
}

// function useGameField(cellCount, memoryCount) {
//     const cells = [...Array(cellCount * cellCount)].map((_, i) => i);
//     const field = [...cells].fill(1);
//     const highlightOrder = [];

//     for (let i = 0; i < memoryCount; i++) {
//         const rNum = Math.floor(Math.random() * cells.length);
//         const toChange = cells.splice(rNum, 1);

//         highlightOrder.push(toChange);
//         field[toChange] = 2;
//     }

//     return {
//         field, highlightOrder,
//     };
// }

function countCellSize(fieldSize, cellCount, space) {
    return (fieldSize / cellCount - space);
}

function onCellClick (e) {
    console.log(e, e.target, e.target.id);
}
