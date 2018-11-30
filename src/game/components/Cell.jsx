import React, { memo } from 'react';
import styled from 'styled-components';

import { getFromTheme } from '../../utils';
import { CORRECT_GUESSED_CELL, HIDDEN_CELL } from '../game.utils';

const CellView = styled.div`
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    background: ${getFromTheme('cell.bg')};
    margin: ${({ space }) => space}px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const ActiveCellView = styled.div`
    width: ${({ width }) => width}%;
    height: 100%;
    background: ${getFromTheme('cell.activeBg')};
    transition: width .2s ease;
    cursor: default;
`;

const FailedCellView = styled.div`
    width: ${({ size }) => size}%;
    height: ${({ size }) => size}%;
    background: ${getFromTheme('cell.failedBg')};
    transition: width .2s ease, height .2s ease;
`;

export const Cell = memo(function Cell(props) {
    const { id, value, forceShowHidden } = props;

    const isActive = (forceShowHidden && value === HIDDEN_CELL) || value === CORRECT_GUESSED_CELL;
    const isFailed = !value;
        
    return (
        <CellView className='no-select' {...props}>
            <ActiveCellView id={id} width={isActive ? 100 : 0} />
            <FailedCellView id={id} size={isFailed ? 100 : 0}/>
        </CellView>
    );
});