const initialState = {
  viewports: {
    defaultViewport: {
      latitude: 54.3792,
      longitude: 18.468,
      zoom: 16,
      bearing: 23.25,
      pitch: 0,  //20, 24
    },
    currentViewport: {
      latitude: 54.3792,
      longitude: 18.468,
      zoom: 16,
      bearing: 23.25,
      pitch: 0,
    }
  },
  airportVehicles: {
    airportVehicles: [],
    filters: [],
    tooltipId: null,
  },
  events: {
    alerts: [],
    warnings: [],
    notifications: [],
  }
};

export default initialState;
