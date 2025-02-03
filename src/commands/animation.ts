RegisterCommand(
  "animation",
  async (playerSrc: number, args: string[], rawCommand: string): Promise<void> => {
    try {
      console.info("animation", {
        playerSrc,
        arg: args[0],
        rawCommand,
      });

      ClearPedTasksImmediately(GetPlayerPed(playerSrc));

      RequestAnimDict("mp_arresting");
      if (!HasAnimDictLoaded("mp_arresting")) {
        await Waiit(1000);
      }

      TaskPlayAnim(GetPlayerPed(playerSrc), "mp_arresting", args[0], 1.0, 1.0, 6000, 49, 1.0, true, true, true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  },
  false,
);
