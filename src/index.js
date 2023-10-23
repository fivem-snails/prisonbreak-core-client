let playerSpawned = false;

const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const ensurePlayerSpawned = async () => {
  await delay(1000);

  const localId = GetPlayerIndex();
  const entityId = PlayerPedId();
  const playerId = GetPlayerServerId(localId);
  const name = GetPlayerName(localId);
  const coords = GetEntityCoords(entityId, false);

  const playerData = {
    name: name,
    playerId: playerId,
    localId: localId,
    entityId: entityId,
    coords: {
      X: coords[0],
      Y: coords[1],
      Z: coords[2],
    },
  };

  NetworkSetFriendlyFireOption(true);
  SetCanAttackFriendly(PlayerPedId(), true, true);
  SetWeaponsNoAutoreload(true);
  SetFlashLightKeepOnWhileMoving(true);
  DisableIdleCamera(true);
  DisplayRadar(false);

  emit('cS.SplashText', '~b~Welcome to AltaRP~s~.', 10, true);
  emitNet('alta-core-back:playerRefresh', playerData.playerId, playerData);
};

const checkPlayerSpawned = async () => {
  try {
    await ensurePlayerSpawned();
  } catch (err) {
    console.error(
      `^1${err.stack}\nPlease report this error to AltaRP developers!^7`,
    );
  }
};

checkPlayerSpawned();
