let isClientSpawned: boolean = false;

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
  console.log(`Set isClientSpawned(${isClientSpawned})`);
  return Promise.resolve();
};

const clientBehavior = (status: boolean): void => {
  console.log(`Set clientBehavior(${status})`);

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
    await timeout(10000);
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

    const clientServerId: number = GetPlayerServerId(PlayerId());
    const clientCoords: number[] = GetEntityCoords(PlayerPedId(), false);

    console.log(`clientServerId: ${clientServerId}`);
    console.log(`clientCoords: ${clientCoords}`);

    emitNet('refresh', clientServerId);
  }
};

clientSpawn();
clientCheck();
