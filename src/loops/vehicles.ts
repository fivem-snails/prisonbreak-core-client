setTick(async (): Promise<void> => {
  DisablePlayerVehicleRewards(serverPlayerID);
  SetFlyThroughWindscreenParams(30.0, 0.0, 0.0, 0.0);
  SetVehicleRadioLoud(GetVehiclePedIsIn(serverPlayerPed, false), true);

  const serverPlayerCoords: number[] = GetEntityCoords(serverPlayerPed, true);
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
  if (IsPedOnFoot(serverPlayerPed)) {
    SetRadarZoom(1100);
  } else if (IsPedInAnyVehicle(serverPlayerPed, true)) {
    SetPlayerCanDoDriveBy(serverPlayerID, false);
    SetRadarZoom(1100);
  } else if (IsPedGettingIntoAVehicle(serverPlayerPed)) {
    AnimateGameplayCamZoom(1.0, 0.6);
  } else {
    return;
  }
});
