const playerBlips: Map<number, number> = new Map();

setTick((): void => {
  const serverPlayers: number[] = GetActivePlayers();

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
});
