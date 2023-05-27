import React, { useState, useEffect } from 'react';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { Detail } from '@interface/brapp';
import VehicleService from '@services/VehicleService';
import { RootPublicParamList } from '@routes/public/index.routes';
import { PublicRoutesConstants } from '@routes/constants.routes';
import { useParams } from '@hooks/params';
import Button from '@components/Button';
import { Header } from '@styles/Header';
import { capitalizeFirstLetter } from '@helpers/String';
import {
  Container,
  PriceWrapper,
  Price,
  LeftText,
  RightText,
  Wrapper,
} from './styles';

const Details: React.FC = () => {
  const [data, setData] = useState({} as Detail);

  const navigation = useNavigation<NavigationProp<RootPublicParamList>>();
  const routes =
    useRoute<RouteProp<RootPublicParamList, PublicRoutesConstants.Year>>();

  const { vehicle, codigo: code, defineCode, defineVehicle } = useParams();
  const { codigoModelo, codigoAno, modelo, brand, year } = routes.params;

  const handleSubmit = (): void => {
    defineCode('');
    defineVehicle('carros');
    navigation.navigate(PublicRoutesConstants.Home);
  };

  const getDetails = async () => {
    if (code && codigoModelo && codigoAno) {
      const response = await VehicleService.getByDetails(
        codigoModelo,
        vehicle,
        code,
        codigoAno,
      );
      setData(response);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <Container>
      <Header>
        Veículos
        {' > '}
        {capitalizeFirstLetter(vehicle)}
        {' > '}
        {capitalizeFirstLetter(brand || '')}
        {' > '}
        {capitalizeFirstLetter(modelo || '')}
        {' > '}
        {capitalizeFirstLetter(year || '')}
      </Header>
      <PriceWrapper>
        <LeftText>Preço</LeftText>
        <Price>{data.Valor}</Price>
      </PriceWrapper>
      <PriceWrapper>
        <LeftText>Marca</LeftText>
        <RightText>{data.Marca}</RightText>
      </PriceWrapper>
      <PriceWrapper>
        <LeftText>Modelo</LeftText>
        <RightText>{data.Modelo}</RightText>
      </PriceWrapper>
      <PriceWrapper>
        <LeftText>Ano modelo</LeftText>
        <RightText>{data.AnoModelo}</RightText>
      </PriceWrapper>
      <PriceWrapper>
        <LeftText>Combustível</LeftText>
        <RightText>{data.Combustivel}</RightText>
      </PriceWrapper>
      <PriceWrapper>
        <LeftText>Código Fipe</LeftText>
        <RightText>{data.CodigoFipe}</RightText>
      </PriceWrapper>
      <PriceWrapper>
        <LeftText>Mês ref.</LeftText>
        <RightText>{data.MesReferencia}</RightText>
      </PriceWrapper>
      <PriceWrapper>
        <LeftText>Sigla Combustível</LeftText>
        <RightText>{data.SiglaCombustivel}</RightText>
      </PriceWrapper>
      <PriceWrapper>
        <LeftText>Tipo Veículo</LeftText>
        <RightText>{data.TipoVeiculo}</RightText>
      </PriceWrapper>
      <Wrapper>
        <Button text="Voltar ao ínicio" onPress={handleSubmit} />
      </Wrapper>
    </Container>
  );
};

export default Details;
