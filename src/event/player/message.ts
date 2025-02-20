onNet("CLIENT_PLAYER_MESSAGE", (message: string): void => {
  try {
    PlaySoundFrontend(-1, "INFO", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
    BeginTextCommandThefeedPost("STRING");
    AddTextComponentSubstringPlayerName(message);
    EndTextCommandThefeedPostTicker(true, true);
  } catch (error) {
    handleError(error);
  }
});
