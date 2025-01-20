onNet("prisonbreak-core-client:event:player:message", (message: string): void => {
  try {
    PlaySoundFrontend(-1, "Popup_Confirm_Success", "GTAO_Exec_SecuroServ_Computer_Sounds", false);
    BeginTextCommandThefeedPost("STRING");
    AddTextComponentSubstringPlayerName(message);
    EndTextCommandThefeedPostTicker(true, true);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
});
