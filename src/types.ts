/**
 * An object representing player-related properties
 */
type PlayerData = {
    person: {
        localId: number;
        playerId: number;
        fxname: string;
    };
    coords: {
        [Position.X]: number;
        [Position.Y]: number;
        [Position.Z]: number;
    };
};

/**
 * An object representing form-related properties
 */
type Form = {
    firstname: string;
    lastname: string;
    birthdate: string;
};

/**
 * An enum representing player-position
 */
enum Position {
    X = 'x',
    Y = 'y',
    Z = 'z',
}
