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
}

export = brapp;
