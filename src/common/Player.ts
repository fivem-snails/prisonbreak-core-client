setTick(async () => {
  await setDelay(10000);
  SetPedMaxHealth(PlayerPedId(), 300);
});
