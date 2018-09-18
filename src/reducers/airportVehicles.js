import initialState from './initialState.js';

export const airportVehicles = (state = initialState.airportVehicles, action) => {
  switch (action.type) {
    case 'LOAD_AIRPORT_VEHICLES_SUCCESS':
      return {
        ...state,
        airportVehicles: action.airportVehicles,
      }

    case 'UPDATE_AIRPORT_VEHICLES':
      return {
        ...state,
        airportVehicles: action.airportVehicles,
      }

    case 'FILTER_AIRPORT_VEHICLES_ADD':
      state.filters.push(action.filter);
      return state;

    case 'FILTER_AIRPORT_VEHICLES_REMOVE':
      state.filters.splice(action.index, 1);
      return state;

    case 'FILTER_AIRPORT_VEHICLES_CLEAR':
      return {
        ...state,
        filters: [],
      }

    case 'UPDATE_TOOLTIP_ID':
      return {
        ...state,
        tooltipId: action.tooltipId,
      }

    default:
      return state
  }
}
