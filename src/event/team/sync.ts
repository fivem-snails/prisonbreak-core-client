const TeamAssign = async (team: string): Promise<void> => {
  try {
    const groupAlreadyExists = DoesRelationshipGroupExist(team.toUpperCase());
    if (!groupAlreadyExists) {
      throw new Error(`Player relationshipGroup ${team.toUpperCase()} not found`);
    }

    SetPedRelationshipGroupHash(PlayerPedId(), team.toUpperCase());
    DistantCopCarSirens(false);
    PlaySoundFrontend(-1, "Popup_Confirm_Success", "GTAO_Exec_SecuroServ_Computer_Sounds", false);

    const src = GetPlayerServerId(GetPlayerIndex());
    if (!src) {
      throw new Error(`Player src ${src} not found`);
    }

    emit("NUI_HUD", true, src);
    emit("NUI_WELCOME", true);
    emitNet("SERVER_PLAYER_JOINED", src, team);

    await Waiit(35000);

    emit("NUI_FEEDBACK", true);
    PlaySoundFrontend(-1, "Popup_Confirm_Success", "GTAO_Exec_SecuroServ_Computer_Sounds", false);
  } catch (error) {
    handleError(error);
  }
};

onNet("CLIENT_TEAM_SYNC", TeamAssign);
