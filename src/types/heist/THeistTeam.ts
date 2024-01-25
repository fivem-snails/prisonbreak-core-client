type THeistTeam = {
  id: number;
  name: string;
  loadout: TTeamLoadout;
  outfit: TTeamOutfit;
  spawns: Array<TSpawn>;
  players: Array<TTeamPlayer>;
  vehicles: Array<TTeamVehicle>;
  time: number;
};
