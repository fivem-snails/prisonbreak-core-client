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

onNet('Core/Heist:SetupTeam', (name: string) => {
  const groupExists = DoesRelationshipGroupExist(name.toUpperCase());
  if (!groupExists) {
    throw new Error(`Relationship group ${name.toUpperCase()} does not exist`);
  }

  SetPedRelationshipGroupHash(PlayerPedId(), name.toUpperCase());
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
    spawn: {
      x: number;
      y: number;
      z: number;
    },
    heist: any,
    license: string,
  ) => {
    const blip = AddBlipForRadius(coords.x, coords.y, coords.z, coords.r);
    SetBlipSprite(blip, sprite);
    SetBlipColour(blip, color);
    SetBlipAlpha(blip, 60);

    const localId = GetPlayerIndex();
    const src = GetPlayerServerId(localId);

    setTick(async () => {
      await delay(1000);

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
          heist_id: heist.id,
          license: license,
          spawn,
        });

        return;
      }

      if (distance < coords.r) {
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
