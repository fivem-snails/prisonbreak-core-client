const delay = async (ms: number): Promise<number> => {
  return new Promise((resolve): void => {
    setTimeout(resolve, ms, 0);
  });
};

const serverPlayerIndex: number = GetPlayerIndex();
const serverPlayerID: number = PlayerId();
const serverPlayerSID: number = GetPlayerServerId(serverPlayerIndex);
const serverPlayerPed: number = PlayerPedId();

const spawn = async (): Promise<void> => {
  try {
    emit("Screens/team-choose", false, "");
    emit("alta-nui-welcome", false);
    emit("alta-nui-teamchoose", false);

    NetworkResurrectLocalPlayer(714.04, 2523.2, 45.56, 0, 1000, false);
    DoScreenFadeOut(0);
    SetEntityCoordsNoOffset(serverPlayerPed, 1714.04, 2523.2, 45.56, false, false, false);
    RemoveAllCoverBlockingAreas();
    RemoveAllPedWeapons(serverPlayerPed, false);

    await delay(1600);

    DoScreenFadeIn(1600);
    SetCanAttackFriendly(serverPlayerPed, true, true);
    DisableIdleCamera(true);
    DisplayRadar(true);
    DistantCopCarSirens(true);
    AddRelationshipGroup("CRIMINAL");
    AddRelationshipGroup("POLICE");
    SetRelationshipBetweenGroups(3, "CRIMINAL", "POLICE");

    const prisonBlip: number = AddBlipForCoord(1831.44, 2606.73, 45.57);
    SetBlipSprite(prisonBlip, 188);
    SetBlipScale(prisonBlip, 1.5);
    SetBlipColour(prisonBlip, 17);
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
    SetBlipScale(ammunationBlip, 0.7);
    SetBlipColour(ammunationBlip, 1);
    SetBlipAsShortRange(ammunationBlip, false);
    BeginTextCommandSetBlipName("STRING");
    AddTextComponentString("Ammunation");
    EndTextCommandSetBlipName(ammunationBlip);

    const bankBlip: number = AddBlipForCoord(249.29, 217.37, 106.29);
    SetBlipSprite(bankBlip, 855);
    SetBlipScale(bankBlip, 1.6);
    SetBlipColour(bankBlip, 2);
    SetBlipAsShortRange(bankBlip, false);
    BeginTextCommandSetBlipName("STRING");
    AddTextComponentString("Big Bank Robbery");
    EndTextCommandSetBlipName(bankBlip);

    await delay(1600);

    emitNet("Core/Server/Player:Sync", serverPlayerSID);
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
  }
};

spawn();
