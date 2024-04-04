onNet('Core/Fe/Team:SetTeam', (team: string) => {
  const groupExists = DoesRelationshipGroupExist(team.toUpperCase());
  if (!groupExists) {
    throw new Error(`Relationship group ${team.toUpperCase()} does not exist`);
  }

  console.info('Setting player team to: ', team.toUpperCase());
  SetPedRelationshipGroupHash(PlayerPedId(), team.toUpperCase());

  console.info(
    'Player team is now: ',
    GetPedRelationshipGroupHash(PlayerPedId()),
  );
});
