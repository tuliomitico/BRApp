import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #e5e5e5;
  padding: 64px 16px 34px;
  height: 100%;
`;

export const PriceWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

export const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 76px;
`;

export const LeftText = styled.Text`
  font-size: 20px;
  color: #fc570c;
  margin-right: 32px;
`;

export const RightText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #fc570c;
  margin-left: 32px;
`;

export const Price = styled.Text`
  font-size: 30px;
  color: #fc570c;
  font-weight: bold;
  margin-left: 32px;
`;
