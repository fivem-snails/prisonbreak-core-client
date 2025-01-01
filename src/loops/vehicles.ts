setTick((): void => {
  DisablePlayerVehicleRewards(PlayerId());
  SetFlyThroughWindscreenParams(65.0, 0.0, 0.0, 0.0);
  SetVehicleRadioLoud(GetVehiclePedIsIn(GetPlayerPed(-1), false), true);
});
