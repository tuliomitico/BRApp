import React from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';

import { VehicleType } from '@interface/brapp';
import { CarIcon } from '@styles/CarIcon';
import {
  ButtonTitle,
  ButtonContainer,
  TruckIcon,
  MotorCycleIcon,
} from './styles';

type VehiclesParams = {
  item: VehicleType;
  onPress: (event: GestureResponderEvent) => void | undefined;
  borderWidth: number | undefined;
};

const Vehicles = ({
  item,
  onPress,
  borderWidth,
}: VehiclesParams): React.ReactElement => {
  const { vehicle } = item;
  return (
    <ButtonContainer style={{ borderWidth }}>
      <TouchableOpacity onPress={onPress}>
        {vehicle === 'Carros' && <CarIcon size={50} />}
        {vehicle === 'Motos' && <MotorCycleIcon />}
        {vehicle === 'Caminhões' && <TruckIcon />}
        <ButtonTitle>{vehicle}</ButtonTitle>
      </TouchableOpacity>
    </ButtonContainer>
  );
};

export default Vehicles;
