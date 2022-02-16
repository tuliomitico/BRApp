import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { PublicRoutesConstants } from '@routes/constants.routes';
import {
  ButtonContainer,
  ButtonTitle,
  Container,
  Description,
  SupTitle,
  Title,
  Wrapper,
} from './styles';
import { CarIcon } from '../../styles/CarIcon';

const Home: React.FC = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <Title>Olá</Title>
      <SupTitle>Bem vindo ao BRApp.</SupTitle>
      <Wrapper>
        <Description>
          Aqui é possível realizar buscas das informações mais relevantes, basta
          selecionar um tema abaixo.
        </Description>
      </Wrapper>
      <ButtonContainer>
        <TouchableOpacity
          onPress={() => navigation.navigate(PublicRoutesConstants.Brand)}
        >
          <CarIcon size={150} />
          <ButtonTitle>Veiculos</ButtonTitle>
        </TouchableOpacity>
      </ButtonContainer>
    </Container>
  );
};

export default Home;
