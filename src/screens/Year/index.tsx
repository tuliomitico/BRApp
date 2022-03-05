import React, { useState, useEffect } from 'react';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { Button, FlatList, ListRenderItem } from 'react-native';

import { Common } from '@interface/brapp';
import Items from '@components/Items';
import { RootPublicParamList } from '@routes/public/index.routes';
import { PublicRoutesConstants } from '@routes/constants.routes';
import VehicleService from '@services/VehicleService';
import { useParams } from 'src/hooks/params';
import { Container } from './styles';

const Year: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootPublicParamList>>();
  const routes =
    useRoute<RouteProp<RootPublicParamList, PublicRoutesConstants.Year>>();
  const [codigo, setCodigo] = useState('');
  const [data, setData] = useState<Array<Common>>([]);

  const { codigoModelo } = routes.params;
  const { vehicle, codigo: code } = useParams();

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
        onPress={() =>
          navigation.navigate(PublicRoutesConstants.Details, {
            codigoModelo,
            codigoAno: codigo,
          })
        }
      />
    </Container>
  );
};

export default Year;
