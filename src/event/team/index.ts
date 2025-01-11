const TeamAssign = (team: string): void => {
  const groupAlreadyExists: boolean = DoesRelationshipGroupExist(team.toUpperCase());
  if (!groupAlreadyExists) {
    throw new Error(`Relationship group ${team.toUpperCase()} does not exist`);
  }

  console.info("Setting player team to: ", team.toUpperCase());
  SetPedRelationshipGroupHash(PlayerPedId(), team.toUpperCase());
  console.info("Player team is now: ", GetPedRelationshipGroupHash(PlayerPedId()));

  SetNewWaypoint(249.29, 217.37);
  DistantCopCarSirens(false);
  PlaySoundFrontend(-1, "Popup_Confirm_Success", "GTAO_Exec_SecuroServ_Computer_Sounds", false);
  emit("alta-nui-welcome", true);
};

onNet("Core/Client/Team:Assign", TeamAssign);
