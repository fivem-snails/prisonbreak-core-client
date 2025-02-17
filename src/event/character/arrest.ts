const CharacterArrest = async (authorIndex: number, targetIndex: number): Promise<void> => {
  try {
    ClearPedTasks(GetPlayerPed(authorIndex));
    ClearPedTasks(GetPlayerPed(targetIndex));

    RequestAnimDict("mp_arrest_paired");
    if (!HasAnimDictLoaded("mp_arrest_paired")) {
      await Waiit(500);
    }

    TaskPlayAnim(GetPlayerPed(authorIndex), "mp_arrest_paired", "cop_p2_back_left", 1.0, 1.0, 6000, 49, 1.0, true, true, true);
    TaskPlayAnim(GetPlayerPed(targetIndex), "mp_arrest_paired", "crook_p2_back_left", 1.0, 1.0, 6000, 49, 1.0, true, true, true);

    await Waiit(5000);

    RequestAnimDict("mp_arresting");
    if (!HasAnimDictLoaded("mp_arresting")) {
      await Waiit(500);
    }

    PlaySoundFrontend(-1, "Whistle", "DLC_TG_Running_Back_Sounds", false);
    TaskPlayAnim(GetPlayerPed(targetIndex), "mp_arresting", "idle", 1.0, 1.0, -1, 49, 1.0, true, true, true);

    await Waiit(2000);

    const dispatcherRelationshipGroupHash = GetPedRelationshipGroupHash(PlayerPedId());
    const dispatcherRelationshipGroup = dispatcherRelationshipGroupHash === -1185955016 ? "CRIMINAL" : "POLICE";
    const isDispatcherGroupOfPolice = dispatcherRelationshipGroup === "POLICE";

    if (isDispatcherGroupOfPolice) {
      emit("CLIENT_PLAYER_MESSAGE", "~b~You just arrested a wanted criminal and received ~g~$200");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Unknown:", error);
    }
  }
};

onNet("CLIENT_CHARACTER_ARREST", CharacterArrest);
