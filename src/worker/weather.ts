setTick((): void => {
  NetworkOverrideClockTime(14, 20, 0);
  SetWeatherTypePersist("CLEAR");
  SetWeatherTypeNowPersist("CLEAR");
  SetWeatherTypeNow("CLEAR");
  SetTimecycleModifier("helicamfirst");
  SetTimecycleModifierStrength(0.9);
  SetWeatherTypePersist("RAIN");
  SetWeatherTypeNowPersist("RAIN");
  SetWeatherTypeNow("RAIN");
  SetRainLevel(1.0);
  Wait(8000);
});
