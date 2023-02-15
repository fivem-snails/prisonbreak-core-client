onNet('showRegisterform', () => {
  SetNuiFocus(true, true);
  SendNuiMessage(
    JSON.stringify({
      registerform: true,
    }),
  );
});

onNet('showDeathscreen', () => {
  SetEntityHealth(PlayerPedId(), 0);
  SetNuiFocus(false, false);
  SendNuiMessage(
    JSON.stringify({
      deathscreen: true,
    }),
  );
});

onNet('refreshHud', (cash: number) => {
  const formatcash = new Intl.NumberFormat('en-NL', {
    currency: 'EUR',
    style: 'currency',
  }).format(cash);

  SendNuiMessage(
    JSON.stringify({
      moneyhud: true,
      cash: formatcash,
    }),
  );
});
