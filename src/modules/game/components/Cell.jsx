import React from 'react';
import styled from 'styled-components';

import { getFromTheme } from '../../../utils';

const CellView = styled.div`
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    background: ${getFromTheme('cell.bg')};
    margin: ${({ space }) => space}px;
`;

export function Cell(props) {

    return (
        <CellView {...props} />
    );
}