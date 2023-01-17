onNet('showRegisterform', () => {
  SetNuiFocus(true, true);
  SendNuiMessage(
    JSON.stringify({
      showRegisterform: true,
    }),
  );
});

onNet('showDeathscreen', () => {
  SetEntityHealth(PlayerPedId(), 0);
  SendNuiMessage(
    JSON.stringify({
      showDeathscreen: true,
    }),
  );
});

onNet('refreshHud', (cash: number) => {
  const formatcash = new Intl.NumberFormat('fi-FI', {
    currency: 'EUR',
    style: 'currency',
  }).format(cash);

  SendNuiMessage(
    JSON.stringify({
      showHud: true,
      cash: formatcash,
    }),
  );
});
