RegisterCommand(
  "handcuff",
  async (): Promise<void> => {
    try {
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
              emitNet("prisonbreak-core-server:event:character:arrest", authorSrc, authorPed, targetSrc, targetPed);
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
