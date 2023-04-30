let playerSpawned = false;

/**
 * Delays execution for a certain amount of time
 * @param ms amount of time in milliseconds
 * @returns A promise that resolves once delay is complete
 */
const delay = (ms: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

/**
 * Checks if player has spawned by waiting 10 seconds post-spawn
 * @returns a resolved promise void
 */
async function ensurePlayerSpawned(): Promise<void> {
    if (playerSpawned) {
        throw new Error('Player has already spawned');
    }

    playerSpawned = true;
    await delay(3000);

    const localId = GetPlayerIndex();
    const entityId = PlayerPedId();
    const playerId = GetPlayerServerId(localId);
    const fxname = GetPlayerName(localId);
    const coords = GetEntityCoords(entityId, false);
    const playerData: PlayerData = Object.freeze({
        person: {
            localId: localId,
            playerId: playerId,
            fxname: fxname,
        },
        coords: {
            [Position.X]: coords[0] != undefined ? coords[0] : 0,
            [Position.Y]: coords[1] != undefined ? coords[1] : 0,
            [Position.Z]: coords[2] != undefined ? coords[2] : 0,
        },
    });

    // Debug player data to console
    console.debug(playerData);

    // Modify player default settings
    NetworkSetFriendlyFireOption(true);
    SetCanAttackFriendly(PlayerPedId(), true, true);
    SetWeaponsNoAutoreload(true);
    SetFlashLightKeepOnWhileMoving(true);
    DisableIdleCamera(true);
    DisplayRadar(true);

    // Emit event to welcome player and send player object
    emit('cS.SplashText', '~b~Welcome to AltaRP~s~.', 10, true);

    // Check for any missing player properties
    if (!playerData.person ?? !playerData.coords) {
        throw new Error('PlayerData is missing properties.');
    }

    // Emit event to refresh player character
    emitNet('core-back:refreshPlayer', playerData.person.playerId, playerData);
}

async function checkPlayerSpawned(): Promise<void> {
    try {
        await ensurePlayerSpawned();
    } catch (err) {
        if (err instanceof Error) {
            console.error(
                `${err.stack}\n^1Please report this error to AltaRP developers.^7`,
            );
        }
    }
}

/**
 * Invoke function
 */
checkPlayerSpawned();
