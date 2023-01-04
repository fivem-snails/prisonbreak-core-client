setTick(async () => {
  await setDelay(1);
  SetPedSuffersCriticalHits(PlayerPedId(), false);
  if (IsPedArmed(PlayerPedId(), 6)) {
    DisableControlAction(1, 140, true);
    DisableControlAction(1, 141, true);
    DisableControlAction(1, 142, true);
  }
});
