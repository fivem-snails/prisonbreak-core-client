const TeamAssign = (team: string): void => {
  const groupAlreadyExists: boolean = DoesRelationshipGroupExist(team.toUpperCase());
  if (!groupAlreadyExists) {
    throw new Error(`Relationship group ${team.toUpperCase()} does not exist`);
  }

  console.info("Setting player team to: ", team.toUpperCase());
  SetPedRelationshipGroupHash(PlayerPedId(), team.toUpperCase());

  console.info("Player team is now: ", GetPedRelationshipGroupHash(PlayerPedId()));
};

onNet("Core/Client/Team:Assign", TeamAssign);
