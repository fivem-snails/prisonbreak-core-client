/**
 * Remove shotgun from police vehicle
 */

const index = PlayerId();

setTick(() => {
  DisablePlayerVehicleRewards(index);
  SetFlyThroughWindscreenParams(35.0, 45.0, 17.0, 2000.0);
});

/**
 * Animation on entering vehicle
 */
// setTick(() => {
//   if (IsPedOnFoot(GetPlayerPed(-1))) {
//     SetRadarZoom(1100);
//   } else if (IsPedInAnyVehicle(GetPlayerPed(-1), true)) {
//     SetPlayerCanDoDriveBy(PlayerId(), false);
//     SetRadarZoom(1100);
//   }
//   if (IsPedGettingIntoAVehicle(PlayerPedId())) {
//     AnimateGameplayCamZoom(1.0, 0.6);
//   }
// });

/**
 * Honk turns on vehicle lights
 */
// setTick(() => {
//   if (IsPedInAnyVehicle(GetPlayerPed(-1), false)) {
//     if (
//       GetPedInVehicleSeat(GetVehiclePedIsUsing(GetPlayerPed(-1)), -1) ==
//       GetPlayerPed(-1)
//     ) {
//       if (IsDisabledControlJustPressed(0, 86)) {
//         SetVehicleLights(GetVehiclePedIsUsing(GetPlayerPed(-1)), 3);
//         SetVehicleLightMultiplier(GetVehiclePedIsUsing(GetPlayerPed(-1)), 15.0);
//       } else if (IsDisabledControlJustReleased(0, 86)) {
//         SetVehicleLights(GetVehiclePedIsUsing(GetPlayerPed(-1)), 0);
//       }
//     }
//   }
// });
