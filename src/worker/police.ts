const dispatch: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

setTick(async (): Promise<void> => {
  await Waiit(5000);

  SetGarbageTrucks(false);
  SetRandomBoats(false);
  SetCreateRandomCops(false);
  SetCreateRandomCopsNotOnScenarios(false);
  SetCreateRandomCopsOnScenarios(false);
  ClearAreaOfCops(
    GetEntityCoords(PlayerPedId(), false)[0],
    GetEntityCoords(PlayerPedId(), false)[1],
    GetEntityCoords(PlayerPedId(), false)[2],
    10.0,
    false,
  );

  StartAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE");
  SetAudioFlag("PoliceScannerDisabled", true);
  SetPlayerWantedLevel(PlayerId(), 0, false);
  SetPlayerWantedLevelNow(PlayerId(), false);

  for (const id of dispatch) {
    EnableDispatchService(id, false);
  }
});

setTick(async (): Promise<void> => {
  const authorIndex: number = GetPlayerIndex();
  const authorSrc: number = GetPlayerServerId(authorIndex);
  const authorPed: number = PlayerPedId();
  const authorCoords: number[] = GetEntityCoords(authorPed, false);

  const authorRelationshipGroupHash: number = GetPedRelationshipGroupHash(authorPed);
  const authorRelationshipGroup: "CRIMINAL" | "POLICE" =
    authorRelationshipGroupHash === -1185955016 ? "CRIMINAL" : "POLICE";

  const isAuthorGroupOfPolice: boolean = authorRelationshipGroup === "POLICE";

  if (isAuthorGroupOfPolice) {
    const targets: number[] = GetActivePlayers();

    for (const targetIndex of targets) {
      const targetSrc: number = GetPlayerServerId(targetIndex);
      const targetPed: number = GetPlayerPed(targetIndex);

      if (targetPed !== authorPed) {
        const targetCoords: number[] = GetEntityCoords(targetPed, false);

        const distanceFromAuthorToTarget: number = GetDistanceBetweenCoords(
          authorCoords[0],
          authorCoords[1],
          authorCoords[2],
          targetCoords[0],
          targetCoords[1],
          targetCoords[2],
          true,
        );

        if (distanceFromAuthorToTarget < 0.8) {
          RequestAnimDict("mp_arrest_paired");
          if (!HasAnimDictLoaded("mp_arrest_paired")) {
            await Waiit(500);
          }

          AttachEntityToEntity(
            authorPed,
            targetPed,
            11816,
            -0.1,
            0.45,
            0.0,
            0.0,
            0.0,
            20.0,
            false,
            false,
            false,
            false,
            20,
            false,
          );

          TaskPlayAnim(authorPed, "mp_arrest_paired", "cop_p2_back_left", 1.0, 1.0, 6000, 49, 1.0, true, true, true);

          RequestAnimDict("mp_arresting");
          if (!HasAnimDictLoaded("mp_arresting")) {
            await Waiit(500);
          }

          TaskPlayAnim(targetPed, "mp_arrest_paired", "crook_p2_back_left", 1.0, 1.0, 6000, 49, 1.0, true, true, true);

          console.warn(`[${targetSrc}] was arrested by [${authorSrc}]`);

          DetachEntity(authorPed, true, false);

          // Send to prison (fadeOut) and freeze, no server-wide animation needed for now

          emitNet(
            "prisonbreak-core-client:event:police:handcuff",
            authorSrc,
            authorIndex,
            targetSrc,
            targetIndex,
            targetPed,
          );
        }
      }
    }
  }

  await Waiit(10000);
});
