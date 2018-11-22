import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import './App.scss';

import { Header } from './components/Header';
import Game from './modules/game';
import * as themes from './utils/theme';

function App () {
  const [theme] = useTheme('lightTheme');

  return (
    <ThemeProvider theme={theme}>
      <>
        <Header />
        <Game />
      </>
    </ThemeProvider>
  );
}

function useTheme(defaultThemeName) {
  const [theme, setTheme] = useState(themes[defaultThemeName]);

  function switchTheme(name) {
    setTheme(themes[name]);
  }

  return [theme, switchTheme];
}


export default App;
