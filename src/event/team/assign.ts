const TeamAssign = async (team: string): Promise<void> => {
  try {
    const groupAlreadyExists: boolean = DoesRelationshipGroupExist(team.toUpperCase());
    if (!groupAlreadyExists) throw new Error(`Relationship group ${team.toUpperCase()} does not exist`);

    console.info("Setting player team to: ", team.toUpperCase());
    SetPedRelationshipGroupHash(PlayerPedId(), team.toUpperCase());
    console.info("Player team is now: ", GetPedRelationshipGroupHash(PlayerPedId()));

    DistantCopCarSirens(false);
    PlaySoundFrontend(-1, "Popup_Confirm_Success", "GTAO_Exec_SecuroServ_Computer_Sounds", false);

    const serverPlayerIndex: number = GetPlayerIndex();
    const serverPlayerSID: number = GetPlayerServerId(serverPlayerIndex);

    emit("prisonbreak-nui-hud", true, serverPlayerSID);
    emit("prisonbreak-nui-welcome", true);

    emitNet("prisonbreak-core-server:event:player:joined", serverPlayerSID, team);

    await delay(35000);

    emit("prisonbreak-nui-feedback", true);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

onNet("prisonbreak-core-client:event:team:assign", TeamAssign);
