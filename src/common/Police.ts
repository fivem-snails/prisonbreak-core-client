const dispatch = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

setTick(async () => {
  await timeout(5000);
  SetGarbageTrucks(false);
  SetRandomBoats(false);
  SetCreateRandomCops(false);
  SetCreateRandomCopsNotOnScenarios(false);
  SetCreateRandomCopsOnScenarios(false);
  ClearAreaOfCops(
    // @ts-ignore
    GetEntityCoords(PlayerPedId(), false)[0],
    GetEntityCoords(PlayerPedId(), false)[1],
    GetEntityCoords(PlayerPedId(), false)[2],
    10.0,
    0,
  );
  StartAudioScene('CHARACTER_CHANGE_IN_SKY_SCENE');
  SetAudioFlag('PoliceScannerDisabled', true);
  SetPlayerWantedLevel(PlayerId(), 0, false);
  SetPlayerWantedLevelNow(PlayerId(), false);
  for (const id of dispatch) {
    EnableDispatchService(id, false);
  }
});
