let playerSpawned = false;

const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const ensurePlayerSpawn = async (): Promise<void> => {
  await delay(3000);

  if (playerSpawned) {
    throw new Error('Player has already spawned');
  }

  playerSpawned = true;

  const localId = GetPlayerIndex();
  const entityId = PlayerPedId();
  const id = GetPlayerServerId(localId);
  const fxname = GetPlayerName(localId);
  const coords = GetEntityCoords(entityId, false);
  const playerData: PlayerData = Object.freeze({
    network: {
      localId: localId,
      entityId: entityId,
      id: id,
      fxname: fxname,
    },
    location: {
      [Position.X]: coords[0] != undefined ? coords[0] : 0,
      [Position.Y]: coords[1] != undefined ? coords[1] : 0,
      [Position.Z]: coords[2] != undefined ? coords[2] : 0,
    },
  });

  console.debug(playerData);

  if (!playerData.network ?? !playerData.location) {
    throw new Error('PlayerData is missing properties.');
  } else {
    NetworkSetFriendlyFireOption(true);
    SetCanAttackFriendly(PlayerPedId(), true, true);
    SetWeaponsNoAutoreload(true);
    SetFlashLightKeepOnWhileMoving(true);
    DisableIdleCamera(true);
    DisplayRadar(true);

    emit('cS.SplashText', '~b~Welcome to AltaRP~s~.', 10, true);
    emitNet('core-back:refreshPlayer', playerData.network.id, playerData);
  }
};

const checkPlayerSpawned = async (): Promise<void> => {
  try {
    await ensurePlayerSpawn();
  } catch (err) {
    if (err instanceof Error) {
      console.error(
        `^1${err.stack}\nPlease report this error to AltaRP developers!^7`,
      );
    }
  }
};

checkPlayerSpawned();
