import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import './App.scss';

import { Header } from './components/Header';
import { ErrorBoundary } from './components/ErrorBoundary';
import Game from './modules/game';
import * as themes from './utils/theme';

function App () {
  const [theme, toggleTheme] = useTheme('darkTheme');
  console.log('th', theme);
  
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <>
          {/* <Header /> */}
          <Game toggleTheme={toggleTheme} />
        </>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

let indx = 1;

function useTheme(defaultThemeName) {
  const [theme, setTheme] = useState(themes[defaultThemeName]);

  function switchTheme(name) {
    console.log('asdas');
    
    setTheme(themes[indx++ % 2 ? 'lightTheme' : 'darkTheme']);
    // setTheme(themes[name]);
  }

  return [theme, switchTheme];
}


export default App;
