RegisterCommand(
  'exit',
  () => {
    const localId = GetPlayerIndex();
    const src = GetPlayerServerId(localId);
    const entityId = PlayerPedId();
    const name = GetPlayerName(localId);
    const coords = GetEntityCoords(entityId, false);

    emitNet('Core/User:Sync', src, {
      name,
      localId,
      entityId,
      coords: {
        X: coords[0],
        Y: coords[1],
        Z: coords[2],
      },
    });
  },

  false,
);
