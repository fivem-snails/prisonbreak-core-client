let hasSpawned: boolean = false;

async function waitDelay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function clientSpawn(): Promise<void> {
  hasSpawned = true;
}

async function clientUpdate(): Promise<void> {
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

    const source = GetPlayerServerId(PlayerId());
    const coords = GetEntityCoords(PlayerPedId(), false);

    console.log(`Source: ${source}`);
    console.log(`Coords: ${coords}`);

    emitNet('validateClient', source, coords);
  }
}

clientUpdate();
clientSpawn();
clientUpdate();

onNet('showRegisterForm', () => {
  SetNuiFocus(true, true);
  SendNuiMessage(
    JSON.stringify({
      enable: true,
    }),
  );
});

RegisterRawNuiCallback('registerCharacter', async (data: any) => {
  SetNuiFocus(false, false);
  SendNuiMessage(
    JSON.stringify({
      enable: false,
    }),
  );

  const jsonData = JSON.parse(data.body);
  const {firstname, lastname, birthdate} = jsonData;
  emitNet('captureRegisterFormData', firstname, lastname, birthdate);

  await waitDelay(2000);
  const source = GetPlayerServerId(PlayerId());

  emitNet('validateClient', source);
});
