onNet('alta-core-front:showRegisterForm', (display) => {
  console.info('Net event called <core-front:showRegisterForm>');

  SetNuiFocus(display, display);
  SendNuiMessage(
    JSON.stringify({
      type: 'REGISTERFORM',
      visible: display,
      data: [],
    }),
  );
});

onNet('alta-core-front:showPlayerHud', (display, user) => {
  console.info('Net event called <core-front:showPlayerHud>');

  SendNuiMessage(
    JSON.stringify({
      type: 'PLAYERHUD',
      visible: display,
      data: user,
    }),
  );
});
