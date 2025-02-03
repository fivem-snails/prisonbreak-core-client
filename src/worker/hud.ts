setTick((): void => {
  HideHudComponentThisFrame(3);
  HideHudComponentThisFrame(4);
  HideHudComponentThisFrame(13);
  HideHudComponentThisFrame(6);
  HideHudComponentThisFrame(7);
  HideHudComponentThisFrame(8);
  HideHudComponentThisFrame(9);
  HideHudComponentThisFrame(1);
});

const playerDistances = {};

setTick(async () => {
  const activePlayers: number[] = GetActivePlayers();

  for (const id of activePlayers) {
    const targetPed = GetPlayerPed(id);

    if (targetPed !== PlayerPedId()) {
      if (playerDistances[id] < 5) {
        const targetPedCoords: number[] = GetEntityCoords(targetPed, false);
        const teamHash = GetPedRelationshipGroupHash(targetPed);

        const [onScreen, x, y] = World3dToScreen2d(targetPedCoords[0], targetPedCoords[1], targetPedCoords[2] + 1);

        const distance: number = Math.sqrt(GetGameplayCamCoords()[0] - targetPedCoords[0]);

        let scale = (1 / distance) * 2;
        const fov = (1 / GetGameplayCamFov()) * 100;
        scale = scale * fov;

        const textColour = teamHash === -1185955016 ? [243, 125, 61] : [0, 95, 255];

        if (onScreen) {
          SetTextScale(0.0, 0.4);
          SetTextFont(7);
          SetTextColour(textColour[0], textColour[1], textColour[2], 200);
          SetTextDropShadow();
          SetTextOutline();
          SetTextEntry("STRING");
          AddTextComponentString(GetPlayerName(id));
          DrawText(x, y + 0.024);
        }
      }
    }
  }
});

setTick(async () => {
  const playerPed: number = PlayerPedId();
  const playerCoords: number[] = GetEntityCoords(playerPed, false);
  const activePlayers: number[] = GetActivePlayers();

  for (const id of activePlayers) {
    const targetPed = GetPlayerPed(id);

    if (targetPed !== playerPed) {
      const targetCoords: number[] = GetEntityCoords(targetPed, false);
      const distance = Math.sqrt(
        (playerCoords[0] - targetCoords[0]) ** 2 +
          (playerCoords[1] - targetCoords[1]) ** 2 +
          (playerCoords[2] - targetCoords[2]) ** 2,
      );

      playerDistances[id] = distance;
    }
  }

  await Waiit(1000);
});
