import React, { memo } from 'react';
import styled from 'styled-components';

import { getFromTheme } from '../../../utils';

const CellView = styled.div`
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    background: ${getFromTheme('cell.bg')};
    margin: ${({ space }) => space}px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ActiveCell = styled.div.attrs(({ width }) => ({
    style: {
        width: `${width}%`,
    }
}))`
    height: 100%;
    background: ${getFromTheme('cell.activeBg')};
    transition: width .2s ease;
`;

const FailedCell = styled.div.attrs(({ size }) => ({
    style: {
        width: `${size}%`,
        height: `${size}%`,
    }
}))`
    background: ${getFromTheme('cell.failedBg')};
    transition: width .2s ease, height .2s ease;
`;

export const Cell = memo(function Cell(props) {
    console.log('CELLL::::');
    
    const { id, value, forceShow } = props;

    const isActive = (forceShow && value === 2) || value === 3;
    const isFailed = !value;
        
    return (
        <CellView {...props}>
            <ActiveCell id={id} width={isActive ? 100 : 0} />
            <FailedCell id={id} size={isFailed ? 100 : 0}/>
        </CellView>
    );
});