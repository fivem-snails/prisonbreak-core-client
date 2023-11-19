type TLoadout = Array<TLoadoutWeapon>;

type TLoadoutWeapon = {
  id: string;
  img: string;
  type: string;
  label: string;
  amount: number;
  weight: number;
};
