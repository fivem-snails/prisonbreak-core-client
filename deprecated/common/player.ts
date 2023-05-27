on('playerSpawned', () => {
    SetPedMaxHealth(PlayerPedId(), 600);
});

// setTick(async () => {
//   await pauseExecution(5000);

//   const localId = GetPlayerIndex();
//   const entityId = PlayerPedId();
//   const serverId = GetPlayerServerId(localId);
//   const coords = GetEntityCoords(entityId, false);

//   emitNet('core-back:savePlayer', serverId, localId, coords);
// });

// RegisterCommand(
//     'save',
//     () => {
//         const localId = GetPlayerIndex();
//         const entityId = PlayerPedId();
//         const serverId = GetPlayerServerId(localId);
//         const coords = GetEntityCoords(entityId, false);

//         emitNet('core-back:savePlayer', serverId, localId, coords);
//     },
//     false,
// );
