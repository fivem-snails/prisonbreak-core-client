/**
 * Hide all HUD components except for minimap
 */
setTick(() => {
  HideHudComponentThisFrame(3);
  HideHudComponentThisFrame(4);
  HideHudComponentThisFrame(13);
  HideHudComponentThisFrame(6);
  HideHudComponentThisFrame(7);
  HideHudComponentThisFrame(8);
  HideHudComponentThisFrame(9);
  HideHudComponentThisFrame(1);
});

setTick(async () => {
  await delay(500);
  emitNet('Core/User:SyncHud');
});
