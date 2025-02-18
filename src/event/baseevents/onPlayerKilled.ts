on(
  "baseevents:onPlayerKilled",
  (killerId: number, _weaponHash: string, _killerInVeh: boolean, _killerVehSeat: number, _killerVehName: string, _deathCoords: Array<number>) => {
    try {
      emit("baseevents:onPlayerDied", killerId, []);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unknown:", error);
      }
    }
  },
);
