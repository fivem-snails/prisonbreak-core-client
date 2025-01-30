// Make the loop exec after an event is called

// setTick((): void => {
//   const serverPlayers: number[] = GetActivePlayers();

//   for (const serverPlayerSID of serverPlayers) {
//     const serverPlayerPed: number = GetPlayerPed(serverPlayerSID);

//     if (serverPlayerPed !== PlayerPedId()) {
//       const serverPlayerBlip: number = AddBlipForEntity(serverPlayerPed);
//       const serverPlayerGroupHash: number = GetPedRelationshipGroupHash(serverPlayerPed);
//       const serverPlayerBlipName: string = serverPlayerGroupHash === -1185955016 ? "Criminal" : "Police";
//       const serverPlayerBlipColour: number = serverPlayerGroupHash === -1185955016 ? 44 : 42;

//       SetBlipSprite(serverPlayerBlip, 1);
//       SetBlipColour(serverPlayerBlip, serverPlayerBlipColour);
//       SetBlipAsShortRange(serverPlayerBlip, true);
//       BeginTextCommandSetBlipName("STRING");
//       AddTextComponentString(`${serverPlayerBlipName} [${serverPlayerSID}]`);
//       EndTextCommandSetBlipName(serverPlayerBlip);
//     }
//   }
// });

setTick(async (): Promise<void> => {
  await delay(1000);

  const playerPed: number = PlayerPedId();
  const playerCoords: number[] = GetEntityCoords(playerPed, false);

  const activePlayers: number[] = GetActivePlayers();

  for (const activePlayerSID of activePlayers) {
    const activePlayerPed: number = GetPlayerPed(activePlayerSID);
    const activePlayerGroup: number = GetPedRelationshipGroupHash(activePlayerPed);
    const activePlayerCoordinates: number[] = GetEntityCoords(activePlayerSID, false);

    const distanceFromPlayerToActivePlayer: number = GetDistanceBetweenCoords(
      playerCoords[0],
      playerCoords[1],
      playerCoords[2],
      activePlayerCoordinates[0],
      activePlayerCoordinates[1],
      activePlayerCoordinates[2],
      true,
    );

    console.info(`Hey: ${activePlayerSID}`, {
      activePlayerPed,
      activePlayerGroup,
      activePlayerCoordinates,
      distanceFromPlayerToActivePlayer,
    });
  }
});
