on("baseevents:onPlayerDied", async (_killedBy: number, _position: []): Promise<void> => {
  try {
    await AddDelay(2600);

    DoScreenFadeOut(0);
    NetworkResurrectLocalPlayer(361.16, -585.09, 28.83, 340.74, 1000, false);

    await AddDelay(2600);

    DoScreenFadeIn(2600);
    DistantCopCarSirens(false);

    await AddDelay(2600);

    BeginTextCommandThefeedPost("STRING");
    AddTextComponentSubstringPlayerName("Hospital Bill: ~r~$200~s~");
    EndTextCommandThefeedPostTicker(true, true);

    await AddDelay(500);

    BeginTextCommandThefeedPost("STRING");
    AddTextComponentSubstringPlayerName("You have been ~r~revived~s~");
    EndTextCommandThefeedPostTicker(true, true);
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
