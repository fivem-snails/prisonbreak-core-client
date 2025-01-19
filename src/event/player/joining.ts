const PlayerJoining = (playerJoiningName: string): void => {
  try {
    PlaySoundFrontend(-1, "Popup_Confirm_Success", "GTAO_Exec_SecuroServ_Computer_Sounds", false);
    BeginTextCommandThefeedPost("STRING");
    AddTextComponentSubstringPlayerName(`~c~${playerJoiningName} joined the game.`);
    EndTextCommandThefeedPostTicker(true, true);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

onNet("prisonbreak-core-client:event:player:joining", PlayerJoining);
