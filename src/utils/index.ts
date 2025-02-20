const handleError = (error: unknown): void => {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error("Unknown:", error);
  }
};
