import React, {Component} from 'react';

import {
	AirportMapContainer,
	ViewManagerContainer,
	TimeBoxContainer,
	FilterPanelContainer,
	EventPanelContainer,
	MenuPanelContainer,
} from './components';

import {
	airportVehiclesLoaded,
	airportVehiclesUpdate,
	eventsAddAlert,
	eventsAddWarning,
	eventsAddNotification
} from "./actions";

import { connect } from "react-redux";
import { types } from './icons.js';
import { GeoJsonGeometriesLookup } from "./utility";
import t1 from './data/01_teren_lotniska.js';
import zona from './data/zones/zona_dozwolonego_ruchu_pojazdow.js'

let eventId = 0;

export default class Airport extends Component {
	constructor(props) {
    super(props);
		this.glookup = new GeoJsonGeometriesLookup(zona);

  }

  componentDidMount() {
    let vId = 0;
    /*let vehicles = (new Array(1 * types.length)).fill(null).map(() => ({
              position: [18.468 + 0.01 * (Math.random() > 0.5 ? Math.random() : -Math.random()),
                54.3792 + 0.002 * (Math.random() > 0.5 ? Math.random() : -Math.random())],
              bearing: Math.floor(360 * Math.random()),
              speed: 0.000002 + 0.000002 * Math.random(),

              }));
*/
		let vehicles = (new Array(20)).fill(null).map(() => ({
					position: [18.46759, 54.38035],
					bearing: Math.floor(360 * Math.random()),
					speed: 0.000002 + 0.000002 * Math.random(),

					}));


		for (let i = 0; i < 1 * vehicles.length /*types.length*/; ++i) {
			vehicles[i].id = i;
			vehicles[i].type = types[i % types.length];
			vehicles[i].name = types[i % types.length] + i % types.length;
			vehicles[i].inZone = true;
		}

    this.props.airportVehiclesLoaded(vehicles);

		this.timerID = setInterval(
		  () => this._updateVehiclesPositions(),
		  100
		);

  }

	_updateVehiclesPositions() {

		const newVehicles = this.props.airportVehicles.map(v => {
			const point = {type: "Point", coordinates: v.position};
			let inZone = this.glookup.hasContainers(point, {ignorePoints: true, ignoreLines: true});
			if (v.inZone && !inZone) {
				this.props.eventsAddAlert({
					type: 'RESTRICTED_ZONE_VIOLATION',
					text: `${v.name} - Restricted Zone Violation!`,
					eventId: eventId++,
					objectId: v.id,
					timestamp: +new Date(),
				})
			}
			return {
				position: [
					v.position[0] + v.speed * Math.cos(v.bearing * Math.PI / 180),
					v.position[1] + v.speed * Math.sin(v.bearing * Math.PI / 180)
				],
				bearing: v.bearing,
				speed: v.speed,
				id: v.id,
				type: v.type,
				name: v.name,
				inZone: inZone,
			}
		});

		this.props.airportVehiclesUpdate(newVehicles);
  }

