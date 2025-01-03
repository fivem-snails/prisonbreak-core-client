setTick(async (): Promise<void> => {
  DisablePlayerVehicleRewards(PlayerId());
  SetFlyThroughWindscreenParams(30.0, 0.0, 0.0, 0.0);
  SetVehicleRadioLoud(GetVehiclePedIsIn(GetPlayerPed(-1), false), true);

  const playerCoords: number[] = GetEntityCoords(PlayerPedId(), true);
  const serverVehicles: number[] = GetGamePool("CVehicle");
  // console.info("Player Coords:", {
  //   playerCoords,
  // });
  // console.info("Server Vehicles:", {
  //   serverVehicles,
  // });

  serverVehicles.map(async (serverVehicle: number): Promise<void> => {
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

    // console.info("Vehicle Data:", {
    //   serverVehicle,
    //   serverVehicleCoords,
    //   distancefromPlayerToServerVehicle,
    // });

    if (distancefromPlayerToServerVehicle < 8) {
      const [_, serverVehicleScreenX, serverVehicleScreenY] = GetScreenCoordFromWorldCoord(
        serverVehicleCoords[0],
        serverVehicleCoords[1],
        serverVehicleCoords[2] + 1.0,
      );

      // console.info("Screen Coords:", {
      //   serverVehicleScreenX,
      //   serverVehicleScreenY,
      // });

      const serverVehicleModel: number = GetEntityModel(serverVehicle);
      const serverVehicleModelName: string = GetDisplayNameFromVehicleModel(serverVehicleModel).toLowerCase();

      const playerIndex: number = GetPlayerIndex();
      const playerSrc: number = GetPlayerServerId(playerIndex);

      // const rectWidth: number = 0.07;
      const rectHeight: number = 0.04;

      // DrawRect(serverVehicleScreenX, serverVehicleScreenY + rectHeight / 2, rectWidth, rectHeight, 0, 0, 0, 100);

      emitNet(
        "Core/Server/Shared:GetVehicle",
        playerSrc,
        serverVehicleModelName,
        serverVehicleScreenX,
        serverVehicleScreenY,
        rectHeight,
      );
    }
  });
});
