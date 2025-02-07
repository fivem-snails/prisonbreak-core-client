RegisterCommand(
  "animation",
  async (source: number, args: string[], rawCommand: string): Promise<void> => {
    try {
      const playerIndex: number = GetPlayerIndex();

      console.info("animation", {
        source,
        playerIndex,
        arg: args[0],
        rawCommand,
      });

      ClearPedTasksImmediately(GetPlayerPed(playerIndex));

      RequestAnimDict("mp_arresting");
      if (!HasAnimDictLoaded("mp_arresting")) {
        await Waiit(1000);
      }

      TaskPlayAnim(GetPlayerPed(playerIndex), "mp_arresting", args[0], 1.0, 1.0, 4000, 49, 1.0, true, true, true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  },
  false,
);
