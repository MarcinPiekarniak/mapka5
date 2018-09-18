import { combineReducers } from "redux";
import { airportVehicles } from "./airportVehicles";
import { events } from "./events";
import { viewports } from "./viewports";


export default combineReducers({
  airportVehicles,
  viewports,
  events
});
