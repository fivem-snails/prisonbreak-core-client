function AddDelay(ms: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function spawn(): Promise<void> {
  try {
    await AddDelay(4000);
    const index = GetPlayerIndex();
    const src = GetPlayerServerId(index);
    const ped = PlayerPedId();

    DoScreenFadeOut(400);
    SetEntityCoordsNoOffset(ped, 1714.04, 2523.2, 45.56, false, false, false);
    RemoveAllPedWeapons(ped, false);

    emit('Screens/team-choose', false, null);
    emit('Screens/team-hud', false, null, null, null, null);

    await AddDelay(10000);

    DoScreenFadeIn(1000);
    SetCanAttackFriendly(ped, true, true);
    DisableIdleCamera(true);
    DisplayRadar(false);
    AddRelationshipGroup('CRIMINAL');
    AddRelationshipGroup('POLICE');
    SetRelationshipBetweenGroups(5, 'CRIMINAL', 'POLICE');

    emitNet('Core/Be/User:Sync', src);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error :: spawn', error.message);
    }
  }
}

spawn();
