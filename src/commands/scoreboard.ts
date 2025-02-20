let IsScoreboardOpen = false;

RegisterCommand(
  "scoreboard",
  (): void => {
    try {
      IsScoreboardOpen = !IsScoreboardOpen;
      emit("NUI_SCOREBOARD", IsScoreboardOpen);
    } catch (error) {
      handleError(error);
    }
  },
  false,
);
