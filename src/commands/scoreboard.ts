let IsScoreboardOpen = false;

RegisterCommand(
  "scoreboard",
  (): void => {
    try {
      IsScoreboardOpen = !IsScoreboardOpen;
      emit("prisonbreak-nui-scoreboard", IsScoreboardOpen);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  },
  false,
);
