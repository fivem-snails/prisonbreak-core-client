onNet('core-front:showRegisterform', (display: boolean): void => {
  console.info('Net event triggered <core-front:showRegisterform>');

  SetNuiFocus(display, display);
  SendNuiMessage(JSON.stringify({ registerForm: display }));
});

onNet('core-front:showDeathscreen', (display: boolean): void => {
  console.info('Net event triggered <core-front:showDeathscreen>');

  SetNuiFocus(false, false);
  SendNuiMessage(JSON.stringify({ deathScreen: display }));
});

onNet('core-front:showPlayerhud', (data: object): void => {
  console.info('Net event triggered <core-front:showPlayerhud>');

  SetNuiFocus(false, false);
  SendNuiMessage(
    JSON.stringify({
      data: data,
      playerHud: true,
    }),
  );
});

// onNet(
//   'core-front:notifyPlayer',
//   (display: boolean, type: string, context: string): void => {
//     console.info('Net event triggered <core-front:notifyPlayer>');

//     SetNuiFocus(false, false);
//     SendNuiMessage(
//       JSON.stringify({
//         type: type,
//         context: context,
//         notification: display,
//       }),
//     );
//   },
// );

// onNet('core-front:showMoneyhud', (cash: number, bank: number): void => {
//   console.info('Net event triggered <core-front:showMoneyhud>');

//   SendNuiMessage(
//     JSON.stringify({
//       moneyhud: true,
//       cash: new Intl.NumberFormat('en-NL', {
//         currency: 'EUR',
//         style: 'currency',
//       }).format(cash),
//       bank: new Intl.NumberFormat('en-NL', {
//         currency: 'EUR',
//         style: 'currency',
//       }).format(bank),
//     }),
//   );
// });
