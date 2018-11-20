import React from 'react';
import styled from 'styled-components';

import { getFromTheme } from '../utils';

const HeaderView = styled.header`
    height: ${getFromTheme('header.height')};
    background: ${getFromTheme('header.background')};
    width: 100%;
    transition: all .5s;
`;

export function Header () {
    return (
        <HeaderView />
    )
}

