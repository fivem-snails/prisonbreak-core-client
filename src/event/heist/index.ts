let tickId: number;

async function checkIfPlayerIsInBank(): Promise<void> {
  await delay(1000);

  const playerPed = PlayerPedId();
  const playerPos = GetEntityCoords(playerPed, true);
  const playerDistanceToBank = GetDistanceBetweenCoords(
    playerPos[0],
    playerPos[1],
    playerPos[2],
    235.42,
    216.86,
    106.29,
    true,
  );

  if (playerDistanceToBank < 4) {
    emit("Screens/team-alert", true, "Criminal");
    emit("Screens/alarm", true, "");

    setTimeout(() => {
      emit("Screens/team-alert", false, "");
    }, 4000);

    setTick(() => {
      DrawMarker(
        1,
        256.77,
        219.94,
        105.0,
        0,
        0,
        0,
        0,
        0,
        0,
        1.5,
        1.5,
        1.5,
        255,
        0,
        0,
        0.2,
        false,
        false,
        2,
        true,
        // @ts-ignore
        null,
        null,
        false,
      );

      // const coords = GetEntityCoords(PlayerPedId(), true);
      // const bankdoor = GetClosestObjectOfType(
      //   coords[0],
      //   coords[1],
      //   coords[2],
      //   99999.0,
      //   GetHashKey("prop_ld_bankdoors_02"),
      //   false,
      //   false,
      //   false,
      // );

      // DoorControl(
      //   "v_ilev_cbankvaulgate02",
      //   256.56,
      //   219.97,
      //   106.29,
      //   true,
      //   0,
      //   0,
      //   0,
      // );

      // console.log("Bankdoor", bankdoor);
      // FreezeEntityPosition(bankdoor, true);
    });

    return clearTick(tickId);
  }
}

function StartHeist(): void {
  console.info("Starting heist");
  tickId = setTick(checkIfPlayerIsInBank);
}

onNet("Core/Client/Heist:Start", StartHeist);
