RegisterRawNuiCallback('closeRegisterForm', async (data: { body: string }) => {
    emit('core-front:showRegisterform', false);

    const jsonData: Form = JSON.parse(data.body);
    const { firstname, lastname, birthdate } = jsonData;

    emitNet('core-back:submitRegister', source, firstname, lastname, birthdate);
    emitNet('core-back:refreshPlayer', source);
});

RegisterRawNuiCallback('closeDeathScreen', async () => {
    emitNet('core-front:showDeathscreen', false);

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
        NetworkResurrectLocalPlayer(
            360.67,
            -591.66,
            28.66,
            251.43,
            true,
            false,
        );
        SetPlayerInvincible(PlayerPedId(), false);
        ClearPedBloodDamage(PlayerPedId());
    }
});
