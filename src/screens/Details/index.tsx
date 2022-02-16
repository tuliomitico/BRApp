import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, View, Text } from 'react-native';

import api from '@services/api';
import { Container } from './styles';

type Detail = {
  Valor: string;
  Marca: string;
  Modelo: string;
  AnoModelo: string;
  Combustivel: string;
  CodigoFipe: string;
  MesReferencia: string;
  TipoVeiculo: number;
  SiglaCombustivel: string;
};

const Details: React.FC = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({} as Detail);

  const fetch = async () => {
    const response = await api.get('carros/marcas/59/modelos/5940/anos/2022-3');
    setData(response.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Container>
      <View>
        <Text>Preço</Text>
        <Text>{data.Valor}</Text>
        <Text>Marca</Text>
        <Text>{data.Marca}</Text>
        <Text>Modelo</Text>
        <Text>{data.Modelo}</Text>
        <Text>Ano</Text>
        <Text>{data.AnoModelo}</Text>
        <Text>Combustível</Text>
        <Text>{data.Combustivel}</Text>
        <Text>Preço</Text>
        <Text>{data.Valor}</Text>
        <Text>Tipo Veículo</Text>
        <Text>{data.TipoVeiculo}</Text>
      </View>
      <Button
        title="Voltar pro ínicio"
        color="#fc570c"
        onPress={() => navigation.navigate('Home')}
      />
    </Container>
  );
};

export default Details;
