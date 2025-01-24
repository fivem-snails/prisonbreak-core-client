interface IVehicle {
  uuid: string;
  model: string;
  price: number;
  spawnpoint: {
    X: number;
    Y: number;
    Z: number;
    HEADING: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface IPlayer {
  sid: number;
  indice: number;
  group: number;
}
