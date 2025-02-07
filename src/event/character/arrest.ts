const CharacterArrest = async (authorIndex: number, targetIndex: number): Promise<void> => {
  try {
    console.info("CharacterArrest:", {
      authorIndex,
      targetIndex,
    });

    RequestAnimDict("mp_arrest_paired");
    if (!HasAnimDictLoaded("mp_arrest_paired")) {
      await Waiit(500);
    }

    TaskPlayAnim(
      GetPlayerPed(authorIndex),
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
      GetPlayerPed(targetIndex),
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

    await Waiit(7000);

    RequestAnimDict("mp_arresting");
    if (!HasAnimDictLoaded("mp_arresting")) {
      await Waiit(500);
    }

    TaskPlayAnim(GetPlayerPed(targetIndex), "mp_arresting", "idle", 1.0, 1.0, -1, 49, 1.0, true, true, true);

    const dispatcherRelationshipGroupHash: number = GetPedRelationshipGroupHash(PlayerPedId());
    const dispatcherRelationshipGroup: "CRIMINAL" | "POLICE" =
      dispatcherRelationshipGroupHash === -1185955016 ? "CRIMINAL" : "POLICE";

    const isDispatcherGroupOfPolice: boolean = dispatcherRelationshipGroup === "POLICE";

    if (isDispatcherGroupOfPolice) {
      emit("prisonbreak-core-client:event:player:message", "~c~GG! You just arrested a criminal and received ~g~$200");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

onNet("prisonbreak-core-client:event:character:arrest", CharacterArrest);
