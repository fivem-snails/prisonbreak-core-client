const TeamAssign = async (team: string): Promise<void> => {
  try {
    const groupAlreadyExists = DoesRelationshipGroupExist(team.toUpperCase());
    if (!groupAlreadyExists) throw new Error(`Relationship group ${team.toUpperCase()} does not exist`);

    SetPedRelationshipGroupHash(PlayerPedId(), team.toUpperCase());
    DistantCopCarSirens(false);
    PlaySoundFrontend(-1, "Popup_Confirm_Success", "GTAO_Exec_SecuroServ_Computer_Sounds", false);

    const index = GetPlayerIndex();
    const src = GetPlayerServerId(index);

    emit("NUI_HUD", true, src);
    emit("NUI_WELCOME", true);
    emitNet("SERVER_PLAYER_JOINED", src, team);

    await Waiit(35000);

    emit("NUI_FEEDBACK", true);
    PlaySoundFrontend(-1, "Popup_Confirm_Success", "GTAO_Exec_SecuroServ_Computer_Sounds", false);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Unknown:", error);
    }
  }
};

onNet("CLIENT_TEAM_SYNC", TeamAssign);
