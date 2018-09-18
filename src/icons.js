//get size of icon function
//return array of iconLayers vehicles -> arrayOfIcons
//get

/*

import all icons
getallsizesonimport
make function vehicles -> arrayOfIcons

*/

import icon1 from './data/icons2/iicon1.svg';
import icon2 from './data/icons2/iicon2.svg';
import icon3 from './data/icons2/iicon3.svg';
import icon4 from './data/icons2/iicon4.svg';
import icon5 from './data/icons2/iicon5.svg';
import icon6 from './data/icons2/iicon6.svg';
import icon7 from './data/icons2/iicon7.svg';
import icon8 from './data/icons2/iicon8.svg';
import icon9 from './data/icons2/iicon9.svg';
import icon10 from './data/icons2/iicon10.svg';
import icon11 from './data/icons2/iicon11.svg';
import icon12 from './data/icons2/iicon12.svg';
import icon13 from './data/icons2/iicon13.svg';
import icon14 from './data/icons2/iicon14.svg';
import icon15 from './data/icons2/iicon15.svg';
import icon16 from './data/icons2/iicon16.svg';
import icon17 from './data/icons2/iicon17.svg';
import icon18 from './data/icons2/iicon18.svg';
import icon19 from './data/icons2/iicon19.svg';
import icon20 from './data/icons2/iicon20.svg';
import icon21 from './data/icons2/iicon21.svg';
import icon22 from './data/icons2/iicon22.svg';
import icon23 from './data/icons2/iicon23.svg';
import icon24 from './data/icons2/iicon24.svg';
import icon25 from './data/icons2/iicon25.svg';
import icon26 from './data/icons2/iicon26.svg';
import icon27 from './data/icons2/iicon27.svg';

import aircraft_service_stairs from './data/icons3/aircraft-service-stairs.svg';
import aircraft_tripod_jack from './data/icons3/aircraft-tripod-jack.svg';
import asu from './data/icons3/asu.svg';
import baggage_dolly_down from './data/icons3/baggage-dolly-down.svg';
import baggage_dolly_up from './data/icons3/baggage-dolly-up.svg';
import belt_loader from './data/icons3/belt-loader.svg';
import bus from './data/icons3/bus.svg';
import car from './data/icons3/car.svg';
import catering_vehicle from './data/icons3/catering-vehicle.svg';
import cistern from './data/icons3/cistern.svg';
import container_loader from './data/icons3/container-loader.svg';
import container_platform from './data/icons3/container-platform.svg';
import deicing_vehicle from './data/icons3/deicing-vehicle.svg';
import forklifter from './data/icons3/forklifter.svg';
import fuel from './data/icons3/fuel.svg';
import gpu from './data/icons3/gpu.svg';
import heater from './data/icons3/heater.svg';
import hydrant_refueler from './data/icons3/hydrant-refueler.svg';
import lavatory_vehicle from './data/icons3/lavatory-vehicle.svg';
import pushback_requires_towbar from './data/icons3/pushback-requires-towbar.svg';
import pushback from './data/icons3/pushback.svg';
import stairs_selfpropelled from './data/icons3/stairs-selfpropelled.svg';
import stairs_towed from './data/icons3/stairs-towed.svg';
import towbar from './data/icons3/towbar.svg';
import tractor_electricity from './data/icons3/tractor-electricity.svg';
import tractor_fuel from './data/icons3/tractor-fuel.svg';
import water_vehicle from './data/icons3/water-vehicle.svg';
import getSVGDimensions from './utility';
import DeckGL, { IconLayer, COORDINATE_SYSTEM } from 'deck.gl';

const icons = [
  aircraft_service_stairs,
  aircraft_tripod_jack,
  asu,
  baggage_dolly_down,
  baggage_dolly_up,
  belt_loader,
  bus,
  car,
  catering_vehicle,
  cistern,
  container_loader,
  container_platform,
  deicing_vehicle,
  forklifter,
  fuel,
  gpu,
  heater,
  hydrant_refueler,
  lavatory_vehicle,
  pushback_requires_towbar,
  pushback,
  stairs_selfpropelled,
  stairs_towed,
  towbar,
  tractor_electricity,
  tractor_fuel,
  water_vehicle,
];

export const typeToIcon = {
  aircraft_service_stairs,
  aircraft_tripod_jack,
  asu,
  baggage_dolly_down,
  baggage_dolly_up,
  belt_loader,
  bus,
  car,
  catering_vehicle,
  cistern,
  container_loader,
  container_platform,
  deicing_vehicle,
  forklifter,
  fuel,
  gpu,
  heater,
  hydrant_refueler,
  lavatory_vehicle,
  pushback_requires_towbar,
  pushback,
  stairs_selfpropelled,
  stairs_towed,
  towbar,
  tractor_electricity,
  tractor_fuel,
  water_vehicle,
};

const types = Object.keys(typeToIcon);



const ICON_SIZE = 10;
/*
const icons = [
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  icon6,
  icon7,
  icon8,
  icon9,
  icon10,
  icon11,
  icon12,
  icon13,
  icon14,
  icon15,
  icon16,
  icon17,
  icon18,
  icon19,
  icon20,
  icon21,
  icon22,
  icon23,
  icon24,
  icon25,
  icon26,
  icon27,
];*/

const iconDimensionsMaping = {};
let loadedCount = 0;
icons.forEach(icon => {
  getSVGDimensions(icon).then(dimensions => {
    let {width, height} = dimensions;

    width = Math.floor(width);
    height = Math.floor(height);

    iconDimensionsMaping[icon] = {width, height};
    console.log(loadedCount);
    loadedCount++;
  });
});


const getDimensions = function getDimensions(iconType) {
  if (loadedCount !== icons.length) return {width: 0, height: 0};
  return iconDimensionsMaping[typeToIcon[iconType]];
}

const getIconArray = function getIconArray(airportVehicles, scale) {

  if (loadedCount !== icons.length) return [];

  const result = [];

  airportVehicles.forEach(v => {

    let {width, height} = iconDimensionsMaping[typeToIcon[v.type]];
    width = width - 2;
    height = height - 2;

    let data = [
      {
        position: [ v.position[0], v.position[1] ],
        type: v.type,
        name: v.name,
        //icon: null,
        id: v.id,
        icon: "graphic"
      }
    ];

    const icon = new IconLayer({
      id: `icon-layer-${v.id}`,
      data: data,
      iconAtlas: typeToIcon[v.type],
      iconMapping:  {
        graphic: {x: 1, y: 1, width, height, mask: false},
      },
      sizeScale: scale,
      getSize: ICON_SIZE,
      opacity: 1,
      fp64: true,
      parameters: {
        depthTest: false
      },
      coordinateSystem: COORDINATE_SYSTEM.LNGLAT_EXPERIMENTAL,
      //onClick: info => this._updateTooltip.bind(this)(info),
      //onHover: info => this._updateTooltip.bind(this)(info),
      pickable: true,
    });

    result.push(icon);

  });

  return result;
};

export { getIconArray, getDimensions, types };
