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
    const serverPlayers: string[] = getPlayers();
    const serverPlayersIndices: number[] = GetActivePlayers();

    // const serverPlayers: IPlayer[] = serverPlayersIncides.map((serverPlayerIndices: number): IPlayer => {
    //   const serverPlayerSID: number = GetPlayerServerId(serverPlayerIndices);
    //   const serverPlayerGroup: number = GetPlayerGroup(serverPlayerIndices);

    //   return {
    //     sid: serverPlayerSID,
    //     indice: serverPlayerIndices,
    //     group: serverPlayerGroup,
    //   };
    // });

    console.info("serverPlayers:", {
      serverPlayers,
      serverPlayersIndices,
    });

    emit("prisonbreak-nui-scoreboard", true);
  } else {
    emit("prisonbreak-nui-scoreboard", false);
  }
});
