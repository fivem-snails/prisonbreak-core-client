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

    const serverVehiclePrice: string = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(vehicle.price);

    AddTextComponentString(serverVehiclePrice);
    EndTextCommandDisplayText(serverVehicleScreenX, serverVehicleScreenY + rectHeight / 2);
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error);
  }
};

onNet("Core/Client/Shared:GetVehicle", GetVehicle);
