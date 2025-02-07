const CharacterArrest = async (authorPed: number, targetPed: number): Promise<void> => {
  try {
    RequestAnimDict("mp_arrest_paired");
    if (!HasAnimDictLoaded("mp_arrest_paired")) {
      await Waiit(500);
    }

    ClearPedTasksImmediately(authorPed);
    ClearPedTasksImmediately(targetPed);

    TaskPlayAnim(authorPed, "mp_arrest_paired", "cop_p2_back_left", 1.0, 1.0, 6000, 49, 1.0, true, true, true);

    TaskPlayAnim(targetPed, "mp_arrest_paired", "crook_p2_back_left", 1.0, 1.0, 6000, 49, 1.0, true, true, true);

    AttachEntityToEntity(
      targetPed,
      GetPlayerPed(-1),
      11816,
      -0.1,
      0.45,
      0,
      0,
      0,
      20,
      false,
      false,
      false,
      false,
      20,
      false,
    );

    await Waiit(7000);

    // emit("prisonbreak-core-client:event:player:message", "~c~GG! You just arrested a criminal and received ~g~$200");

    DetachEntity(GetPlayerPed(-1), true, false);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

onNet("prisonbreak-core-client:event:character:arrest", CharacterArrest);
