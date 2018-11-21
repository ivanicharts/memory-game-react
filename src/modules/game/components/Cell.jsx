import React from 'react';
import styled from 'styled-components';

// import config from '../../config/game';


import { getFromTheme } from '../../../utils';

function calcCellSize(props) {
    return '50px';
}

const CellView = styled.div`
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    background: ${getFromTheme('cell.bg')};
`;

export function Cell({ size }) {

    return (
        <CellView size={size} />
    );
}