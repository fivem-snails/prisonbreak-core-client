on("baseevents:onPlayerDied", async (_killedBy: number, _position: []): Promise<void> => {
  try {
    DoScreenFadeOut(0);
    NetworkResurrectLocalPlayer(1680.81, 2518.49, 45.56, 0, 1000, false);
    await AddDelay(600);
    DoScreenFadeIn(600);
    DoAutoSave();
    DistantCopCarSirens(false);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
});

// on('playerSpawned', () => {
//   const randomHair: number = Math.floor(Math.random() * 10);

//   SetPedComponentVariation(PlayerPedId(), 0, 16, 0, 2); // Face
//   SetPedComponentVariation(PlayerPedId(), 1, 0, 0, 2); // Mask
//   SetPedComponentVariation(PlayerPedId(), 2, randomHair, 4, 2); // Hair
//   SetPedComponentVariation(PlayerPedId(), 3, 0, 0, 2); // Hands / Upperbody
//   SetPedComponentVariation(PlayerPedId(), 4, 10, 0, 0); // Pants
//   SetPedComponentVariation(PlayerPedId(), 5, 0, 0, 0); // Bag / Parachute
//   SetPedComponentVariation(PlayerPedId(), 6, 34, 0, 0); // Shoe
//   SetPedComponentVariation(PlayerPedId(), 8, 1, 0, 0); // T-Shirt
//   SetPedComponentVariation(PlayerPedId(), 9, 0, 0, 0); // Armor
//   SetPedComponentVariation(PlayerPedId(), 11, 16, 2, 0); // Jacket

//   SetEntityInvincible(PlayerPedId(), false);
//   SetEntityCanBeDamaged(PlayerPedId(), true);
//   SetPedMaxHealth(PlayerPedId(), 600);

//   emit('cS.SplashText', '~b~Welcome to AltaRP~s~.', 10, true);
// });
