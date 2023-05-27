/**
 * An object representing player-related properties
 */
type PlayerData = {
  network: {
    localId: number;
    entityId: number;
    id: number;
    fxname: string;
  };
  location: {
    [Position.X]: number;
    [Position.Y]: number;
    [Position.Z]: number;
  };
};

/**
 * An object representing form-related properties
 */
type Form = {
  firstName: string;
  lastName: string;
  birthDate: string;
};

/**
 * An enum representing player-position
 */
enum Position {
  X = 'x',
  Y = 'y',
  Z = 'z',
}
