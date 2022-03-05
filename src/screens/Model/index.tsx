import React, { useState, useEffect } from 'react';
import { Button, FlatList, ListRenderItem } from 'react-native';
import {
  useNavigation,
  useRoute,
  RouteProp,
  NavigationProp,
} from '@react-navigation/native';

import { Common, Model as ModelType } from '@interface/brapp';
import Items from '@components/Items';
import VehicleService from '@services/VehicleService';
import { RootPublicParamList } from '@routes/public/index.routes';
import { PublicRoutesConstants } from '@routes/constants.routes';
import { Header } from '@styles/Header';
import { capitalizeFirstLetter } from '@helpers/String';
import TextLink from '@components/TextLink';
import { Container } from './styles';

const Model = (): React.ReactElement => {
  const navigation = useNavigation<NavigationProp<RootPublicParamList>>();
  const routes =
    useRoute<RouteProp<RootPublicParamList, PublicRoutesConstants.Model>>();

  const [data, setData] = useState({} as ModelType);
  const [newData, setNewData] = useState<Common[]>([]);
  const [page, setPage] = useState(1);
  const [codigo, setCodigo] = useState<string | null>(null);

  const { vehicle, codigo: code, brand } = routes.params;

  const loadMore = (page2: number) => {
    const newRecords = [];
    for (
      let i = page2 * 5, il = i + 5;
      i < il && i < data.modelos.length;
      i++
    ) {
      newRecords.push(data.modelos[i]);
    }
    setNewData([...newData, ...newRecords]);
  };

  const getModelList = async () => {
    const response = await VehicleService.getByModel({ vehicle, codigo: code });
    const modelList = { ...response };
    setData(modelList);
    setNewData(modelList.modelos.slice(0, 5));
    // setPage(0);
    // loadMore(0);
  };

  const onScrollHandler = () => {
    setPage(prevState => prevState + 1);
    setNewData(data.modelos.slice(0, page * 5));
    // loadMore(page);
  };

  useEffect(() => {
    getModelList();
  }, [setNewData]);

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
      <Header>
        Veículos
        {'>'}
        {capitalizeFirstLetter(vehicle)}
        {'>'}
        {brand}
      </Header>
      <FlatList
        style={{ height: 300 }}
        numColumns={2}
        data={newData}
        keyExtractor={item => item.codigo}
        renderItem={renderItems}
      />
      <TextLink onPress={onScrollHandler} />
      <Button
        color="#FC570C"
        title="Próximo"
        onPress={() =>
          navigation.navigate(PublicRoutesConstants.Year, {
            codigoModelo: codigo || '',
          })
        }
      />
    </Container>
  );
};

export default Model;
