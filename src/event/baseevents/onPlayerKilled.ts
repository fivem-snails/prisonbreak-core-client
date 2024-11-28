on(
  "baseevents:onPlayerKilled",
  (
    _killerId: number,
    _weaponHash: string,
    _killerInVeh: boolean,
    _killerVehSeat: number,
    _killerVehName: string,
    _deathCoords: Array<number>,
  ) => {
    emit("Screens/death", true, 100);
  },
);
