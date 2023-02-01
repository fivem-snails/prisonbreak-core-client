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

// onNet('refreshHud', (cash: number) => {
//   const formatcash = new Intl.NumberFormat('fi-FI', {
//     currency: 'EUR',
//     style: 'currency',
//   }).format(cash);

//   SendNuiMessage(
//     JSON.stringify({
//       showHud: true,
//       cash: formatcash,
//     }),
//   );
// });
