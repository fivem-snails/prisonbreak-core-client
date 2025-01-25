RegisterCommand(
  "scoreboard",
  (): void => {
    try {
      emit("prisonbreak-nui-scoreboard", true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  },
  false,
);
