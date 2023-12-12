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
 * Saves the player's loadout
 */
// on('Core/User:SaveLoadout', async () => {
//   const allowedLoadout = [
//     {
//       id: 'WEAPON_PISTOL',
//       label: 'Pistol',
//       weight: 10,
//       img: 'https://i.imgur.com/n4SV2Sv.png',
//     },
//     {
//       id: 'WEAPON_COMBATPISTOL',
//       label: 'Combat Pistol',
//       weight: 10,
//       img: 'https://i.imgur.com/BTAE4QQ.png',
//     },
//     {
//       id: 'WEAPON_COMBATSHOTGUN',
//       label: 'Combat Shotgun',
//       weight: 10,
//       img: 'https://i.imgur.com/2k4X8Qa.png',
//     },
//     {
//       id: 'WEAPON_MILITARYRIFLE',
//       label: 'Military Rifle',
//       weight: 10,
//       img: 'https://i.imgur.com/2k4X8Qa.png',
//     },
//   ];

//   const loadout = [];

//   /**
//    * Sets allowed weapons in the loadout array
//    */
//   for (const allowedWeapon of allowedLoadout) {
//     const hasWeapon = HasPedGotWeapon(
//       PlayerPedId(),
//       GetHashKey(allowedWeapon.id),
//       false,
//     );

//     if (!hasWeapon) {
//       continue;
//     }

//     const ammo = GetAmmoInPedWeapon(
//       PlayerPedId(),
//       GetHashKey(allowedWeapon.id),
//     );

//     loadout.push({
//       type: 'WEAPON',
//       id: allowedWeapon.id,
//       label: allowedWeapon.label,
//       amount: ammo,
//       weight: allowedWeapon.weight,
//       img: allowedWeapon.img,
//     });
//   }

//   const localId = GetPlayerIndex();
//   const src = GetPlayerServerId(localId);

//   emitNet('Core/User:SyncLoadout', src, loadout);
// });

/**
 * Set the player's loadout
 */
// onNet('Core/User:SetLoadout', async (loadout: TLoadout) => {
//   loadout.map((item: TLoadoutWeapon) => {
//     if (item.type === 'WEAPON') {
//       GiveWeaponToPed(
//         PlayerPedId(),
//         GetHashKey(item.id),
//         item.amount,
//         false,
//         true,
//       );
//     }
//   });
// });

// onNet('Core/User:SyncLoadout:Loop', () => {
//   setTick(async () => {
//     await delay(800);

//     emit('Core/User:SaveLoadout');
//   });
// });
