import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '@screens/Home';
import Brand from '@screens/Brand';
import Model from '@screens/Model';
import Year from '@screens/Year';
import Details from '@screens/Details';
import { PublicRoutesConstants } from '../constants.routes';

export type RootPublicParamList = {
  [PublicRoutesConstants.Home]: undefined;
  [PublicRoutesConstants.Brand]: {
    vehicle: string;
    codigo: string | null;
    brand: string;
  };
  [PublicRoutesConstants.Model]: {
    vehicle: string;
    codigo: string | null;
    brand: string;
  };
  [PublicRoutesConstants.Year]: Partial<{
    codigoModelo: string;
    codigoAno: string;
  }>;
  [PublicRoutesConstants.Details]: { codigoModelo: string; codigoAno: string };
};

const Stack = createStackNavigator<RootPublicParamList>();

const Public = (): React.ReactElement => {
  return (
    <Stack.Navigator initialRouteName={PublicRoutesConstants.Home}>
      <Stack.Screen
        name={PublicRoutesConstants.Home}
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={PublicRoutesConstants.Brand}
        component={Brand}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={PublicRoutesConstants.Model} component={Model} />
      <Stack.Screen name={PublicRoutesConstants.Year} component={Year} />
      <Stack.Screen name={PublicRoutesConstants.Details} component={Details} />
    </Stack.Navigator>
  );
};

export default Public;
