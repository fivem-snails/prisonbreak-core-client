onNet(
  "_Core/Client/Heist:Start",
  async (_vehicle: number, heist_id: number, license: string, teamSchema: THeistTeam) => {
    FreezeEntityPosition(PlayerPedId(), false);
    SetEntityVisible(PlayerPedId(), true, false);

    switch (teamSchema.name.toUpperCase()) {
      case "ROBBERS": {
        const spawn: number[] = GetEntityCoords(PlayerPedId(), false);

        SetEntityVisible(PlayerPedId(), false, false);
        SetEntityCoords(PlayerPedId(), 247.26, 218.57, 108.49, false, false, false, false);

        type TCamera = {
          pos: number[];
          rot: number[];
          fov: number;
        };

        const cctvCameras: TCamera[] = [
          {
            pos: [239.35, 218.08, 110],
            rot: [0, 0, 280],
            fov: 50,
          },
          {
            pos: [257.86, 227.33, 108.3],
            rot: [0, 0, 200],
            fov: 50,
          },
          {
            pos: [261.27, 226.72, 104.4],
            rot: [0, 0, 108.28],
            fov: 50,
          },
          {
            pos: [249.72, 218.86, 104.15],
            rot: [0, 0, 251.31],
            fov: 50,
          },
        ];

        let cameraInterval: any;
        cctvCameras.forEach((camera, index) => {
          ((i) => {
            if (i !== 0) {
              const prevCam = CreateCamWithParams(
                "DEFAULT_SCRIPTED_CAMERA",
                cctvCameras[i - 1].pos[0],
                cctvCameras[i - 1].pos[1],
                cctvCameras[i - 1].pos[2],
                cctvCameras[i - 1].rot[0],
                cctvCameras[i - 1].rot[1],
                cctvCameras[i - 1].rot[2],
                cctvCameras[i - 1].fov,
                true,
                2,
              );
              SetCamActive(prevCam, false);
            }

            setTimeout(() => {
              const cam = CreateCamWithParams(
                "DEFAULT_SCRIPTED_CAMERA",
                camera.pos[0],
                camera.pos[1],
                camera.pos[2],
                camera.rot[0],
                camera.rot[1],
                camera.rot[2],
                camera.fov,
                true,
                2,
              );

              SetCamActive(cam, true);
              SetCamFov(cam, camera.fov);

              RenderScriptCams(true, false, 0, true, false);
              FreezeEntityPosition(PlayerPedId(), true);

              if (cameraInterval) {
                clearInterval(cameraInterval);
              }

              cameraInterval = setInterval(() => {
                SetTimecycleModifier("CAMERA_secuirity");
                SetTimecycleModifierStrength(1.25);
              }, 1);

              console.log("🚀 Camera:", i);

              // TODO: For camera switch, add sound to switch the camera

              if (i === cctvCameras.length - 1) {
                clearInterval(cameraInterval);

                setTimeout(async () => {
                  SetCamActive(cam, false);
                  RenderScriptCams(false, false, 0, true, false);
                  DestroyCam(cam, false);

                  SetTimecycleModifier("CAMERA_secuirity");
                  SetTimecycleModifierStrength(0.0);

                  SetEntityCoords(PlayerPedId(), spawn[0], spawn[1], spawn[2], false, false, false, false);

                  SetEntityVisible(PlayerPedId(), true, false);
                  FreezeEntityPosition(PlayerPedId(), false);
                  DoScreenFadeIn(1000);

                  await delay(2000);

                  // Give player firearm
                  // biome-ignore lint/complexity/noForEach: <explanation>
                  teamSchema.loadout.forEach((item) => {
                    GiveWeaponToPed(PlayerPedId(), item.name, item.ammo, false, true);
                  });

                  emit("Screens/heist-vault", true, {
                    license: license,
                    heist_id: heist_id,
                  });
                }, 2000);
              }
            }, 800 * i);
          })(index);
        });

        // emit('Screens/subtitles', true, {
        //   message:
        //     'You team missio is to get inside the bank and steal the money, bring it to me before timer runs out - if you are too slow you die !',
        //   audio: 'WELCOME_HEIST',
        // });

        let isInteractionVisible = false;

        setTick(async () => {
          const coords = GetEntityCoords(PlayerPedId(), false);
          const distanceVault = GetDistanceBetweenCoords(253.3, 228.38, 101.68, coords[0], coords[1], coords[2], true);

          if (distanceVault > 1.0 && isInteractionVisible) {
            emit("Dependencies/hideKeyInteraction");
            isInteractionVisible = false;
          }

          if (distanceVault < 1.0) {
            if (!isInteractionVisible) {
              emit("Dependencies/showKeyInteraction", "E", "Inject Hack");
              isInteractionVisible = true;
            }

            if (IsControlJustReleased(0, 38)) {
              console.log("Injects hack");

              // TODO Add animation so the player crouches down and injects the hack
              // Open Golden Boxes UI

              emit("Dependencies/hideKeyInteraction");

              // Kill the tick
              setTick(() => {});
            }
          }
        });

        break;
      }

      case "COPPERS":
        emit("cS.banner", "~b~STARTED~s~", "Find and ~b~catch~s~ the robbers", 6, true);

        await delay(10000);

        emit("Screens/heist-hud", true, {
          heist_id: heist_id,
          license: license,
        });

        // DisplayRadar(true);
        SetNewWaypoint(259.77, 214.82);

        setTick(() => {
          DrawMarker(
            36,
            649.2,
            -10.6,
            82.78,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.5,
            1.5,
            1.5,
            0,
            144,
            247,
            0.8,
            false,
            false,
            2,
            true,
            // @ts-ignore
            null,
            null,
            false,
          );
        });
        break;
    }
  },
);
