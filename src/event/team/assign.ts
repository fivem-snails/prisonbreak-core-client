const TeamAssign = (team: string): void => {
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

    emit("alta-nui-hud", true, serverPlayerSID);
    emit("alta-nui-welcome", true);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

onNet("prisonbreak-core-client:event:team:assign", TeamAssign);
