import React from 'react';
import Router from './router/Router';
import { GlobalStyles } from './styles/global';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Router />
    </>
  );
};

export default App;
