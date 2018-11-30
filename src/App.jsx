import React, { useState } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { getFromTheme } from './utils';
import './index.css';

import Game from './game';
import themes from './config/themes.json';

function App () {
  const [themeName, toggleTheme] = useTheme('darkTheme');

  const GlobalStyle = createGlobalStyle`
    body {
        background: ${getFromTheme('body.bg')};
        color: ${getFromTheme('body.color')};
        transition: background .3s ease;
    }
  `;
  
  return (
    <ThemeProvider theme={themes[themeName]}>
      <>
        <GlobalStyle />
        <Game toggleTheme={toggleTheme} />
      </>
    </ThemeProvider>
  );
}

function useTheme(defaultThemeName) {
  const [themeName, setTheme] = useState(defaultThemeName);

  function switchTheme(name) {
    setTheme(themeName === 'darkTheme' ? 'lightTheme' : 'darkTheme');
  }

  return [themeName, switchTheme];
}


export default App;
