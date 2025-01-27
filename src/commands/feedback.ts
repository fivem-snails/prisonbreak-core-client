let isFeedbackOpen = false;

RegisterCommand(
  "feedback",
  (): void => {
    try {
      isFeedbackOpen = !isFeedbackOpen;
      emit("prisonbreak-nui-feedback", isFeedbackOpen);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  },
  false,
);
