interface RegisterData {
  firstname: string;
  lastname: string;
  birthdate: string;
}

RegisterRawNuiCallback('hideRegisterform', async (data: {body: string}) => {
  SetNuiFocus(false, false);
  SendNuiMessage(
    JSON.stringify({
      showRegisterform: false,
    }),
  );

  const jsonData: RegisterData = JSON.parse(data.body);
  const {firstname, lastname, birthdate} = jsonData;

  emitNet('submitRegisterform', firstname, lastname, birthdate);

  await timeout(2000);
  const source: number = GetPlayerServerId(PlayerId());

  emitNet('refresh', source);
});

RegisterRawNuiCallback('hideDeathscreen', async () => {
  SetNuiFocus(false, false);
  SendNuiMessage(
    JSON.stringify({
      showDeathscreen: false,
    }),
  );

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
});
