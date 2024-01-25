type THeist = {
  id: number;
  name: string;
  teams: Array<THeistTeam>;
  slots: number;
  eta: number;
  players: Array<THeistPlayer>;
  area: THeistArea;
  status: string;
  background: string;
};
