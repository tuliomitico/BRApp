import React from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';

import { LinkName } from './styles';

const TextLink = ({
  onPress,
}: {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
}): React.ReactElement => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinkName>Ver mais...</LinkName>
    </TouchableOpacity>
  );
};

export default TextLink;
