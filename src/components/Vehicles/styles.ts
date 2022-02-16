import styled from 'styled-components/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const ButtonTitle = styled.Text`
  color: #686868;
  font-size: 16px;
  font-weight: bold;
`;

export const ButtonContainer = styled.View`
  border-color: #fc570c;
  background-color: #f5f5f5;
  height: 110px;
  width: 110px;
  border-radius: 11px;
  border-width: 0px;
  align-items: center;
  justify-content: center;
  margin: 8px 8px;
`;

export const MotorCycleIcon = styled(FontAwesome).attrs(() => ({
  name: 'motorcycle',
  size: 50,
  color: '#FC570C',
}))``;

export const TruckIcon = styled(FontAwesome5).attrs(() => ({
  name: 'truck',
  size: 50,
  color: '#FC570C',
}))``;
