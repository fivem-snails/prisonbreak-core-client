let playerSpawned: boolean = false;
let loadTimeout: number = 10000;

const timeout = (ms: number): Promise<{}> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const playerSpawn = (): Promise<void> => {
  if (playerSpawned) {
    return Promise.reject('Player already spawned');
  }

  playerSpawned = true;
  return Promise.resolve();
};

const playerBehavior = (status: boolean): void => {
  SetCanAttackFriendly(PlayerPedId(), status, status);
  NetworkSetFriendlyFireOption(status);
  SetWeaponsNoAutoreload(status);
  SetWeaponsNoAutoswap(status);
  DisableIdleCamera(status);
  SetFlashLightKeepOnWhileMoving(status);
};

const playerSpawnCheck = async (): Promise<void> => {
  if (!playerSpawned) {
    await playerSpawn();
  }

  if (playerSpawned) {
    await timeout(loadTimeout);
    playerBehavior(true);

    emit(
      'cS.Credits',
      'Welcome to',
      'AltaRP\n dsc.gg/altarp',
      0.4,
      0.5,
      30,
      true,
    );

    const player = {
      serverId: GetPlayerServerId(PlayerId()),
      coordinates: GetEntityCoords(PlayerPedId(), false),
    };

    console.info(`Player ServerId: ${player.serverId}`);
    console.info(`Player Coords: ${player.coordinates}`);

    emitNet('refresh', player.serverId);
  }
};

playerSpawn();
playerSpawnCheck();

RegisterCommand(
  'die',
  (source: number, _args: [string, string]) => {
    emit('showDeathscreen', source);
  },
  false,
);
