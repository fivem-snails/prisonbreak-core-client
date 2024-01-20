/**
 * Execute a callback when player spawns
 * @param {number} floatX
 * @param {number} floatY
 * @param {number} floatZ
 * @param {number} floatHeading
 * @param {number} index
 * @param {number} model
 * @param {boolean} skipFade
 * @returns {void}
 */
on('playerSpawned', () => {
  const randomHair: number = Math.floor(Math.random() * 10);

  SetPedComponentVariation(PlayerPedId(), 0, 16, 0, 2); // Face
  SetPedComponentVariation(PlayerPedId(), 1, 0, 0, 2); // Mask
  SetPedComponentVariation(PlayerPedId(), 2, randomHair, 4, 2); // Hair
  SetPedComponentVariation(PlayerPedId(), 3, 0, 0, 2); // Hands / Upperbody
  SetPedComponentVariation(PlayerPedId(), 4, 10, 0, 0); // Pants
  SetPedComponentVariation(PlayerPedId(), 5, 0, 0, 0); // Bag / Parachute
  SetPedComponentVariation(PlayerPedId(), 6, 34, 0, 0); // Shoe
  SetPedComponentVariation(PlayerPedId(), 8, 1, 0, 0); // T-Shirt
  SetPedComponentVariation(PlayerPedId(), 9, 0, 0, 0); // Armor
  SetPedComponentVariation(PlayerPedId(), 11, 16, 2, 0); // Jacket

  SetEntityInvincible(PlayerPedId(), false);
  SetEntityCanBeDamaged(PlayerPedId(), true);
  SetPedMaxHealth(PlayerPedId(), 600);

  emit('cS.SplashText', '~b~Welcome to AltaRP~s~.', 10, true);
});

/**
 * Execute a callback when player dies
 * @param {number} killedBy
 * @param {object} position
 * @returns {void}
 */
on('baseevents:onPlayerDied', (_killedBy: number, _position: []) => {
  console.log('Player died onPlayerDied');
  emit('Screens/death', true, 100);
});

/**
 * @param {number} killerId
 * @param {string} weaponHash
 * @param {boolean} killerInVeh
 * @param {number} killerVehSeat
 * @param {string} killerVehName
 * @param {object} deathCoords
 */
on(
  'baseevents:onPlayerKilled',
  (
    _killerId: number,
    _weaponHash: string,
    _killerInVeh: boolean,
    _killerVehSeat: number,
    _killerVehName: string,
    _deathCoords: [],
  ) => {
    console.log('Player died onPlayerKilled');
    emit('Screens/death', true, 100);
  },
);

onNet('Core/Heist:Teamize', (team: string) => {
  const groupExists = DoesRelationshipGroupExist(team.toUpperCase());
  if (!groupExists) {
    throw new Error(`Relationship group ${team.toUpperCase()} does not exist`);
  }

  SetPedRelationshipGroupHash(PlayerPedId(), team.toUpperCase());
});

onNet(
  'Core/Heist:CreateArea',
  (
    coords: {
      x: number;
      y: number;
      z: number;
      r: number;
    },
    sprite: number,
    color: number,
    player: {
      name: string;
      license: string;
      team: string;
      avatar: string;
    },
    spawn: {
      x: number;
      y: number;
      z: number;
    },
  ) => {
    const blip = AddBlipForRadius(coords.x, coords.y, coords.z, coords.r);
    SetBlipSprite(blip, sprite);
    SetBlipColour(blip, color);
    SetBlipAlpha(blip, 90);

    let CREATEAREA_TIMER = 1000;

    const localId = GetPlayerIndex();
    const src = GetPlayerServerId(localId);

    setTick(async () => {
      await delay(CREATEAREA_TIMER);

      const playerCoords = GetEntityCoords(PlayerPedId(), false);
      const distance = GetDistanceBetweenCoords(
        coords.x,
        coords.y,
        coords.z,
        playerCoords[0],
        playerCoords[1],
        playerCoords[2],
        true,
      );

      if (distance > coords.r) {
        emitNet('Core/Heist:ReturnArea', src);

        SetTimecycleModifier('BloomMid');
        SetTimecycleModifierStrength(3.0);

        emit('Screens/return-to-area', true, {
          heist_id: 9,
          license: 'license:0673c17a25323f11be214fc75bdcae036ab5705f',
          spawn,
        });

        return;
      }

      if (distance < coords.r) {
        // emit('Huds/character', true, [
        //   {
        //     name: player.name,
        //     license: player.license,
        //     team: player.team,
        //     avatar: player.avatar,
        //   },
        // ]);

        SetTimecycleModifier('Bloom');
        SetTimecycleModifierStrength(0.0);

        emit('Screens/return-to-area', false, {
          heist_id: null,
          license: null,
        });
      }
    });
  },
);

function alert(message: string, beep: boolean, duration: number) {
  AddTextEntry('CH_ALERT', message);

  BeginTextCommandDisplayHelp('CH_ALERT');
  EndTextCommandDisplayHelp(0, false, beep, duration);
}

onNet('Core/Heist:Start', async (vehicle: number, team: []) => {
  emit('cS.banner', '~r~STARTED~s~', 'Find and ~r~hack~s~ the vault', 6, true);
  emit('Screens/heist-hud', true, { team });

  const blip = AddBlipForCoord(253.3, 228.18, 101.68);
  SetBlipSprite(blip, 161);
  SetBlipColour(blip, 5);
  SetBlipScale(blip, 0.3);

  let interactionShown = false;
  setTick(() => {
    const coords = GetEntityCoords(PlayerPedId(), false);
    const distance = GetDistanceBetweenCoords(
      253.3,
      228.18,
      101.68,
      coords[0],
      coords[1],
      coords[2],
      true,
    );

    if (distance > 1.0 && interactionShown) {
      emit('Dependencies/hideKeyInteraction');
      interactionShown = false;
    }

    if (distance < 1.0) {
      if (!interactionShown) {
        emit('Dependencies/showKeyInteraction', 'E', 'Inject Hack');
        interactionShown = true;
      }

      if (IsControlJustReleased(0, 38)) {
        console.log('Injects hack');

        // TODO Add animation so the player crouches down and injects the hack
      }
    }

    DrawMarker(
      29,
      253.3,
      228.18,
      101.68,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      1.5,
      1.5,
      1.5,
      168,
      58,
      50,
      0.8,
      true,
      false,
      2,
      false,
      null,
      null,
      false,
    );
  });
});
