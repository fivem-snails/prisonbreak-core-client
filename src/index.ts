const Waiit = async (ms: number): Promise<number> => {
  return new Promise((resolve): void => {
    setTimeout(resolve, ms, 0);
  });
};

const spawn = async (): Promise<void> => {
  try {
    RegisterKeyMapping("scoreboard", "Scoreboard", "KEYBOARD", "Z");
    RegisterKeyMapping("arrest", "Arrest", "KEYBOARD", "F11");

    const playerIndex: number = GetPlayerIndex();
    const playerSrc: number = GetPlayerServerId(playerIndex);
    const playerPed: number = PlayerPedId();
    const prisonerPed: number = GetHashKey("s_m_y_prisoner_01");

    emit("prisonbreak-nui-hud", false, playerSrc);
    emit("prisonbreak-nui-interact", false, "", 0, "");
    emit("prisonbreak-nui-teamchoose", false, "");
    emit("prisonbreak-nui-welcome", false);
    emit("prisonbreak-nui-scoreboard", false);
    emit("prisonbreak-nui-feedback", false);

    NetworkResurrectLocalPlayer(714.04, 2523.2, 45.56, 0, 1000, false);
    SetEntityCoordsNoOffset(playerPed, 1714.04, 2523.2, 45.56, false, false, false);

    RemoveAllCoverBlockingAreas();
    RemoveAllPedWeapons(playerPed, false);

    DoScreenFadeOut(0);

    await Waiit(500);

    RequestModel(prisonerPed);
    while (!HasModelLoaded(prisonerPed)) {
      await Waiit(100);
    }

    SetPlayerModel(PlayerId(), prisonerPed);
    SetModelAsNoLongerNeeded(prisonerPed);
    SetCanAttackFriendly(playerPed, true, true);

    DoScreenFadeIn(500);

    DisableIdleCamera(true);
    DisplayRadar(false);
    DistantCopCarSirens(true);

    AddRelationshipGroup("CRIMINAL");
    AddRelationshipGroup("POLICE");
    SetRelationshipBetweenGroups(3, "CRIMINAL", "POLICE");

    const prisonBlip: number = AddBlipForCoord(1831.44, 2606.73, 45.57);
    SetBlipSprite(prisonBlip, 188);
    SetBlipScale(prisonBlip, 0.8);
    SetBlipColour(prisonBlip, 1);
    SetBlipAsShortRange(prisonBlip, false);
    BeginTextCommandSetBlipName("STRING");
    AddTextComponentString("Prison");
    EndTextCommandSetBlipName(prisonBlip);

    const policestationBlip: number = AddBlipForCoord(449.62, -975.09, 30.69);
    SetBlipSprite(policestationBlip, 60);
    SetBlipScale(policestationBlip, 0.8);
    SetBlipColour(policestationBlip, 3);
    SetBlipAsShortRange(policestationBlip, false);
    BeginTextCommandSetBlipName("STRING");
    AddTextComponentString("PD");
    EndTextCommandSetBlipName(policestationBlip);

    const ammunationBlip: number = AddBlipForCoord(20.68, -1109, 29.8);
    SetBlipSprite(ammunationBlip, 150);
    SetBlipScale(ammunationBlip, 0.8);
    SetBlipColour(ammunationBlip, 1);
    SetBlipAsShortRange(ammunationBlip, false);
    BeginTextCommandSetBlipName("STRING");
    AddTextComponentString("Ammunation");
    EndTextCommandSetBlipName(ammunationBlip);

    const bankBlip: number = AddBlipForCoord(249.29, 217.37, 106.29);
    SetBlipSprite(bankBlip, 855);
    SetBlipScale(bankBlip, 0.8);
    SetBlipColour(bankBlip, 2);
    SetBlipAsShortRange(bankBlip, false);
    BeginTextCommandSetBlipName("STRING");
    AddTextComponentString("Big Bank Robbery");
    EndTextCommandSetBlipName(bankBlip);

    await Waiit(500);

    emitNet("prisonbreak-core-server:event:player:assign", playerSrc);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

spawn();
