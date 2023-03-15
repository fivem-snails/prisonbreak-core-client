/**
 * Delays execution for a certain amount of time
 * @param ms amount of delay in milliseconds
 * @returns A promise that resolves once delay is complete
 */
const timeout = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

/**
 * Spawns the player
 * @returns a resolved promise if player hasn't already spawned; an error message otherwise
 */
const spawnPlayer = async (): Promise<void> => {
  if (!playerSpawn) {
    playerSpawn = true;
    return Promise.resolve();
  } else {
    throw new Error('Player has already spawned');
  }
};

/**
 * Checks if player has spawned by waiting 10 seconds post-spawn
 */
const checkPlayerSpawned = async (): Promise<void> => {
  try {
    await spawnPlayer();
    await timeout(10000);

    const source = GetPlayerServerId(PlayerId());
    const coords = GetEntityCoords(PlayerPedId(), false);
    const name = GetPlayerName(source);
    const player: Player = { source: source, coords: coords, name: name };

    // Emit event to welcome player and send player object
    emit('cS.Credits', `Hi!\nWelcome to `, 'AltaRP', 0.5, 0.5, 40, true);
    console.info(`Your player tempid: ${player.source}`);
    console.info(`Your player coords: ${player.coords}`);

    // Modify player default settings
    NetworkSetFriendlyFireOption(true);
    SetCanAttackFriendly(PlayerPedId(), true, true);
    SetWeaponsNoAutoreload(true);
    SetFlashLightKeepOnWhileMoving(true);
    DisableIdleCamera(true);
    DisplayRadar(true);

    // Check for any missing player properties before refreshing player
    if (!player.source || !player.coords || !player.name) {
      throw new Error('Please report this error on discord');
    }

    // Emit event to refresh player character
    emitNet('core-back:refreshPlayer', player.source, player);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
};

// Initiate spawning & checking of player
let playerSpawn = false;
checkPlayerSpawned();
