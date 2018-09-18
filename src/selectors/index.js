//export { getFilteredAirportVehicles } from './getFilteredAirportVehicles';
//export { getAirportVehicleWithId } from './getAirportVehicleWithId';


export const getFilteredAirportVehicles = (airportVehicles, filters) => {

  const unique = function(x) {
      var a = x.concat();
      for(var i=0; i<a.length; ++i) {
          for(var j=i+1; j<a.length; ++j) {
              if(a[i] === a[j])
                  a.splice(j--, 1);
          }
      }

      return a;
  };


  if (filters.length === 0) return airportVehicles;
  let result = [];

  filters.forEach(filter => {
    result = result.concat(airportVehicles.filter(v => {
      return String(v[filter.field]) === String(filter.value);
    }));
  });

  return unique(result);

};


export const getAirportVehicleWithId = (airportVehicles, id) => {
  return airportVehicles.find(vehicle => {
    return vehicle.id === id;
  });
};
