let isFeedbackOpen = false;

RegisterCommand(
  "feedback",
  (): void => {
    try {
      isFeedbackOpen = !isFeedbackOpen;
      emit("NUI_FEEDBACK", isFeedbackOpen);
    } catch (error) {
      handleError(error);
    }
  },
  false,
);
