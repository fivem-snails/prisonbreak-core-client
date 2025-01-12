setTick(async (): Promise<void> => {
  DisablePlayerVehicleRewards(PlayerId());
  SetFlyThroughWindscreenParams(30.0, 0.0, 0.0, 0.0);
  SetVehicleRadioLoud(GetVehiclePedIsIn(GetPlayerPed(-1), false), true);

  const serverPlayerCoords: number[] = GetEntityCoords(PlayerPedId(), true);
  const serverVehicles: number[] = GetGamePool("CVehicle");

  serverVehicles.map(async (serverVehicle: number): Promise<void> => {
    const serverVehicleCoords: number[] = GetEntityCoords(serverVehicle, true);
    const distancefromPlayerToServerVehicle: number = GetDistanceBetweenCoords(
      serverPlayerCoords[0],
      serverPlayerCoords[1],
      serverPlayerCoords[2],
      serverVehicleCoords[0],
      serverVehicleCoords[1],
      serverVehicleCoords[2],
      true,
    );

    // console.info("Vehicle Data:", {
    //   serverVehicle,
    //   serverVehicleCoords,
    //   distancefromPlayerToServerVehicle,
    // });

    if (distancefromPlayerToServerVehicle < 2) {
      const [_, serverVehicleScreenX, serverVehicleScreenY] = GetScreenCoordFromWorldCoord(
        serverVehicleCoords[0],
        serverVehicleCoords[1],
        serverVehicleCoords[2] + 1.0,
      );

      const serverVehicleModel: number = GetEntityModel(serverVehicle);
      const serverVehicleModelName: string = GetDisplayNameFromVehicleModel(serverVehicleModel).toLowerCase();
      const rectHeight: number = 0.04;

      const serverPlayerIndex: number = GetPlayerIndex();
      const serverPlayerSID: number = GetPlayerServerId(serverPlayerIndex);

      emitNet(
        "Core/Server/Shared:GetVehicle",
        serverPlayerSID,
        serverVehicleModelName,
        serverVehicleScreenX,
        serverVehicleScreenY,
        rectHeight,
      );
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
