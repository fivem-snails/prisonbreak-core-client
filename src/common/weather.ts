setTick(() => {
  NetworkOverrideClockTime(14, 20, 0);
  // SetWeatherTypePersist("CLEAR");
  // SetWeatherTypeNowPersist("CLEAR");
  // SetWeatherTypeNow("CLEAR");
  SetTimecycleModifier("graveyard_shootout");
  SetTimecycleModifierStrength(1.0);
  SetWeatherTypePersist("RAIN");
  SetWeatherTypeNowPersist("RAIN");
  SetWeatherTypeNow("RAIN");
  SetRainLevel(1.0);
  Wait(8000);
});
