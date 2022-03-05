import React, { createContext, useContext, useState } from 'react';

interface ParamsContextData {
  codigo: string | null;
  vehicle: string;
  defineVehicle(vehicle: string): void;
  defineCode(codigo: string): void;
}

const ParamsContext = createContext({} as ParamsContextData);

export const ParamsProvider: React.FC = ({ children }) => {
  const [vehicle, setVehicle] = useState('carros');
  const [codigo, setCodigo] = useState<string | null>(null);

  const defineVehicle = (veiculo: string) => {
    setVehicle(veiculo);
  };
  const defineCode = (code: string) => {
    setCodigo(code);
  };

  return (
    <ParamsContext.Provider
      value={{ defineCode, defineVehicle, vehicle, codigo }}
    >
      {children}
    </ParamsContext.Provider>
  );
};

export function useParams(): ParamsContextData {
  const context = useContext(ParamsContext);

  return context;
}
