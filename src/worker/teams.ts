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
  await Waiit(1000);

  const playerIndex: number = GetPlayerIndex();
  const playerSrc: number = GetPlayerServerId(playerIndex);
  const playerPed: number = PlayerPedId();
  const playerCoords: number[] = GetEntityCoords(playerPed, false);
  const playerRelationshipGroupHash: number = GetPedRelationshipGroupHash(playerPed);
  const playerRelationshipGroup: "CRIMINAL" | "POLICE" =
    playerRelationshipGroupHash === -1185955016 ? "CRIMINAL" : "POLICE";

  if (playerRelationshipGroup === "POLICE") {
    const serverActivePlayers: number[] = GetActivePlayers();

    for (const serverActivePlayerIndex of serverActivePlayers) {
      const serverActivePlayerSrc: number = GetPlayerServerId(serverActivePlayerIndex);

      const serverActivePlayerPed: number = GetPlayerPed(serverActivePlayerIndex);
      const serverActivePlayerIsNotOurPlayer: boolean = serverActivePlayerPed !== playerPed;

      if (serverActivePlayerIsNotOurPlayer) {
        console.info("Extra Data:", {
          serverActivePlayerSrc,
          serverActivePlayerIndex,
          serverActivePlayerPed,
          serverActivePlayerIsNotOurPlayer,
        });

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
          // console.warn(`[${serverActivePlayerIndex}] is getting close to you!`, {
          //   youPed: playerPed,
          //   youCoords: playerCoords,
          //   youGroup: playerRelationshipGroup,
          //   evilPed: serverActivePlayerPed,
          //   evilCoords: serverActivePlayerCoordinates,
          //   evilGroup: serverActivePlayerRelationshipGroup,
          //   evilDistanceToYou: distanceFromServerActivePlayerToOurPlayer,
          // });

          // let isHandcuffed = false;

          // Arrest the guy (force animation / spawn handcuff prop / hands behind back) also remember the NUI

          // if (isHandcuffed) {
          //   ClearPedSecondaryTask(serverActivePlayerPed);
          //   SetEnableHandcuffs(serverActivePlayerPed, true);
          //   SetCurrentPedWeapon(serverActivePlayerPed, GetHashKey("WEAPON_UNARMED"), true);
          // } else {
          // ClearPedTasksImmediately(serverActivePlayerPed);

          // RequestAnimDict("mp_arrest_paired");
          // }

          ClearPedTasks(serverActivePlayerPed);
          await Waiit(1000);
          RequestAnimDict("mp_arresting");
          if (!HasAnimDictLoaded("mp_arresting")) {
            await Waiit(500);
          }

          // TaskPlayAnim(
          //   GetPlayerPed(serverActivePlayerIndex),
          //   "mp_arresting",
          //   "arrested_spin_l_0",
          //   1.0,
          //   1.0,
          //   4000,
          //   49,
          //   1.0,
          //   true,
          //   true,
          //   true,
          // );

          // TaskPlayAnim(serverActivePlayerPed, "mp_arresting", "idle", 8.0, 1.0, 6000, 49, 1.0, true, true, true);
          // FreezeEntityPosition(serverActivePlayerPed, true);

          console.warn(`Arrested ${serverActivePlayerRelationshipGroup} [${serverActivePlayerIndex}]`);

          // SetEnableHandcuffs(serverActivePlayerPed, true);

          // const serverActivePlayerSrc: number = GetPlayerServerId(serverActivePlayerIndex);
          emitNet("prisonbreak-core-client:event:police:handcuff", playerSrc, playerIndex, serverActivePlayerPed);

          // console.log("🚀 ~ setTick ~ isArrested:", isArrested);

          // isArrested = true;
        }
      }
    }
  }
});
