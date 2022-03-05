import { Common, Detail, Model } from '@interface/brapp';
import api from './api';

type ModelProps = {
  vehicle: string;
  codigo: string | null;
};

class VehicleService {
  public static async getByBrand(vehicle: string): Promise<Common[]> {
    const { data } = await api.get(`${vehicle}/marcas`);

    return data;
  }

  public static async getByModel({
    vehicle,
    codigo,
  }: ModelProps): Promise<Model> {
    const { data } = await api.get(`${vehicle}/marcas/${codigo}/modelos`);
    return data;
  }

  public static async getByYear(
    codigoModelo: string,
    vehicle: string,
    codigo: string,
  ): Promise<Common[]> {
    const { data } = await api.get(
      `${vehicle}/marcas/${codigo}/modelos/${codigoModelo}/anos`,
    );
    return data;
  }

  public static async getByDetails(
    codigoModelo: string,
    vehicle: string,
    codigo: string,
    codigoAno: string,
  ): Promise<Detail> {
    const { data } = await api.get(
      `${vehicle}/marcas/${codigo}/modelos/${codigoModelo}/anos/${codigoAno}`,
    );
    return data;
  }
}

export default VehicleService;
