import React, { useState, useEffect } from 'react';
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  ListRenderItem,
  Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '@services/api';
import Items from '@components/Items';
import Vehicles from '@components/Vehicles';
import { VehicleType } from '@interface/brapp';
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
  const navigation = useNavigation();

  const [data, setData] = useState<Brand[]>([]);
  const [vehicle, setVehicle] = useState('carros');
  const [newData, setNewData] = useState<Brand[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [codigo, setCodigo] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  const loadMore = (page2: number) => {
    const newRecords = [];
    for (let i = page2 * 5, il = i + 5; i < il && i < data.length; i++) {
      newRecords.push(data[i]);
    }
    setNewData([...newData, ...newRecords]);
  };

  const fetch = async () => {
    const response = await api.get(`/${vehicle}/marcas`);
    setData(response.data);
    setPage(0);
    loadMore(0);
  };

  useEffect(() => {
    fetch();
  }, [setNewData, vehicle, setSelected]);

  const renderItems: ListRenderItem<Brand> = ({ item }) => {
    const borderWidth = item.codigo === codigo ? 1 : 0;
    return (
      <Items
        item={item}
        borderWidth={borderWidth}
        onPress={() => {
          setCodigo(item.codigo);
        }}
      />
    );
  };

  const renderVehicles: ListRenderItem<VehicleType> = ({ item }) => {
    const borderWidth = item.id === selected ? 1 : 0;
    return (
      <Vehicles
        item={item}
        borderWidth={borderWidth as number}
        onPress={() => {
          setSelected(item.id);
          setVehicle(
            item.vehicle === 'Caminhões'
              ? 'caminhoes'
              : item.vehicle.toLowerCase(),
          );
          setNewData([]);
        }}
      />
    );
  };
  const onScrollHandler = () => {
    setPage(previousState => previousState + 1);
    loadMore(page);
  };

  return (
    <Container>
      <Tip>Selecione o tipo de veículo:</Tip>
      <FlatList
        horizontal
        data={VEHICLES}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderVehicles}
        showsHorizontalScrollIndicator={false}
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
          onEndReachedThreshold={0}
        />
      </View>
      <TouchableOpacity onPress={onScrollHandler}>
        <Text style={{ color: '#FC570C', textDecorationLine: 'underline' }}>
          Ver mais
        </Text>
      </TouchableOpacity>
      <Button
        title="Próximo"
        color="#FC570C"
        onPress={() => navigation.navigate('Model', { codigo, vehicle })}
      />
    </Container>
  );
};

export default Brand;
