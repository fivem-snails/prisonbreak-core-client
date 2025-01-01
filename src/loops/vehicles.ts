setTick((): void => {
  DisablePlayerVehicleRewards(PlayerId());
  SetFlyThroughWindscreenParams(65.0, 40.0, 17.0, 2000.0);
  SetVehicleRadioLoud(GetVehiclePedIsIn(GetPlayerPed(-1), false), true);
});
