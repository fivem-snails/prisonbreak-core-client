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

setTick(async (): Promise<void> => {
  if (IsControlPressed(0, 20)) {
    console.info("prisonbreak-nui-scoreboard");
    emit("prisonbreak-nui-scoreboard", true);
  } else {
    emit("prisonbreak-nui-scoreboard", false);
    await new Promise((resolve) => setTimeout(resolve, 1000, undefined)); // Wait for 1 second before the next check
  }
});
