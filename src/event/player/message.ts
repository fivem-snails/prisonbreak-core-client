onNet("prisonbreak-core-client:event:player:message", (message: string): void => {
  try {
    PlaySoundFrontend(-1, "INFO", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
    BeginTextCommandThefeedPost("STRING");
    AddTextComponentSubstringPlayerName(message);
    EndTextCommandThefeedPostTicker(true, true);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Unknown:", error);
    }
  }
});
