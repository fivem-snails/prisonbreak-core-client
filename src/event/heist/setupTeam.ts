onNet('Core/Heist:SetupTeam', (name: string) => {
  const groupExists = DoesRelationshipGroupExist(name.toUpperCase());
  if (!groupExists) {
    throw new Error(`Relationship group ${name.toUpperCase()} does not exist`);
  }

  SetPedRelationshipGroupHash(PlayerPedId(), name.toUpperCase());
});
