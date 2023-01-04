setTick(async () => {
  await Delay(10000);
  
  SetPedMaxHealth(PlayerPedId(), 300);
});
