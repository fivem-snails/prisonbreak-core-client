const GetVehicle = (vehicle: IVehicle) => {
  try {
    const serverVehiclePrice: string = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(vehicle.price);

    AddTextComponentString(serverVehiclePrice);
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error);
  }
};

onNet("Core/Client/Shared:GetVehicle", GetVehicle);
