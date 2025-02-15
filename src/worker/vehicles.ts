setTick(async (): Promise<void> => {
  DisablePlayerVehicleRewards(PlayerId());
  SetFlyThroughWindscreenParams(30.0, 0.0, 0.0, 0.0);
  SetVehicleRadioLoud(GetVehiclePedIsIn(GetPlayerPed(-1), false), true);

  const playerCoords = GetEntityCoords(PlayerPedId(), true);
  const vehicles: number[] = GetGamePool("CVehicle");

  vehicles.map(async (serverVehicle: number): Promise<void> => {
    const vehicleCoords = GetEntityCoords(serverVehicle, true);
    const distancefromPlayerToVehicle = GetDistanceBetweenCoords(
      playerCoords[0],
      playerCoords[1],
      playerCoords[2],
      vehicleCoords[0],
      vehicleCoords[1],
      vehicleCoords[2],
      true,
    );

    // console.info("Vehicle Data:", {
    //   serverVehicle,
    //   serverVehicleCoords,
    //   distancefromPlayerToServerVehicle,
    // });

    if (distancefromPlayerToVehicle < 2) {
      const [_, vehicleScreenX, vehicleScreenY] = GetScreenCoordFromWorldCoord(vehicleCoords[0], vehicleCoords[1], vehicleCoords[2] + 1.0);
      const vehicleModel = GetEntityModel(serverVehicle);
      const vehicleModelName = GetDisplayNameFromVehicleModel(vehicleModel).toLowerCase();
      const rectHeight = 0.04;

      const playerIndex = GetPlayerIndex();
      const playerSrc = GetPlayerServerId(playerIndex);

      emitNet("Core/Server/Shared:GetVehicle", playerSrc, vehicleModelName, vehicleScreenX, vehicleScreenY, rectHeight);
    }
  });
});

setTick((): void => {
  if (IsPedOnFoot(GetPlayerPed(-1))) {
    SetRadarZoom(1100);
  } else if (IsPedInAnyVehicle(GetPlayerPed(-1), true)) {
    SetPlayerCanDoDriveBy(PlayerId(), false);
    SetRadarZoom(1100);
  } else if (IsPedGettingIntoAVehicle(PlayerPedId())) {
    AnimateGameplayCamZoom(1.0, 0.6);
  } else {
    return;
  }
});
