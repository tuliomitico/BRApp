import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, View, ListRenderItem } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

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
import Button from '@components/Button';
import TextButton from '@components/TextButton';
import { Container, Tip, Wrapper } from './styles';

const VEHICLES: VehicleType[] = [
  { id: 1, vehicle: 'Carros' },
  { id: 2, vehicle: 'Motos' },
  { id: 3, vehicle: 'Caminhões' },
];

const Brand = (): React.ReactElement => {
  const navigation = useNavigation<NavigationProp<RootPublicParamList>>();

  const [data, setData] = useState<Common[]>([]);
  const [vehicle, setVehicle] = useState('carros');
  const [newData, setNewData] = useState<Common[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [codigo, setCodigo] = useState<string | null>(null);
  const [brand, setBrand] = useState('');
  const [page, setPage] = useState(2);
  const { defineVehicle, defineCode } = useParams();

  const handleSubmit = () => {
    defineVehicle(vehicle);
    defineCode(codigo || '');
    navigation.navigate(PublicRoutesConstants.Model, {
      vehicle,
      codigo,
      brand,
      modelo: '',
    });
  };

  const handleToggleVehicle = ({ vehicle: veiculo, id }: VehicleType): void => {
    setSelected(id);
    setVehicle(veiculo === 'Caminhões' ? 'caminhoes' : veiculo.toLowerCase());
    setPage(2);
  };

  const handleSelectBrand = useCallback((id: string, marca: string) => {
    setCodigo(id);
    setBrand(marca);
  }, []);

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
    setNewData(response.slice(0, 5));
    // setPage(0);
    // loadMore(0);
  };

  useEffect(() => {
    getBrandList();
  }, [vehicle]);

  const renderItems: ListRenderItem<Common> = ({ item }) => {
    const { codigo: itemCode, nome } = item;
    const borderWidth = itemCode === codigo ? 1 : 0;

    const onPress = () => handleSelectBrand(itemCode, nome);
    return <Items item={item} borderWidth={borderWidth} onPress={onPress} />;
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
    setNewData(data.slice(0, page * 5));
    // loadMore(page);
  };

  return (
    <Container>
      <Header>
        Veículos
        {' > '}
        {capitalizeFirstLetter(vehicle)}
      </Header>
      <Tip>Selecione o tipo de veículo:</Tip>
      <View>
        <FlatList
          horizontal
          data={VEHICLES}
          keyExtractor={item => item.id.toString()}
          renderItem={renderVehicles}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <Tip>Selecione a marca do veículo</Tip>
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flexGrow: 0 }}
          numColumns={3}
          data={newData}
          keyExtractor={item => item.codigo}
          renderItem={renderItems}
        />
        <TextLink onPress={onScrollHandler} />
      </View>
      <Wrapper>
        <TextButton text="Voltar" onPress={() => navigation.goBack()} />
        <Button
          text="Próximo"
          onPress={handleSubmit}
          disabled={codigo === null}
        />
      </Wrapper>
    </Container>
  );
};

export default Brand;
