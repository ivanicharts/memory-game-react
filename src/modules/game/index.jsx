import React, { memo, useState } from 'react';
import styled from 'styled-components';
import levels from '../../config/levels';

import { Cell } from './components/Cell';
import { Field } from './components/Field';


const GameView = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px 0;
`;

const GameFieldView = styled.div`
    width: 300px;
    height: 300px;
    margin: 20px 0;
`;

function Game () {

    const [currentLevel, setLevel] = useState(0);
    const levelConfig = levels[currentLevel];

    return (
        <GameView>
            <GameFieldView>
                the game...
                <Field {...levelConfig} />
            </GameFieldView>
        </GameView>
    );
}

export default memo(Game);