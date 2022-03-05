import React from 'react';
import { ParamsProvider } from './params';

const AppProvider: React.FC = ({ children }) => (
  <ParamsProvider>{children}</ParamsProvider>
);

export default AppProvider;
