import initialState from './initialState.js';

export const events = (state = initialState.events, action) => {
  switch (action.type) {
    case 'ADD_EVENT_ALERT':
      return {
        ...state,
        alerts: [
          ...state.alerts,
          action.event
        ]
      }

    case 'ADD_EVENT_WARNING':
      return {
        ...state,
        warnings: [
          ...state.warnings,
          action.event
        ]
      }

    case 'ADD_EVENT_NOTIFICATION':
      return {
        ...state,
        notifications: [
          ...state.notifications,
          action.event
        ]
      }

    case 'DISMISS_EVENT_ALERT':
      let alerts = JSON.parse(JSON.stringify(state.alerts));
      alerts.splice(action.index, 1);
      return {
        ...state,
        alerts: alerts,
      }


    default:
      return state
  }
}
