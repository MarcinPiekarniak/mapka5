export const getFilteredAirportVehicles = (airportVehicles, text) => {
  const airportVehiclesSearch = text.toLowerCase();

  let f = airportVehicles.filter(vehicle => {
    const {id, name, type} = vehicle;
    return (
      String(id).toLowerCase().includes(airportVehiclesSearch) ||
      name.toLowerCase().includes(airportVehiclesSearch) ||
      type.toLowerCase().includes(airportVehiclesSearch)
    );
  });
  return f;
};
