RegisterCommand(
  "animation",
  (playerSrc: number, args: string[], rawCommand: string): void => {
    try {
      console.info("animation", {
        playerSrc,
        args,
        rawCommand,
      });

      TaskPlayAnim(GetPlayerPed(playerSrc), "mp_arresting", args[0], 1.0, 1.0, 8000, 1, 1.0, true, true, true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  },
  false,
);
