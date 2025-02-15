const TeamAssign = async (team: string): Promise<void> => {
  try {
    const groupAlreadyExists = DoesRelationshipGroupExist(team.toUpperCase());
    if (!groupAlreadyExists) throw new Error(`Relationship group ${team.toUpperCase()} does not exist`);

    SetPedRelationshipGroupHash(PlayerPedId(), team.toUpperCase());
    DistantCopCarSirens(false);
    PlaySoundFrontend(-1, "Popup_Confirm_Success", "GTAO_Exec_SecuroServ_Computer_Sounds", false);

    const index = GetPlayerIndex();
    const src = GetPlayerServerId(index);

    emit("prisonbreak-nui-hud", true, src);
    emit("prisonbreak-nui-welcome", true);

    emitNet("prisonbreak-core-server:event:player:joined", src, team);

    await Waiit(35000);

    PlaySoundFrontend(-1, "Popup_Confirm_Success", "GTAO_Exec_SecuroServ_Computer_Sounds", false);
    emit("prisonbreak-nui-feedback", true);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Unknown:", error);
    }
  }
};

onNet("prisonbreak-core-client:event:team:assign", TeamAssign);