  render() {
    //let layers = this.state.data.filter(layer => layer != null).map(layer => new MapLayer({...layer, lightSettings: LIGHT_SETTINGS}));
    return (
      <div>
        <ViewManagerContainer />
				{/*<FilterPanelContainer />*/}
        <AirportMapContainer />
				<TimeBoxContainer />
				<EventPanelContainer />
				<MenuPanelContainer />
				{/*<LegendPanel />*/}
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
		airportVehicles: state.airportVehicles.airportVehicles
	};
};

const mapDispatchToProps = { airportVehiclesLoaded, airportVehiclesUpdate, eventsAddAlert, eventsAddWarning, eventsAddNotification };

export const AirportContainer = connect(mapStateToProps, mapDispatchToProps)(Airport);

/*
let newData = [];
LAYER_CONFIGS.forEach((layer, index) => {
  newData[index] = {
    ...layer,
    data: geoJSONS[layer.file]
  };
});


let newData = [
this.state = {
  data: newData
};
*/




/*
import t1 from './data/01_teren_lotniska.js';
import t2 from './data/02_nawierzchnia_utwardzona.js';
import t3 from './data/03_stanowiska_postojowe.js';
import t4 from './data/04_pas_startowy.js';
import t5 from './data/05_poziome_oznaczenia_pasa.js';
import t6 from './data/06_linie_przerywane_pasa.js';
import t7 from './data/07_drogi_poza_obszarem_kolowania.js';
import t8 from './data/08_drogi_w_obszarze_kolowania.js';
import t9 from './data/09_oznakowanie_poziome_drogowe_przerywane.js';
import t9a from './data/09a_oznakowanie_poziome_drogowe_przerywane_drobne.js';
import t10 from './data/10_oznakowanie_poziome_drogowe_podwojne_linie.js';
import t11 from './data/11_oznakowanie_poziome_drogowe_gruba_linia.js';
import t12 from './data/12_oznakowanie_poziome_drogowe_ciagle.js';
import t13 from './data/13_linie_bezpieczenstwa.js';
import t14 from './data/14_oznakowanie_poziome_ciemne.js';
import t15 from './data/15_oznakowanie_poziome_czarne_bez_ramki.js';
import t16 from './data/16_oznakowanie_poziome_zolte.js';
import t17 from './data/17_tory_dla_pieszych.js';
import t18 from './data/18_budynki.js';
import t19 from './data/19_miejsca_oczekiwania_linie_przerywane.js';
import t20 from './data/20_miejsca_oczekiwania_linie_ciagle.js';
import t21 from './data/21_krawedz_drogi_kolowania.js';
import t22 from './data/22_os_drogi_kolowania.js';
import t23 from './data/23_os_drogi_kolowania_stanowiska_uzupelniajacego.js';
import t24 from './data/24_pola_techniczne.js';
import t25 from './data/25_strefy_zakazu_parkowania.js';
import t26 from './data/26_strefy_stanowisk_postojowych.js';
import t27 from './data/27_miejsca_parkingowe.js';
*/
/*
import mergedGeojson from './data/merged_geojson.js';

let geoJSONS = {
  "01_teren_lotniska.geojson" : t1,
  "02_nawierzchnia_utwardzona.geojson" : t2,
  "03_stanowiska_postojowe.geojson" : t3,
  "04_pas_startowy.geojson" : t4,
  "05_poziome_oznaczenia_pasa.geojson" : t5,
  "06_linie_przerywane_pasa.geojson" : t6,
  "07_drogi_poza_obszarem_kolowania.geojson" : t7,
  "08_drogi_w_obszarze_kolowania.geojson" : t8,
  "09a_oznakowanie_poziome_drogowe_przerywane_drobne.geojson" : t9,
  "09_oznakowanie_poziome_drogowe_przerywane.geojson" : t9a,
  "10_oznakowanie_poziome_drogowe_podwojne_linie.geojson" : t10,
  "11_oznakowanie_poziome_drogowe_gruba_linia.geojson" : t11,
  "12_oznakowanie_poziome_drogowe_ciagle.geojson" : t12,
  "13_linie_bezpieczenstwa.geojson" : t13,
  "14_oznakowanie_poziome_ciemne.geojson" : t14,
  "15_oznakowanie_poziome_czarne_bez_ramki.geojson" : t15,
  "16_oznakowanie_poziome_zolte.geojson" : t16,
  "17_tory_dla_pieszych.geojson" : t17,
  "18_budynki.geojson" : t18,
  "19_miejsca_oczekiwania_linie_przerywane.geojson" : t19,
  "20_miejsca_oczekiwania_linie_ciagle.geojson" : t20,
  "21_krawedz_drogi_kolowania.geojson" : t21,
  "22_os_drogi_kolowania.geojson" : t22,
  "23_os_drogi_kolowania_stanowiska_uzupelniajacego.geojson" : t23,
  "24_pola_techniczne.geojson" : t24,
  "25_strefy_zakazu_parkowania.geojson" : t25,
  "26_strefy_stanowisk_postojowych.geojson" : t26,
  "27_miejsca_parkingowe.geojson" : t27,
};
*/
/*
function merge_layers() {

  let merged = JSON.parse(JSON.stringify(t1));
  for (let i = 0; i < merged.features.length; ++i) {
    merged.features[i].properties.id = `0_${i}`;
  }
  LAYER_CONFIGS.forEach((layer, index) => {
    if (index < 1) return;
    let features = JSON.parse(JSON.stringify(geoJSONS[layer.file].features));
    for (let i = 0; i < features.length; ++i) {
      features[i].properties.id = `${index}_${i}`;
    }
    merged.features = merged.features.concat(features);
  });
  console.log(merged);
}

merge_layers();
*/
