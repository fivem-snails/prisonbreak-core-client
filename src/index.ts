const AddDelay = async (ms: number): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms, 0);
  });
};

const Spawn = async (): Promise<void> => {
  try {
    const playerIndex: number = GetPlayerIndex();
    const playerSrc: number = GetPlayerServerId(playerIndex);
    const playerPed: number = PlayerPedId();

    emit("Screens/team-choose", false, "");
    emit("alta-nui-welcome", false);

    NetworkResurrectLocalPlayer(714.04, 2523.2, 45.56, 0, 1000, false);
    DoScreenFadeOut(0);
    SetEntityCoordsNoOffset(playerPed, 1714.04, 2523.2, 45.56, false, false, false);
    RemoveAllCoverBlockingAreas();
    RemoveAllPedWeapons(playerPed, false);
    await AddDelay(1600);
    DoScreenFadeIn(1600);
    SetCanAttackFriendly(playerPed, true, true);
    DisableIdleCamera(true);
    DisplayRadar(true);
    DistantCopCarSirens(true);
    AddRelationshipGroup("CRIMINAL");
    AddRelationshipGroup("POLICE");
    SetRelationshipBetweenGroups(3, "CRIMINAL", "POLICE");

    const prisonBlip = AddBlipForCoord(1831.44, 2606.73, 45.57);
    SetBlipSprite(prisonBlip, 188);
    SetBlipScale(prisonBlip, 1);
    SetBlipColour(prisonBlip, 17);
    SetBlipAsShortRange(prisonBlip, false);
    BeginTextCommandSetBlipName("STRING");
    AddTextComponentString("Prison");
    EndTextCommandSetBlipName(prisonBlip);

    const prisonGreenzone = AddBlipForRadius(1851.75, 2606.97, 45.67, 100);
    SetBlipColour(prisonGreenzone, 51);
    SetBlipAlpha(prisonGreenzone, 100);

    const policestationBlip = AddBlipForCoord(449.62, -975.09, 30.69);
    SetBlipSprite(policestationBlip, 60);
    SetBlipScale(policestationBlip, 0.8);
    SetBlipColour(policestationBlip, 3);
    SetBlipAsShortRange(policestationBlip, false);
    BeginTextCommandSetBlipName("STRING");
    AddTextComponentString("PD");
    EndTextCommandSetBlipName(policestationBlip);

    const ammunationBlip = AddBlipForCoord(20.68, -1109, 29.8);
    SetBlipSprite(ammunationBlip, 150);
    SetBlipScale(ammunationBlip, 0.7);
    SetBlipColour(ammunationBlip, 1);
    SetBlipAsShortRange(ammunationBlip, false);
    BeginTextCommandSetBlipName("STRING");
    AddTextComponentString("Ammunation");
    EndTextCommandSetBlipName(ammunationBlip);

    await AddDelay(1600);

    emitNet("Core/Server/Player:Sync", playerSrc);
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
  }
};

Spawn();
