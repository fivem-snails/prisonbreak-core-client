async function waitDelay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let hasSpawned: boolean = false;

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
    console.log(`Hi. ^2${GetPlayerName(-1)}^7`);

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
      form: true,
    }),
  );
});

RegisterRawNuiCallback('allowRegistration', async (data: any) => {
  SetNuiFocus(false, false);
  SendNuiMessage(
    JSON.stringify({
      form: false,
    }),
  );

  const formDataString = JSON.stringify(data.body)
    .replace(/[{}"']/g, '')
    .replace(/:/g, '=')
    .replace(/,/g, '&');
  //
  const formDataRegex =
    /^firstname=(.+)&secondname=(.+)&lastname=(.+)&birthdate=(.+)$/;
  let [, firstname, secondname, lastname, birthdate] = formDataRegex.exec(
    formDataString,
  ) || ['', '', '', ''];

  emitNet(
    'captureRegisterFormData',
    firstname,
    secondname,
    lastname,
    birthdate,
  );

  await waitDelay(2000);
  const source = GetPlayerServerId(PlayerId());

  emitNet('validateClient', source);
});
