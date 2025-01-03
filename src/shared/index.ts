const GetVehicle = (vehicle: IVehicle, serverVehicleScreenX: number, serverVehicleScreenY: number) => {
  try {
    const serverVehiclePrice: string = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(vehicle.price);

    const rectWidth: number = 0.07;
    const rectHeight: number = 0.04;

    DrawRect(serverVehicleScreenX, serverVehicleScreenY + rectHeight / 2, rectWidth, rectHeight, 0, 0, 0, 150);

    // Draw vehicle model text
    BeginTextCommandDisplayText("STRING");
    SetTextScale(0.0, 0.16);
    SetTextFont(0);
    SetTextProportional(true);
    SetTextCentre(true);
    SetTextColour(255, 255, 255, 100);
    SetTextDropshadow(0, 0, 0, 0, 255);
    SetTextEdge(1, 0, 0, 0, 255);
    SetTextDropShadow();
    SetTextOutline();
    SetTextEntry("STRING");
    AddTextComponentString(`${vehicle.model}`);
    EndTextCommandDisplayText(serverVehicleScreenX, serverVehicleScreenY + rectHeight / 2 - 0.015);

    // Draw vehicle price text
    BeginTextCommandDisplayText("STRING");
    SetTextScale(0.0, 0.2);
    SetTextFont(0);
    SetTextProportional(true);
    SetTextCentre(true);
    SetTextColour(0, 255, 0, 255);
    SetTextDropshadow(0, 0, 0, 0, 250);
    SetTextEdge(1, 0, 0, 0, 255);
    SetTextDropShadow();
    SetTextOutline();
    SetTextEntry("STRING");
    AddTextComponentString(serverVehiclePrice);
    EndTextCommandDisplayText(serverVehicleScreenX, serverVehicleScreenY + rectHeight / 2);
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error);
  }
};

onNet("Core/Client/Shared:GetVehicle", GetVehicle);
