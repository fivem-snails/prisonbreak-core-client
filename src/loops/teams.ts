setTick((): void => {
  const serverPlayers: number[] = GetActivePlayers();

  for (const id of serverPlayers) {
    const serverPlayerPed: number = GetPlayerPed(id);

    if (serverPlayerPed !== PlayerPedId()) {
      const serverPlayerBlip: number = AddBlipForEntity(serverPlayerPed);

      SetBlipSprite(serverPlayerBlip, 1);
    }
  }
});
