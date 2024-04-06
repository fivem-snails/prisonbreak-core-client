function SetTeam(team: string): void {
  const groupExists: boolean = DoesRelationshipGroupExist(team.toUpperCase());
  if (!groupExists) {
    throw new Error(`Relationship group ${team.toUpperCase()} does not exist`);
  }

  console.info("Setting player team to: ", team.toUpperCase());
  SetPedRelationshipGroupHash(PlayerPedId(), team.toUpperCase());

  console.info(
    "Player team is now: ",
    GetPedRelationshipGroupHash(PlayerPedId()),
  );
}

onNet("Core/Fe/Team:SetTeam", SetTeam);
