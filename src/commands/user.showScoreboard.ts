let viewScoreboard: boolean = false;

RegisterCommand(
  'scoreboard',
  () => {
    viewScoreboard = !viewScoreboard;

    if (viewScoreboard) {
      const server = GetActivePlayers();
      const players = server.map((playerId: number) => {
        const id = GetPlayerServerId(playerId);
        const name = GetPlayerName(playerId);
        const job = 'Unemployed';

        return { id, name, job };
      });

      emit('Huds/scoreboard', true, players);
    } else {
      emit('Huds/scoreboard', false, [
        {
          id: -1,
          name: 'N/A',
          job: 'N/A',
        },
      ]);
    }
  },
  false,
);
