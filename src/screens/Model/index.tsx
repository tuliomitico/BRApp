import React, { useState, useEffect } from 'react';
import { Button, FlatList, ListRenderItem } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Common, Model as ModelType } from '@interface/brapp';
import api from '@services/api';
import Items from '@components/Items';
import { Container } from './styles';

const Model = (): React.ReactElement => {
  const navigation = useNavigation();
  const [data, setData] = useState({} as ModelType);
  const [codigo, setCodigo] = useState<string | null>(null);

  const { codigo: code, vehicle } = navigation
    .getState()
    .routes.map(item => item.params)
    .filter(item => item !== undefined)[0];

  const fetch = async () => {
    const response = await api.get(`/${vehicle}/marcas/${code}/modelos`);
    setData(response.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  const renderItems: ListRenderItem<Common> = ({ item }) => {
    const borderWidth = item.codigo === codigo ? 1 : 0;
    return (
      <Items
        item={item}
        onPress={() => setCodigo(item.codigo)}
        borderWidth={borderWidth}
      />
    );
  };

  return (
    <Container>
      <FlatList
        style={{ height: 300 }}
        numColumns={2}
        data={data.modelos}
        keyExtractor={item => item.codigo}
        renderItem={renderItems}
      />
      <Button
        color="#FC570C"
        title="Próximo"
        onPress={() => navigation.navigate('Year', { codigoModelo: codigo })}
      />
    </Container>
  );
};

export default Model;
