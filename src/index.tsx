import React from 'react';
import Routes from '@routes/index.routes';
import AppProvider from './hooks';

const App = (): JSX.Element => {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
};

export default App;
