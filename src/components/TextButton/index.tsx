import React from 'react';
import { GestureResponderEvent } from 'react-native';

import { TextButtonContainer, TextButtonText } from './styles';

type TextButtonProps = {
  text: string;
  onPress: (event: GestureResponderEvent) => void | undefined;
};

const TextButton = ({ text, onPress }: TextButtonProps): React.ReactElement => {
  return (
    <TextButtonContainer onPress={onPress}>
      <TextButtonText>{text}</TextButtonText>
    </TextButtonContainer>
  );
};

export default TextButton;
