setTick((): void => {
  DisablePlayerVehicleRewards(PlayerId());
  SetFlyThroughWindscreenParams(15.0, 0.0, 0.0, 0.0);
  SetVehicleRadioLoud(GetVehiclePedIsIn(GetPlayerPed(-1), false), true);
});
