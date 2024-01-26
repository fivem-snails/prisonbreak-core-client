function delay(ms: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function spawn(): Promise<void> {
  try {
    await delay(1000);

    const index = GetPlayerIndex();
    const src = GetPlayerServerId(index);
    const ped = PlayerPedId();
    const playerSchema: TPlayer = { src, index, ped };

    SetCanAttackFriendly(PlayerPedId(), true, true);
    SetFlashLightKeepOnWhileMoving(true);
    DisableIdleCamera(true);
    DisplayRadar(true);

    // Create relationship groups
    AddRelationshipGroup('ROBBERS');
    AddRelationshipGroup('COPPERS');

    // Set relationship between groups, so they can attack each other
    SetRelationshipBetweenGroups(5, 'ROBBERS', 'COPPERS');

    emitNet('Core/Be/User:Sync', playerSchema.src, playerSchema);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error :: spawn', error.message);
    }
  }
}

spawn();
