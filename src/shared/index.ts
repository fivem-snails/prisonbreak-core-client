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
    SetTextScale(0.0, 0.4);
    SetTextFont(0);
    SetTextProportional(true);
    SetTextCentre(true);
    SetTextColour(0, 255, 0, 255);
    SetTextDropshadow(0, 0, 0, 0, 250);
    SetTextEdge(1, 0, 0, 0, 255);
    SetTextDropShadow();
    SetTextOutline();
    SetTextEntry("STRING");
    AddTextComponentString(serverVehiclePriceUSD);
    EndTextCommandDisplayText(serverVehicleScreenX, serverVehicleScreenY + rectHeight / 2);
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error);
  }
};

onNet("Core/Client/Shared:GetVehicle", GetVehicle);
