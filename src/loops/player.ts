setTick(() => {
  SetPedSuffersCriticalHits(PlayerPedId(), false);
  if (IsPedArmed(PlayerPedId(), 6)) {
    DisableControlAction(1, 140, true);
    DisableControlAction(1, 141, true);
    DisableControlAction(1, 142, true);
  }
});

setTick(() => {
  if (IsPlayerFreeAiming(PlayerId())) {
    AnimateGameplayCamZoom(1.0, 0.8);
    DisableControlAction(0, 36, true);
    DisableControlAction(0, 22, true);
  }
});

setTick((): void => {
  if (IsControlPressed(0, 20)) {
    const serverPlayersIndices: number[] = GetActivePlayers();

    const serverPlayers: IPlayer[] = serverPlayersIndices.map((serverPlayerIndice: number): IPlayer => {
      const serverPlayerSID: number = GetPlayerServerId(serverPlayerIndice);
      const serverPlayerGroup: number = GetPlayerGroup(serverPlayerIndice);

      return {
        sid: serverPlayerSID,
        group: serverPlayerGroup,
      };
    });

    console.info("serverPlayers:", {
      serverPlayersIndices,
      serverPlayers,
    });

    emit("prisonbreak-nui-scoreboard", true);
  } else {
    emit("prisonbreak-nui-scoreboard", false);
  }
});
