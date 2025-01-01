setTick(async (): Promise<void> => {
  DisablePlayerVehicleRewards(PlayerId());
  SetFlyThroughWindscreenParams(30.0, 0.0, 0.0, 0.0);
  SetVehicleRadioLoud(GetVehiclePedIsIn(GetPlayerPed(-1), false), true);

  const playerCoords: number[] = GetEntityCoords(PlayerPedId(), true);
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

    if (distancefromPlayerToServerVehicle < 8) {
      const [_, serverVehicleScreenX, serverVehicleScreenY] = GetScreenCoordFromWorldCoord(
        serverVehicleCoords[0],
        serverVehicleCoords[1],
        serverVehicleCoords[2] + 1.0,
      );

      console.info("Screen Coords:", {
        serverVehicleScreenX,
        serverVehicleScreenY,
      });

      const serverVehicleModel: number = GetEntityModel(serverVehicle);
      const serverVehicleModelName: string = GetDisplayNameFromVehicleModel(serverVehicleModel);

      const rectWidth: number = 0.05;
      const rectHeight: number = 0.03;
      DrawRect(serverVehicleScreenX, serverVehicleScreenY + rectHeight / 2, rectWidth, rectHeight, 0, 0, 0, 150);

      BeginTextCommandDisplayText("STRING");
      SetTextScale(0.0, 0.2);
      SetTextFont(0);
      SetTextProportional(true);
      SetTextColour(255, 255, 255, 255);
      SetTextDropshadow(0, 0, 0, 0, 255);
      SetTextEdge(1, 0, 0, 0, 255);
      SetTextDropShadow();
      SetTextOutline();
      SetTextEntry("STRING");
      AddTextComponentString(`${serverVehicleModelName}`);
      EndTextCommandDisplayText(serverVehicleScreenX, serverVehicleScreenY);
    }
  });
});
