let viewPhone: boolean = false;

RegisterCommand(
  'phone',
  () => {
    viewPhone = !viewPhone;

    if (viewPhone) {
      emit('Huds/phone', true, [
        {
          job: 'Cadet',
        },
      ]);
    } else {
      emit('Huds/phone', false, [
        {
          job: 'N/A',
        },
      ]);
    }
  },
  false,
);
