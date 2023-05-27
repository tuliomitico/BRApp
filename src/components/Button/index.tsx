import React from 'react';
import { GestureResponderEvent } from 'react-native';

import { ButtonContainer, ButtonText } from './styles';

type ButtonProps = {
  onPress: (event: GestureResponderEvent) => void | undefined;
  text: string;
  disabled?: boolean | null | undefined;
};

const Button = ({
  text,
  onPress,
  disabled,
}: ButtonProps): React.ReactElement => {
  return (
    <ButtonContainer onPress={onPress} disabled={disabled}>
      <ButtonText>{text}</ButtonText>
    </ButtonContainer>
  );
};
const defaultProps = {
  disabled: false,
};
Button.defaultProps = defaultProps;

export default Button;
