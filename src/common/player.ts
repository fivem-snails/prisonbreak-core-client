const playerPed = PlayerPedId();
const playerIndex = PlayerId();

setTick(() => {
  SetPedSuffersCriticalHits(playerPed, false);
  if (IsPedArmed(playerPed, 6)) {
    DisableControlAction(1, 140, true);
    DisableControlAction(1, 141, true);
    DisableControlAction(1, 142, true);
  }
});

setTick(() => {
  if (IsPlayerFreeAiming(playerIndex)) {
    AnimateGameplayCamZoom(1.0, 0.8);
    DisableControlAction(0, 36, true);
    DisableControlAction(0, 22, true);
  }
});
