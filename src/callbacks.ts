interface Form {
  firstName: string;
  lastName: string;
  birthDate: string;
  createDate: string;
}

RegisterRawNuiCallback('hideRegisterform', async (data: {body: string}) => {
  SetNuiFocus(false, false);
  SendNuiMessage(
    JSON.stringify({
      registerform: false,
    }),
  );

  const source: number = GetPlayerServerId(PlayerId());
  const jsonData: Form = JSON.parse(data.body);
  const {firstName, lastName, birthDate, createDate} = jsonData;

  emitNet('submitRegisterform', firstName, lastName, birthDate, createDate);
  await timeout(2000);
  emitNet('refresh', source);
});

RegisterRawNuiCallback('hideDeathscreen', async () => {
  SetNuiFocus(false, false);
  SendNuiMessage(
    JSON.stringify({
      deathscreen: false,
    }),
  );
  
  if (GetEntityHealth(PlayerPedId()) > 1) {
    return;
  } else {
    SetEntityCoordsNoOffset(
      PlayerPedId(),
      360.67,
      -591.66,
      28.66,
      false,
      false,
      false,
    );
    NetworkResurrectLocalPlayer(360.67, -591.66, 28.66, 251.43, true, false);
    SetPlayerInvincible(PlayerPedId(), false);
    ClearPedBloodDamage(PlayerPedId());
  }
});
