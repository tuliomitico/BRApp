import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Public from './public/index.routes';

function Routes(): React.ReactElement {
  return (
    <NavigationContainer>
      <Public />
    </NavigationContainer>
  );
}

export default Routes;
