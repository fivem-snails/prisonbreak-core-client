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

  const playerIndex: number = GetPlayerIndex();
  const playerSID: number = GetPlayerServerId(playerIndex);
  const playerPed: number = PlayerPedId();
  const playerCoords: number[] = GetEntityCoords(playerPed, false);
  const playerGroup: number = GetPedRelationshipGroupHash(playerPed);
  const activePlayers: number[] = GetActivePlayers();

  for (const activePlayerSID of activePlayers) {
    console.info("ActivePlayerSID:", { activePlayerSID });
  }

  // For each activePlayer we get the playerGroup and then check if its "CRIMINAL" and our group is "POLICE" then check for the distance

  console.info("Data:", {
    playerIndex,
    playerSID,
    playerPed,
    playerCoords,
    playerGroup,
    activePlayers,
  });
});
