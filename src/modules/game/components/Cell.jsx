import React, { memo } from 'react';
import styled from 'styled-components';
import { Spring } from 'react-spring';

import { getFromTheme } from '../../../utils';

const CellView = styled.div`
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    background: ${getFromTheme('cell.bg')};
    margin: ${({ space }) => space}px;
    display: flex;
    justify-content: center;
`;

const ActiveCell = styled.div`
    width: ${({ width }) => width}%;
    height: 100%;
    background: ${getFromTheme('cell.activeBg')};
`;

export const Cell = memo(function Cell(props) {
    const { id, value } = props;
    // const [isActive, setActive] = useState(false);

    // oncClick={() => setActive(!isActive)}

    const isActive = value === 3;
    
    return (
        <CellView {...props}>
            {/* <ActiveCell /> */}
            <Spring
                from={{ width: 0 }} to={{ width: isActive ? 100 : 0 }}
            >
                {({ width }) => (<ActiveCell id={id} width={width} />)}
            </Spring>
        </CellView>
    );
});