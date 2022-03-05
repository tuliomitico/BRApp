import React, { useState, useEffect } from 'react';
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  ListRenderItem,
  Button,
} from 'react-native';
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';

import Items from '@components/Items';
import Vehicles from '@components/Vehicles';
import { Common, VehicleType } from '@interface/brapp';
import VehicleService from '@services/VehicleService';
import { useParams } from '@hooks/params';
import { PublicRoutesConstants } from '@routes/constants.routes';
import { RootPublicParamList } from '@routes/public/index.routes';
import { capitalizeFirstLetter } from '@helpers/String';
import { Header } from '@styles/Header';
import TextLink from '@components/TextLink';
import { Container, Tip } from './styles';

type Brand = {
  nome: string;
  codigo: string;
};

const VEHICLES: VehicleType[] = [
  { id: 1, vehicle: 'Carros' },
  { id: 2, vehicle: 'Motos' },
  { id: 3, vehicle: 'Caminhões' },
];

const Brand = (): React.ReactElement => {
  const navigation = useNavigation<NavigationProp<RootPublicParamList>>();
  const focus = useIsFocused();

  const [data, setData] = useState<Common[]>([]);
  const [vehicle, setVehicle] = useState('carros');
  const [newData, setNewData] = useState<Common[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [codigo, setCodigo] = useState<string | null>(null);
  const [brand, setBrand] = useState('');
  const [page, setPage] = useState(0);
  const { defineVehicle, defineCode } = useParams();

  const handleSubmit = () => {
    defineVehicle(vehicle);
    defineCode(codigo || '');
    navigation.navigate(PublicRoutesConstants.Model, {
      vehicle,
      codigo,
      brand,
    });
  };

  const handleToggleVehicle = ({ vehicle: veiculo, id }: VehicleType): void => {
    setSelected(id);
    setVehicle(veiculo === 'Caminhões' ? 'caminhoes' : veiculo.toLowerCase());
    setPage(0);
    setNewData([]);
  };

  const handleSelectBrand = (id: string, marca: string) => {
    setCodigo(id);
    setBrand(marca);
  };

  const loadMore = (page2: number) => {
    const newRecords = [];
    for (let i = page2 * 5, il = i + 5; i < il && i < data.length; i++) {
      newRecords.push(data[i]);
    }
    setNewData([...newData, ...newRecords]);
  };

  const getBrandList = async () => {
    const response = await VehicleService.getByBrand(vehicle);
    setData(response);
    setPage(0);
    loadMore(0);
  };

  useEffect(() => {
    getBrandList();
  }, [vehicle, focus]);

  const renderItems: ListRenderItem<Common> = ({ item }) => {
    const borderWidth = item.codigo === codigo ? 1 : 0;
    return (
      <Items
        item={item}
        borderWidth={borderWidth}
        onPress={() => handleSelectBrand(item.codigo, item.nome)}
      />
    );
  };

  const renderVehicles: ListRenderItem<VehicleType> = ({ item }) => {
    const borderWidth = item.id === selected ? 1 : 0;
    return (
      <Vehicles
        item={item}
        borderWidth={borderWidth as number}
        onPress={() =>
          handleToggleVehicle({
            vehicle: item.vehicle,
            id: item.id,
          })
        }
      />
    );
  };

  const onScrollHandler = () => {
    setPage(previousState => previousState + 1);
    loadMore(page);
  };

  return (
    <Container>
      <Header>
        Veículos
        {' > '}
        {capitalizeFirstLetter(vehicle)}
      </Header>
      <Tip>Selecione o tipo de veículo:</Tip>
      <FlatList
        horizontal
        data={VEHICLES}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderVehicles}
        showsHorizontalScrollIndicator={false}
        style={{
          height: 60,
        }}
      />
      <Tip>Selecione a marca do veículo</Tip>
      <View>
        <FlatList
          style={{ height: 300 }}
          numColumns={3}
          data={newData}
          keyExtractor={item => item.codigo}
          renderItem={renderItems}
          contentContainerStyle={{
            paddingBottom: 100,
            justifyContent: 'center',
          }}
        />
      </View>
      <TextLink onPress={onScrollHandler} />
      <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{
              color: '#FC570C',
              textDecorationLine: 'underline',
              fontWeight: 'bold',
            }}
          >
            Voltar
          </Text>
        </TouchableOpacity>
        <Button
          title="Próximo"
          color="#FC570C"
          onPress={handleSubmit}
          disabled={codigo === null}
        />
      </View>
    </Container>
  );
};

export default Brand;
