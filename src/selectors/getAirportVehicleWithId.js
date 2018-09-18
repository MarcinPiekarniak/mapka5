export const getAirportVehicleWithId = (airportVehicles, id) => {
  return airportVehicles.find(vehicle => {
    return vehicle.id === id;
  });
};
