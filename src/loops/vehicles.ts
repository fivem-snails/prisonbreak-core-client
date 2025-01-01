setTick((): void => {
  DisablePlayerVehicleRewards(PlayerId());
  SetFlyThroughWindscreenParams(30.0, 0.0, 0.0, 0.0);
  SetVehicleRadioLoud(GetVehiclePedIsIn(GetPlayerPed(-1), false), true);

  const playerCoords: number[] = GetEntityCoords(PlayerId(), true);
  const serverVehicles: number[] = GetGamePool("CVehicle");

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

    if (distancefromPlayerToServerVehicle < 5) {
      console.info(`Player is near the vehicle with distance: ${distancefromPlayerToServerVehicle}`);
    }
  });
});
