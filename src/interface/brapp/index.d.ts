declare namespace brapp {
  export interface Common {
    codigo: string;
    nome: string;
  }
  export interface VehicleType {
    id: number;
    vehicle: string;
  }
  export type Model = {
    anos: Common[];
    modelos: Common[];
  };
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
}

export = brapp;
