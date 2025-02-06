RegisterCommand(
  "handcuff",
  async (): Promise<void> => {
    try {
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

              ClearPedTasksImmediately(authorPed);
              ClearPedTasksImmediately(targetPed);

              TaskPlayAnim(
                authorPed,
                "mp_arrest_paired",
                "cop_p2_back_left",
                1.0,
                1.0,
                6000,
                49,
                1.0,
                true,
                true,
                true,
              );

              TaskPlayAnim(
                targetPed,
                "mp_arrest_paired",
                "crook_p2_back_left",
                1.0,
                1.0,
                6000,
                49,
                1.0,
                true,
                true,
                true,
              );

              console.warn(`You just arrested ${targetSrc} ${targetIndex} ${targetPed}`);

              emit("prisonbreak-core-client:event:player:message", "~b~GG! You just arrested a criminal");
            }
          }
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  },
  false,
);
