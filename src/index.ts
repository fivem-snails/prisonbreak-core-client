const AddDelay = async (ms: number): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms, 0);
  });
};

const Spawn = async (): Promise<void> => {
  try {
    const playerIndex: number = GetPlayerIndex();
    const playerId: number = GetPlayerServerId(playerIndex);
    const playerPed: number = PlayerPedId();

    emit("Screens/team-choose", false, "");

    NetworkResurrectLocalPlayer(714.04, 2523.2, 45.56, 0, 1000, false);
    DoScreenFadeOut(0);
    SetEntityCoordsNoOffset(playerPed, 1714.04, 2523.2, 45.56, false, false, false);
    RemoveAllCoverBlockingAreas();
    RemoveAllPedWeapons(playerPed, false);
    await AddDelay(600);
    DoScreenFadeIn(600);
    DoAutoSave();
    SetCanAttackFriendly(playerPed, true, true);
    DisableIdleCamera(true);
    DisplayRadar(false);
    DistantCopCarSirens(true);
    AddRelationshipGroup("CRIMINAL");
    AddRelationshipGroup("POLICE");
    SetRelationshipBetweenGroups(3, "CRIMINAL", "POLICE");

    emitNet("Core/Server/User:Sync", playerId);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

Spawn();
