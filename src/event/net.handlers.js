onNet('CORE_FRONT_DISPLAY_REGISTER_FORM', (display) => {
  console.info('Net event triggered <CORE_FRONT_DISPLAY_REGISTER_FORM>');

  SetNuiFocus(display, display);
  SendNuiMessage(JSON.stringify({ DISPLAY_REGISTER_FORM: display }));
});

onNet('CORE_FRONT_DISPLAY_PLAYER_HUD', (display, player, character) => {
  console.info('Net event triggered <CORE_FRONT_DISPLAY_PLAYER_HUD>');

  console.log(display);
  console.log(player);
  console.log(character);

  SetNuiFocus(display, display);
  SendNuiMessage(JSON.stringify({ DISPLAY_PLAYER_HUD: display }));
});
