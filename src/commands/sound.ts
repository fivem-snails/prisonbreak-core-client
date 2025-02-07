RegisterCommand(
  "sound",
  async (source: number, args: string[], rawCommand: string): Promise<void> => {
    try {
      const playerIndex: number = GetPlayerIndex();

      console.info("sound", {
        source,
        playerIndex,
        arg: args[0],
        rawCommand,
      });

      PlaySoundFrontend(-1, args[0], args[1], false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  },
  false,
);
