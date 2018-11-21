import React from 'react';
import styled from 'styled-components';

import config from '../../../config/game';
import { Cell } from './Cell';


import { getFromTheme } from '../../../utils';

const FieldView = styled.div`
    width: 100%;
    height: 100%;
    /* background: ${getFromTheme('cell.bg')}; */
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 20px 0;
`;

const RowView = styled.div`

`;

function countCellSize(fieldSize, cellCount, space) {
    return (fieldSize / cellCount - space);
}

export function Field({ fieldSize = 0, cellCount = 0, space = 0 }) {

    const cellSize = countCellSize(fieldSize, cellCount, space);
    console.log('cc', cellSize);
    

    return (
        <FieldView>
            {
                [...Array(cellCount)].map(() => (
                    [...Array(cellCount)].map(() => (
                        <Cell size={cellSize} space={space} />
                    ))
                ))
            }
        </FieldView>
    );
}