import React from 'react';
import { ThemeProvider } from 'react-jss';
import { Input } from './components/Input';
import { Screener } from './pages/Screener';
import { theme } from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Screener />
    </ThemeProvider>
  );
}

export default App;
