const visitedVehicles: Set<number> = new Set();

setTick(async () => {
  try {
    DisablePlayerVehicleRewards(PlayerId());
    SetFlyThroughWindscreenParams(30.0, 0.0, 0.0, 0.0);
    SetVehicleRadioLoud(GetVehiclePedIsIn(GetPlayerPed(-1), false), true);

    const playerCoords = GetEntityCoords(PlayerPedId(), true);
    const vehicles: number[] = GetGamePool("CVehicle");

    vehicles.map(async (vehicle) => {
      const vehicleCoords = GetEntityCoords(vehicle, true);
      const distancefromPlayerToVehicle = GetDistanceBetweenCoords(
        playerCoords[0],
        playerCoords[1],
        playerCoords[2],
        vehicleCoords[0],
        vehicleCoords[1],
        vehicleCoords[2],
        true,
      );

      if (distancefromPlayerToVehicle < 2 && !visitedVehicles.has(vehicle)) {
        const [_, vehicleScreenX, vehicleScreenY] = GetScreenCoordFromWorldCoord(vehicleCoords[0], vehicleCoords[1], vehicleCoords[2] + 1.0);
        const vehicleEntity = GetEntityModel(vehicle);
        const vehicleModel = GetDisplayNameFromVehicleModel(vehicleEntity).toLowerCase();

        console.log("VEHICLE_NUI");

        emit("NUI_VEHICLEBUY", true, vehicleModel);

        return visitedVehicles.add(vehicle);
      }

      if (distancefromPlayerToVehicle > 2 && visitedVehicles.has(vehicle)) {
        console.log("VEHICLE_DELETE");

        return visitedVehicles.delete(vehicle);
      }
    });
  } catch (error) {
    handleError(error);
  }
});

setTick(() => {
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
