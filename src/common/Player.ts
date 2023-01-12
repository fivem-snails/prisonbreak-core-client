on('playerSpawned', () => {
  SetPedMaxHealth(PlayerPedId(), 600);
});

// let isCrouching = false;

// RegisterCommand(
//   'crouch',
//   () => {
//     if (isCrouching) {
//       if (IsPedArmed(PlayerPedId(), 6)) {
//         ResetPedMovementClipset(PlayerPedId(), 3.0);
//       } else {
//         ResetPedMovementClipset(PlayerPedId(), 0.3);
//       }
//       isCrouching = false;
//     } else {
//       if (!IsPedInAnyVehicle(PlayerPedId(), false)) {
//         ResetPedMovementClipset(PlayerPedId(), 1.0);
//         SetPedCanPlayAmbientAnims(PlayerPedId(), false);
//         SetPedCanPlayAmbientBaseAnims(PlayerPedId(), false);
//         SetPedStealthMovement(PlayerPedId(), false, 'DEFAULT_ACTION');

//         if (IsPedArmed(PlayerPedId(), 6)) {
//           SetPedMovementClipset(PlayerPedId(), 'move_ped_crouched', 4.0);
//         } else {
//           SetPedMovementClipset(PlayerPedId(), 'move_ped_crouched', 0.3);
//         }

//         isCrouching = true;
//       }
//     }
//   },
//   false,
// );

// RegisterKeyMapping('crouch', 'Crouch', 'keyboard', 'Z');
