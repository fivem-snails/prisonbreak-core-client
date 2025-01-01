setTick(async (): Promise<void> => {
  await AddDelay(5000);

  DisablePlayerVehicleRewards(PlayerId());
  SetFlyThroughWindscreenParams(30.0, 0.0, 0.0, 0.0);
  SetVehicleRadioLoud(GetVehiclePedIsIn(GetPlayerPed(-1), false), true);

  const playerCoords: number[] = GetEntityCoords(PlayerId(), true);
  const serverVehicles: number[] = GetGamePool("CVehicle");
  console.info("Player Coords:", {
    playerCoords,
  });
  console.info("Server Vehicles:", {
    serverVehicles,
  });

  serverVehicles.map((serverVehicle: number): void => {
    const serverVehicleCoords: number[] = GetEntityCoords(serverVehicle, true);
    const distancefromPlayerToServerVehicle: number = GetDistanceBetweenCoords(
      playerCoords[0],
      playerCoords[1],
      playerCoords[2],
      serverVehicleCoords[0],
      serverVehicleCoords[1],
      serverVehicleCoords[2],
      true,
    );

    console.info("Vehicle Data:", {
      serverVehicle,
      serverVehicleCoords,
      distancefromPlayerToServerVehicle,
    });

    if (distancefromPlayerToServerVehicle < 5) {
      console.info("Vehicle is near player:", {
        distancefromPlayerToServerVehicle,
      });
    }
  });
});
