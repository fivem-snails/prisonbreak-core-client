let hasSpawned = false;

const waitDelay = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const clientSpawn = async (): Promise<void> => {
  hasSpawned = true;
};

const clientUpdate = async (): Promise<void> => {
  if (hasSpawned) {
    await waitDelay(10000);

    SetCanAttackFriendly(PlayerPedId(), true, true);
    NetworkSetFriendlyFireOption(true);
    SetWeaponsNoAutoreload(true);
    SetWeaponsNoAutoswap(true);
    DisableIdleCamera(true);
    SetFlashLightKeepOnWhileMoving(true);

    emit(
      'cS.Credits',
      'Welcome to',
      'AltaRP\n dsc.gg/altarp',
      0.4,
      0.5,
      20,
      true,
    );

    const source: number = GetPlayerServerId(PlayerId());
    const coords: number[] = GetEntityCoords(PlayerPedId(), false);

    console.log(`Source: ${source}`);
    console.log(`Coords: ${coords}`);

    emitNet('refresh', source);
  }
};

clientUpdate();
clientSpawn();
clientUpdate();

onNet('openRegister', () => {
  SetNuiFocus(true, true);
  SendNuiMessage(
    JSON.stringify({
      showRegister: true,
    }),
  );
});

onNet('die', () => {
  SetEntityHealth(PlayerPedId(), 0);
  SendNuiMessage(
    JSON.stringify({
      showDeathscreen: true,
    }),
  );
});

interface RegisterData {
  firstname: string;
  lastname: string;
  birthdate: string;
}

RegisterRawNuiCallback('register', async (data: {body: string}) => {
  SetNuiFocus(false, false);
  SendNuiMessage(
    JSON.stringify({
      showRegister: false,
    }),
  );

  const jsonData: RegisterData = JSON.parse(data.body);
  const {firstname, lastname, birthdate} = jsonData;

  emitNet('registerData', firstname, lastname, birthdate);

  await waitDelay(2000);
  const source: number = GetPlayerServerId(PlayerId());

  emitNet('refresh', source);
});

RegisterRawNuiCallback('spawn', async () => {
  SetNuiFocus(false, false);
  SendNuiMessage(
    JSON.stringify({
      showDeathscreen: false,
    }),
  );

  SetEntityCoordsNoOffset(
    PlayerPedId(),
    360.67,
    -591.66,
    28.66,
    false,
    false,
    false,
  );
  NetworkResurrectLocalPlayer(360.67, -591.66, 28.66, 251.43, true, false);
  SetPlayerInvincible(PlayerPedId(), false);
  ClearPedBloodDamage(PlayerPedId());
});
