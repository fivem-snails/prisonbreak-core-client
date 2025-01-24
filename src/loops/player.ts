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

let isScoreboardOpen = false;

setTick(async (): Promise<void> => {
  if (IsControlPressed(0, 20)) {
    if (!isScoreboardOpen) {
      emit("prisonbreak-nui-welcome", true);
      isScoreboardOpen = true;
    }
  } else {
    if (isScoreboardOpen) {
      emit("prisonbreak-nui-welcome", false);
      isScoreboardOpen = false;
    }
  }
});
