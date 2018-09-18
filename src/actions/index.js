export const airportVehiclesLoaded = (airportVehicles) => ({
  type: 'LOAD_AIRPORT_VEHICLES_SUCCESS',
  airportVehicles
});

export const airportVehiclesUpdate = (airportVehicles) => ({
  type: 'UPDATE_AIRPORT_VEHICLES',
  airportVehicles
});

export const airportVehiclesAddFilter = (filter) => ({
  type: 'FILTER_AIRPORT_VEHICLES_ADD',
  filter
});

export const airportVehiclesRemoveFilter = (index) => ({
  type: 'FILTER_AIRPORT_VEHICLES_REMOVE',
  index
});

export const airportVehiclesClearFilters = () => ({
  type: 'FILTER_AIRPORT_VEHICLES_CLEAR',
});

export const resetViewport = () => ({
  type: 'VIEWPORT_RESET',
});

export const updateViewport = (viewport) => ({
  type: 'VIEWPORT_UPDATE',
  viewport
});

export const zoomInViewport = () => ({
  type: 'VIEWPORT_ZOOM_IN',
});

export const zoomOutViewport = () => ({
  type: 'VIEWPORT_ZOOM_OUT',
});

export const zoomViewport = (coordinates) => ({
  type: 'VIEWPORT_ZOOM',
  coordinates
});

export const panViewport = (coordinates) => ({
  type: 'VIEWPORT_PAN',
  coordinates
});

export const updateTooltipId = (tooltipId) => ({
  type: 'UPDATE_TOOLTIP_ID',
  tooltipId
});

export const eventsAddAlert = (event) => ({
  type: 'ADD_EVENT_ALERT',
  event
})

export const eventsAddWarning = (event) => ({
  type: 'ADD_EVENT_WARNING',
  event
})

export const eventsAddNotification = (event) => ({
  type: 'ADD_EVENT_NOTIFICATION',
  event
})

export const eventsDismissAlert = (index) => ({
  type: 'DISMISS_EVENT_ALERT',
  index
})
