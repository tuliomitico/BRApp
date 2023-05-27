import React, { useState, useEffect } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
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
import Button from '@components/Button';
import TextButton from '@components/TextButton';
import { Container, ListContainer, Tip, Wrapper } from './styles';

const Model = (): React.ReactElement => {
  const navigation = useNavigation<NavigationProp<RootPublicParamList>>();
  const routes =
    useRoute<RouteProp<RootPublicParamList, PublicRoutesConstants.Model>>();

  const [data, setData] = useState({} as ModelType);
  const [newData, setNewData] = useState<Common[]>([]);
  const [page, setPage] = useState(2);
  const [codigo, setCodigo] = useState<string | null>(null);
  const [modelo, setModelo] = useState<string | null>(null);

  const { vehicle, codigo: code, brand } = routes.params;

  const handleSelectedModel = (id: string, model: string) => {
    setCodigo(id);
    setModelo(model);
  };

  const handleSubmit = () => {
    navigation.navigate(PublicRoutesConstants.Year, {
      codigoModelo: codigo || '',
      modelo: modelo || '',
      brand,
    });
  };

  const getModelList = async () => {
    const response = await VehicleService.getByModel({ vehicle, codigo: code });
    const modelList = { ...response };
    setData(modelList);
    setNewData(modelList.modelos.slice(0, 5));
  };

  const onScrollHandler = () => {
    setPage(prevState => prevState + 1);
    setNewData(data.modelos.slice(0, page * 5));
  };

  useEffect(() => {
    getModelList();
  }, []);

  const renderItems: ListRenderItem<Common> = ({ item }) => {
    const borderWidth = item.codigo === codigo ? 1 : 0;
    return (
      <Items
        item={item}
        onPress={() => handleSelectedModel(item.codigo, item.nome)}
        borderWidth={borderWidth}
      />
    );
  };

  return (
    <Container>
      <Header>
        Veículos
        {' > '}
        {capitalizeFirstLetter(vehicle)}
        {' > '}
        {brand}
      </Header>
      <Tip>Selecione o modelo do veículo</Tip>
      <ListContainer>
        <FlatList
          numColumns={2}
          data={newData}
          keyExtractor={item => item.codigo}
          renderItem={renderItems}
          style={{ flexGrow: 0 }}
        />
        <TextLink onPress={onScrollHandler} />
      </ListContainer>
      <Wrapper>
        <TextButton text="Voltar" onPress={() => navigation.goBack()} />
        <Button text="Próximo" onPress={handleSubmit} />
      </Wrapper>
    </Container>
  );
};

export default Model;
