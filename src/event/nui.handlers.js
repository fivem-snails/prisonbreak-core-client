RegisterRawNuiCallback('submitRegisterForm', async (data) => {
  SetNuiFocus(false, false);
  SendNuiMessage(
    JSON.stringify({
      type: 'REGISTERFORM',
      visible: false,
    }),
  );

  const { firstName, lastName, birthDate, story } = JSON.parse(data.body);

  emitNet('alta-core-back:playerRegister', {
    firstName,
    lastName,
    birthDate,
    story,
  });
});
