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

setTick(async () => {
  // Pressing the key
  // if (IsControlJustPressed(0, 20)) {
  //   console.info("Player pressed the key [Z]");
  // }

  // Holding the key
  if (IsControlPressed(0, 20)) {
    console.info("Player is holding the key [Z]");

    emit("prisonbreak-nui-welcome", true);
  }
});
