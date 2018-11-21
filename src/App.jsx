import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import logo from './logo.svg';
import './App.css';

import { Header } from './components/Header';
import Game from './modules/game';
import { lightTheme, darkTheme } from './utils/theme';

function App () {

  const [theme, setTheme] = useState(lightTheme);

  return (
    <ThemeProvider theme={theme}>
      <div onClick={() => setTheme(darkTheme)}>
        <Header />
        <Game />
      </div>
    </ThemeProvider>
  )
}


export default App;
