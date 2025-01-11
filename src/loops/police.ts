const dispatch: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

setTick(async (): Promise<void> => {
  await delay(5000);

  SetGarbageTrucks(false);
  SetRandomBoats(false);
  SetCreateRandomCops(false);
  SetCreateRandomCopsNotOnScenarios(false);
  SetCreateRandomCopsOnScenarios(false);
  ClearAreaOfCops(
    GetEntityCoords(serverPlayerPed, false)[0],
    GetEntityCoords(serverPlayerPed, false)[1],
    GetEntityCoords(serverPlayerPed, false)[2],
    10.0,
    false,
  );

  StartAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE");
  SetAudioFlag("PoliceScannerDisabled", true);
  SetPlayerWantedLevel(serverPlayerID, 0, false);
  SetPlayerWantedLevelNow(serverPlayerID, false);

  for (const id of dispatch) EnableDispatchService(id, false);
});
