import styled from 'styled-components/native';

export const ButtonContainer = styled.TouchableOpacity`
  background-color: ${props =>
    props.disabled ? 'rgba(252, 87, 12, 0.44)' : '#FC570C'};
  height: 45px;
  width: 187px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const TextButtonContainer = styled.TouchableOpacity`
  background-color: transparent;
  height: 45px;
  width: 187px;
`;

export const ButtonText = styled.Text`
  font-weight: bold;
  color: white;
  font-size: 18px;
`;
