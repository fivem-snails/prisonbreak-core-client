/**
 * You cant get shotgun from pd car and other animations when entering vehicle
 */
setTick(() => {
  DisablePlayerVehicleRewards(PlayerId());

  if (IsPedOnFoot(GetPlayerPed(-1))) {
    SetRadarZoom(1100);
  } else if (IsPedInAnyVehicle(GetPlayerPed(-1), true)) {
    SetPlayerCanDoDriveBy(PlayerId(), false);
    SetRadarZoom(1100);
  }
  if (IsPedGettingIntoAVehicle(PlayerPedId())) {
    AnimateGameplayCamZoom(1.0, 0.6);
  }
});

/**
 * When you press E to honk, should turns on lights
 */
setTick(() => {
  if (IsPedInAnyVehicle(GetPlayerPed(-1), false)) {
    if (
      GetPedInVehicleSeat(GetVehiclePedIsUsing(GetPlayerPed(-1)), -1) ==
      GetPlayerPed(-1)
    ) {
      if (IsDisabledControlJustPressed(0, 86)) {
        SetVehicleLights(GetVehiclePedIsUsing(GetPlayerPed(-1)), 3);
        SetVehicleLightMultiplier(GetVehiclePedIsUsing(GetPlayerPed(-1)), 15.0);
      } else if (IsDisabledControlJustReleased(0, 86)) {
        SetVehicleLights(GetVehiclePedIsUsing(GetPlayerPed(-1)), 0);
      }
    }
  }
});
