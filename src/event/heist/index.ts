let tickId: number;

async function checkIfPlayerIsInBank(): Promise<void> {
  await AddDelay(1000);

  const playerPed = PlayerPedId();
  const playerPos = GetEntityCoords(playerPed, true);
  const playerDistanceToBank = GetDistanceBetweenCoords(
    playerPos[0],
    playerPos[1],
    playerPos[2],
    235.42,
    216.86,
    106.29,
    true,
  );

  if (playerDistanceToBank < 4) {
    console.info("ALARM HAS BEEN TRIGGERED");

    // TODO: Show hud message to player that alarm has been triggered

    return clearTick(tickId);
  }
}

function StartHeist(): void {
  console.info("Starting heist");
  tickId = setTick(checkIfPlayerIsInBank);
}

onNet("Core/Fe/Heist:Start", StartHeist);
