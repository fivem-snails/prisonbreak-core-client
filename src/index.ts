function delay(ms: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function spawn(): Promise<void> {
  try {
    await delay(1000);

    const localId = GetPlayerIndex();
    const src = GetPlayerServerId(localId);
    const entityId = PlayerPedId();
    const name = GetPlayerName(localId);
    const coords = GetEntityCoords(entityId, false);

    const userSchema: TUser = {
      name,
      localId,
      entityId,
      coords: {
        x: coords[0],
        y: coords[1],
        z: coords[2],
      },
    };

    SetCanAttackFriendly(PlayerPedId(), true, true);
    SetFlashLightKeepOnWhileMoving(true);
    DisableIdleCamera(true);
    DisplayRadar(true);

    // Create relationship groups
    AddRelationshipGroup('ROBBERS');
    AddRelationshipGroup('COPPERS');

    // Set relationship between groups, so they can attack each other
    SetRelationshipBetweenGroups(5, 'ROBBERS', 'COPPERS');

    emitNet('Core/User:Sync', src, userSchema);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error :: Func/User:Spawn', error.message);
    }
  }
}

spawn();
