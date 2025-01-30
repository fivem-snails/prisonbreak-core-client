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
  const playerRelationshipGroupHash: number = GetPedRelationshipGroupHash(playerPed);
  const playerRelationshipGroup: "CRIMINAL" | "POLICE" =
    playerRelationshipGroupHash === -1185955016 ? "CRIMINAL" : "POLICE";

  if (playerRelationshipGroup === "POLICE") {
    const serverActivePlayers: number[] = GetActivePlayers();

    for (const serverActivePlayerIndex of serverActivePlayers) {
      const serverActivePlayerPed: number = GetPlayerPed(serverActivePlayerIndex);
      const serverActivePlayerIsNotOurPlayer: boolean = serverActivePlayerPed !== playerPed;

      if (serverActivePlayerIsNotOurPlayer) {
        const serverActivePlayerCoordinates: number[] = GetEntityCoords(serverActivePlayerPed, false);
        const distanceFromServerActivePlayerToOurPlayer: number = GetDistanceBetweenCoords(
          playerCoords[0],
          playerCoords[1],
          playerCoords[2],
          serverActivePlayerCoordinates[0],
          serverActivePlayerCoordinates[1],
          serverActivePlayerCoordinates[2],
          true,
        );

        const serverActivePlayerRelationshipGroupHash: number = GetPedRelationshipGroupHash(serverActivePlayerPed);
        const serverActivePlayerRelationshipGroup: "CRIMINAL" | "POLICE" =
          serverActivePlayerRelationshipGroupHash === -1185955016 ? "CRIMINAL" : "POLICE";

        if (distanceFromServerActivePlayerToOurPlayer < 0.8) {
          console.warn(`[${serverActivePlayerIndex}] is getting close to you!`, {
            youPed: playerPed,
            youCoords: playerCoords,
            youGroup: playerRelationshipGroup,
            evilPed: serverActivePlayerPed,
            evilCoords: serverActivePlayerCoordinates,
            evilGroup: serverActivePlayerRelationshipGroup,
            evilDistanceToYou: distanceFromServerActivePlayerToOurPlayer,
          });

          // Arrest the guy (force animation / spawn handcuff prop / hands behind back) also remember the NUI

          SetEnableHandcuffs(serverActivePlayerPed, true);

          emit("prisonbreak-core-client:event:player:message", "~b~Noob you got handcuffed by the Police force.");
        }
      }
    }
  }
});
