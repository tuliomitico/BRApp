import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, FlatList, ListRenderItem } from 'react-native';

import api from '@services/api';
import { Common } from '@interface/brapp';
import Items from '@components/Items';
import { Container } from './styles';

const Year: React.FC = () => {
  const navigation = useNavigation();
  const [codigo, setCodigo] = useState('');
  const [data, setData] = useState<Array<Common>>([]);

  const rotas = navigation.getState().routes;
  const { codigoModelo } = rotas
    .map(item => item.params)
    .filter(item => item !== undefined)[1];
  const { codigo: code, vehicle } = rotas
    .map(item => item.params)
    .filter(item => item !== undefined)[0];

  const fetch = async () => {
    const response = await api.get(
      `/${vehicle}/marcas/${code}/modelos/${codigoModelo}/anos`,
    );
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
        data={data}
        keyExtractor={item => item.codigo}
        renderItem={renderItems}
      />
      <Button
        color="#FC570C"
        title="Próximo"
        onPress={() => navigation.navigate('Details')}
      />
    </Container>
  );
};

export default Year;
