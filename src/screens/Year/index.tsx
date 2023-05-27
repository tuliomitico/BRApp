import React, { useState, useEffect } from 'react';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { FlatList, ListRenderItem } from 'react-native';

import { Common } from '@interface/brapp';
import Items from '@components/Items';
import Button from '@components/Button';
import { RootPublicParamList } from '@routes/public/index.routes';
import { PublicRoutesConstants } from '@routes/constants.routes';
import VehicleService from '@services/VehicleService';
import { useParams } from 'src/hooks/params';
import { Header } from '@styles/Header';
import { Wrapper } from '@styles/Wrapper';
import { capitalizeFirstLetter } from '@helpers/String';
import TextButton from '@components/TextButton';
import { Container, Tip } from './styles';

const Year: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootPublicParamList>>();
  const routes =
    useRoute<RouteProp<RootPublicParamList, PublicRoutesConstants.Year>>();
  const [codigo, setCodigo] = useState('');
  const [year, setYear] = useState('');
  const [data, setData] = useState<Array<Common>>([]);

  const { codigoModelo, brand, modelo } = routes.params;
  const { vehicle, codigo: code } = useParams();

  const handleSelectedYear = (id: string, ano: string) => {
    setCodigo(id);
    setYear(ano);
  };

  const handleSubmit = () => {
    navigation.navigate(PublicRoutesConstants.Details, {
      codigoModelo,
      codigoAno: codigo,
      brand,
      modelo,
      year,
    });
  };

  const getYearList = async () => {
    if (code) {
      const response = await VehicleService.getByYear(
        codigoModelo,
        vehicle,
        code,
      );
      setData(response);
    }
  };

  useEffect(() => {
    getYearList();
  }, []);

  const renderItems: ListRenderItem<Common> = ({ item }) => {
    const borderWidth = item.codigo === codigo ? 1 : 0;
    return (
      <Items
        item={item}
        onPress={() => handleSelectedYear(item.codigo, item.nome)}
        borderWidth={borderWidth}
      />
    );
  };
  return (
    <Container>
      <Header>
        Veículo
        {' > '}
        {capitalizeFirstLetter(vehicle)}
        {' > '}
        {capitalizeFirstLetter(brand || '')}
        {' > '}
        {capitalizeFirstLetter(modelo || '')}
      </Header>
      <Tip>Selecione o ano do veículo</Tip>
      <FlatList
        style={{ height: 300 }}
        numColumns={2}
        data={data}
        keyExtractor={item => item.codigo}
        renderItem={renderItems}
      />
      <Wrapper>
        <TextButton text="Voltar" onPress={() => navigation.goBack()} />
        <Button text="Próximo" onPress={handleSubmit} />
      </Wrapper>
    </Container>
  );
};

export default Year;
