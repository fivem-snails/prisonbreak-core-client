let isClientSpawned: boolean = false;
let loadTimeout: number = 10000;

const timeout = (ms: number): Promise<{}> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const clientSpawn = (): Promise<void> => {
  if (isClientSpawned) {
    return Promise.reject('Client has already spawned');
  }
  isClientSpawned = true;
  console.info(`Set isClientSpawned(${isClientSpawned})`);
  return Promise.resolve();
};

const clientBehavior = (status: boolean): void => {
  console.info(`Set clientBehavior(${status})`);

  SetCanAttackFriendly(PlayerPedId(), status, status);
  NetworkSetFriendlyFireOption(status);
  SetWeaponsNoAutoreload(status);
  SetWeaponsNoAutoswap(status);
  DisableIdleCamera(status);
  SetFlashLightKeepOnWhileMoving(status);
};

const clientCheck = async (): Promise<void> => {
  if (!isClientSpawned) {
    await clientSpawn();
  }

  if (isClientSpawned) {
    await timeout(loadTimeout);
    clientBehavior(true);

    emit(
      'cS.Credits',
      'Welcome to',
      'AltaRP\n dsc.gg/altarp',
      0.4,
      0.5,
      30,
      true,
    );

    const client = {
      serverId: GetPlayerServerId(PlayerId()),
      coordinates: GetEntityCoords(PlayerPedId(), false),
    };

    console.info(`clientServerId: ${client.serverId}`);
    console.info(`clientCoords: ${client.coordinates}`);

    emitNet('refresh', client.serverId);
  }
};

clientSpawn();
clientCheck();
