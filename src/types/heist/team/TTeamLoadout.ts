type TTeamLoadout = Array<TTeamLoadoutWeapon>;

type TTeamLoadoutWeapon = {
  id: string;
  img: string;
  type: string;
  label: string;
  amount: number;
  weight: number;
};
