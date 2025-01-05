const playerBlips: Map<number, number> = new Map();

setTick((): void => {
  const serverPlayers: number[] = GetActivePlayers();
  const activePlayerSet: Set<number> = new Set(serverPlayers);

  // Add or update blips for active players
  for (const id of serverPlayers) {
    const serverPlayerPed: number = GetPlayerPed(id);

    if (serverPlayerPed !== PlayerPedId()) {
      if (!playerBlips.has(id)) {
        const serverPlayerBlip: number = AddBlipForEntity(serverPlayerPed);
        SetBlipSprite(serverPlayerBlip, 1);
        SetBlipColour(serverPlayerBlip, 49);
        SetBlipAsShortRange(serverPlayerBlip, true);
        BeginTextCommandSetBlipName("STRING");
        AddTextComponentString("Criminal");
        EndTextCommandSetBlipName(serverPlayerBlip);
        playerBlips.set(id, serverPlayerBlip);
      }
    }
  }

  // Remove blips for players who are no longer active
  for (const [id, blip] of playerBlips) {
    if (!activePlayerSet.has(id)) {
      RemoveBlip(blip);
      playerBlips.delete(id);
    }
  }
});
