const GetVehicle = (vehicle: IVehicle) => {
  try {
    console.info("Vehicle:", {
      vehicle,
    });
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error);
  }
};

onNet("Core/Client/Shared:GetVehicle", GetVehicle);
