on('playerSpawned', () => {
  SetPedMaxHealth(PlayerPedId(), 600);
});

setTick(async () => {
  await timeout(10000);

  const coords = GetEntityCoords(PlayerPedId(), false);
  emitNet('core-back:savePlayer', source, coords);
});
