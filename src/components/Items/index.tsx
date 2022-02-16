import React from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';

import { Common } from '@interface/brapp';
import { Container, Name } from './styles';

type ItemsProps = {
  item: Common;
  onPress: (event: GestureResponderEvent) => void | undefined;
  borderWidth: number | undefined;
};

const Items = ({
  item,
  onPress,
  borderWidth,
}: ItemsProps): React.ReactElement => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container
        style={{
          borderWidth,
        }}
      >
        <Name>{item.nome}</Name>
      </Container>
    </TouchableOpacity>
  );
};

export default Items;
