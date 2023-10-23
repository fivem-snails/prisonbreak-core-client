function delay(ms: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function spawn(): Promise<void> {
  try {
    await delay(1000);

    const localId: number = GetPlayerIndex();
    const src: number = GetPlayerServerId(localId);
    const entityId: number = PlayerPedId();
    const name: string = GetPlayerName(localId);
    const coords: number[] = GetEntityCoords(entityId, false);

    const userSchema: TUserSchema = {
      name,
      localId,
      entityId,
      coords: {
        X: coords[0],
        Y: coords[1],
        Z: coords[2],
      },
    };

    NetworkSetFriendlyFireOption(false);
    SetCanAttackFriendly(PlayerPedId(), true, true);
    SetFlashLightKeepOnWhileMoving(true);
    DisableIdleCamera(true);
    DisplayRadar(false);

    emitNet('Core/characterSync', src, userSchema);
  } catch (error) {
    console.error('^1Error (Func/ensureUserSpawned)^7', error);
  }
}

delay(1000);
spawn();

RegisterCommand(
  'camtest',
  () => {
    const cameraPos: number[] = [243.57, -1235.15, 30.0];
    const camera = CreateCameraWithParams(
      'DEFAULT_SCRIPTED_CAMERA',
      cameraPos[0],
      cameraPos[1],
      cameraPos[2],
      0,
      0,
      195,
      90,
      true,
      2,
    );

    SetCamActive(camera, true);
    SetCamMotionBlurStrength(camera, 0.5);
    SetCamFov(camera, 40);
    RenderScriptCams(true, true, 3000, true, false);

    SetTimecycleModifier('scanline_cam_cheap');
    SetTimecycleModifierStrength(1.5);
  },
  false,
);

RegisterCommand(
  'camped',
  () => {
    const cameraPos: number[] = GetPedBoneCoords(PlayerPedId(), 31086, 0, 0, 0);
    const camera: number = CreateCameraWithParams(
      'DEFAULT_SCRIPTED_CAMERA',
      cameraPos[0],
      cameraPos[1],
      cameraPos[2],
      0,
      0,
      195,
      90,
      true,
      2,
    );

    AttachCamToPedBone(camera, PlayerPedId(), 31086, -0.3, 1.2, -0.0, false);
    SetCamActive(camera, true);
    // SetCamMotionBlurStrength(camera, 0.5);
    // SetCamFov(camera, 40);
    RenderScriptCams(true, true, 3000, true, false);
    FreezeEntityPosition(PlayerPedId(), true);
    // SetTimecycleModifier('scanline_cam_cheap');
    // SetTimecycleModifierStrength(1.5);
    // console.log(IsCamActive(camera));
    // console.log(DoesCamExist(camera));
    // console.log(GetCamCoord(camera));
  },
  false,
);
