// const serverVehiclePrice: number = 0;

const GetVehicle = (
  vehicle: IVehicle,
  serverVehicleScreenX: number,
  serverVehicleScreenY: number,
  rectHeight: number,
) => {
  try {
    console.info("Vehicle:", {
      vehicle,
    });

    const serverVehiclePriceUSD: string = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(vehicle.price);

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
