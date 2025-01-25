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
