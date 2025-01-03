const GetVehicle = (
  serverVehiclePrice: number,
  serverVehicleScreenX: number,
  serverVehicleScreenY: number,
  rectHeight: number,
) => {
  try {
    const serverVehiclePriceUSD: string = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(serverVehiclePrice);

    // Draw vehicle price text
    BeginTextCommandDisplayText("STRING");
    SetTextScale(0.0, 1.0);
    SetTextFont(4);
    SetTextProportional(true);
    SetTextCentre(true);
    SetTextColour(124, 252, 0, 250);
    SetTextDropshadow(0, 0, 0, 0, 250);
    SetTextOutline();
    SetTextEntry("STRING");
    AddTextComponentString(serverVehiclePriceUSD);
    EndTextCommandDisplayText(serverVehicleScreenX, serverVehicleScreenY + -0.1);
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error);
  }
};

onNet("Core/Client/Shared:GetVehicle", GetVehicle);
