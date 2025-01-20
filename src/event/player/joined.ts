const PlayerJoined = (playerJoinedName: string, team: string): void => {
  try {
    const textColor: string = team === "CRIMINAL" ? "~c~" : "~b~";

    PlaySoundFrontend(-1, "Popup_Confirm_Success", "GTAO_Exec_SecuroServ_Computer_Sounds", false);
    BeginTextCommandThefeedPost("STRING");
    AddTextComponentSubstringPlayerName(`${textColor}${playerJoinedName} ~c~joined the game.`);
    EndTextCommandThefeedPostTicker(true, true);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

onNet("prisonbreak-core-client:event:player:joined", PlayerJoined);
