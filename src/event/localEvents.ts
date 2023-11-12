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

/**
 * Saves the player's inventory when they disconnect
 */
on('Core/setupInventory', async () => {
  const allowedInventoryWeapons = [
    {
      id: 'WEAPON_PISTOL',
      label: 'Pistol',
      weight: 10,
      img: 'https://i.imgur.com/1aXZvJ3.png',
    },
    {
      id: 'WEAPON_COMBATPISTOL',
      label: 'Combat Pistol',
      weight: 10,
      img: 'https://i.imgur.com/1aXZvJ3.png',
    },
  ];

  const inventory = [];

  /**
   * Sets allowed weapons in the inventory array
   */
  for (const allowedWeapon of allowedInventoryWeapons) {
    const weapon = HasPedGotWeapon(
      PlayerPedId(),
      GetHashKey(allowedWeapon.id),
      false,
    );

    if (!weapon) {
      continue;
    }

    const ammo = GetAmmoInPedWeapon(
      PlayerPedId(),
      GetHashKey(allowedWeapon.id),
    );

    inventory.push({
      type: 'WEAPON',
      id: allowedWeapon.id,
      label: allowedWeapon.label,
      amount: ammo,
      weight: allowedWeapon.weight,
      img: allowedWeapon.img,
    });
  }

  const localId: number = GetPlayerIndex();
  const src: number = GetPlayerServerId(localId);

  emitNet('Core/saveCharacterInventory', src, inventory);
});

/**
 * Set the player's inventory
 */
onNet('Core/setCharacterInventory', async (inventory: TInvetory) => {
  inventory.map((item: TInventoryItem) => {
    if (item.type === 'WEAPON') {
      GiveWeaponToPed(
        PlayerPedId(),
        GetHashKey(item.id),
        item.amount,
        false,
        true,
      );
    }
  });
});
