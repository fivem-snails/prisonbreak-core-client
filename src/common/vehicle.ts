/**
 * Remove shotgun from police vehicle
 */
setTick(() => {
  DisablePlayerVehicleRewards(PlayerId());
});

/**
 * Animation on entering vehicle
 */
setTick(() => {
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
 * Honk turns on vehicle lights
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

/**
 * Vehicle indicators (left and right)
 */
let rightIndicatorOn: boolean = false;
let leftIndicatorOn: boolean = false;
let rightArrowKey: number = 175;
let leftArrowKey: number = 174;

setTick(() => {
  if (IsPedInAnyVehicle(GetPlayerPed(-1), false)) {
    if (
      GetPedInVehicleSeat(GetVehiclePedIsUsing(GetPlayerPed(-1)), -1) ==
      GetPlayerPed(-1)
    ) {
      if (IsControlJustPressed(0, rightArrowKey)) {
        rightIndicatorOn = !rightIndicatorOn;
        SetVehicleIndicatorLights(
          GetVehiclePedIsUsing(GetPlayerPed(-1)),
          0,
          rightIndicatorOn,
        );

        emit('Huds/vehicle', rightIndicatorOn, [{ indicator: 2 }]);
      } else if (IsControlJustPressed(0, leftArrowKey)) {
        leftIndicatorOn = !leftIndicatorOn;
        SetVehicleIndicatorLights(
          GetVehiclePedIsUsing(GetPlayerPed(-1)),
          1,
          leftIndicatorOn,
        );

        emit('Huds/vehicle', leftIndicatorOn, [{ indicator: 1 }]);
      }
    }
  }
});
