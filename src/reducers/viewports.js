import initialState from './initialState.js';

export const viewports = (state = initialState.viewports, action) => {
  switch (action.type) {
    case 'VIEWPORT_RESET':
      return {
        ...state,
        currentViewport: JSON.parse(JSON.stringify(state.defaultViewport))
      }
    case 'VIEWPORT_UPDATE':
      let currentViewport = JSON.parse(JSON.stringify(state.currentViewport))
      let actionViewport = JSON.parse(JSON.stringify(action.viewport));
      if (actionViewport.zoom < 13){
        actionViewport = currentViewport;
      } else if(actionViewport.zoom > 18){
        actionViewport = currentViewport;
      }

      return {
        ...state,
        currentViewport: actionViewport
      }
    case 'VIEWPORT_ZOOM_IN':
      if(state.currentViewport.zoom < 18){
          state.currentViewport.zoom = state.currentViewport.zoom + 0.5;
      }

      return {
      	...state,
      	currentViewport: state.currentViewport
      }
    case 'VIEWPORT_ZOOM_OUT':
        if(state.currentViewport.zoom > 13){
            state.currentViewport.zoom = state.currentViewport.zoom - 0.5;
        }

      return {
      	...state,
      	currentViewport: state.currentViewport
      }
    case 'VIEWPORT_ZOOM':
      state.currentViewport = JSON.parse(JSON.stringify(state.defaultViewport));
      state.currentViewport.latitude = action.coordinates.latitude;
      state.currentViewport.longitude = action.coordinates.longitude;
      state.currentViewport.zoom = 17;
      return {
        ...state,
      }

    case 'VIEWPORT_PAN':
      //let oldZoom = state.currentViewport.zoom;
      console.log("PANTO");
      state.currentViewport = JSON.parse(JSON.stringify(state.currentViewport));
      state.currentViewport.latitude = action.coordinates.latitude;
      state.currentViewport.longitude = action.coordinates.longitude;
      //state.currentViewport.zoom = oldZoom;
      return {
        ...state,
      }


    default:
      return state
  }
}
