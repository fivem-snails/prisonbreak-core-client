onNet(
  'Core/Fe/Heist:Start',
  async (
    vehicle: number,
    heist_id: number,
    license: string,
    teamSchema: THeistTeam,
  ) => {
    emit('Screens/heist-hud', true, {
      heist_id: heist_id,
      license: license,
    });

    switch (teamSchema.name.toUpperCase()) {
      case 'ROBBERS':
        emit(
          'cS.banner',
          '~r~STARTED~s~',
          'Find and ~r~hack~s~ the vault',
          6,
          true,
        );

        const blip = AddBlipForCoord(253.3, 228.18, 101.68);
        SetBlipSprite(blip, 521);
        SetBlipColour(blip, 5);
        SetBlipScale(blip, 0.4);
        SetBlipAsShortRange(blip, true);

        let isInteractionVisible = false;

        setTick(() => {
          const coords = GetEntityCoords(PlayerPedId(), false);
          const distanceVault = GetDistanceBetweenCoords(
            253.3,
            228.38,
            101.68,
            coords[0],
            coords[1],
            coords[2],
            true,
          );

          const distanceEntrance = GetDistanceBetweenCoords(
            228.74,
            213.5,
            105.74,
            coords[0],
            coords[1],
            coords[2],
            true,
          );

          if (distanceEntrance < 30.0) {
            DrawMarker(
              29,
              230.36,
              214.48,
              105.7,
              0.0,
              0.0,
              0.0,
              0.0,
              0.0,
              0.0,
              1.0,
              0.6,
              1.0,
              247,
              21,
              0,
              0.6,
              false,
              false,
              2,
              true,
              // @ts-ignore
              null,
              null,
              false,
            );
          }

          if (distanceVault > 1.0 && isInteractionVisible) {
            emit('Dependencies/hideKeyInteraction');
            isInteractionVisible = false;
          }

          if (distanceVault < 1.0) {
            if (!isInteractionVisible) {
              emit('Dependencies/showKeyInteraction', 'E', 'Inject Hack');
              isInteractionVisible = true;
            }

            if (IsControlJustReleased(0, 38)) {
              console.log('Injects hack');

              // TODO Add animation so the player crouches down and injects the hack
            }
          }
        });

        break;

      case 'COPPERS':
        emit(
          'cS.banner',
          '~b~STARTED~s~',
          'Find and ~b~catch~s~ the robbers',
          6,
          true,
        );

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
