const Delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

let hasSpawned: boolean = false;

async function clientSpawn(): Promise<void> {
  hasSpawned = true;
}

async function clientUpdate(): Promise<void> {
  if (hasSpawned) {
    await Delay(10000);

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

    console.log('Source: ' + source);
    console.log('Coords: ' + coords);

    emitNet('validateClient', source, coords);
  }
}

// player has not yet spawned
clientUpdate();

// player spawns
clientSpawn();

// player has now spawned
clientUpdate();
