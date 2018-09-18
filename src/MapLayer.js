import { GeoJsonLayer, CompositeLayer, COORDINATE_SYSTEM } from 'deck.gl';
import airportGeojson from './data/airport_geojson.js';
import buildingGeojson from './data/18_budynki.js';

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

import zona from './data/zones/zona_dozwolonego_ruchu_pojazdow.js'


let geoJSONS = {
  //"01_teren_lotniska.geojson" : t1,
  //"02_nawierzchnia_utwardzona.geojson" : t2,
  //"03_stanowiska_postojowe.geojson" : t3,
  //"04_pas_startowy.geojson" : t4,
  //"05_poziome_oznaczenia_pasa.geojson" : t5,
  //"06_linie_przerywane_pasa.geojson" : t6,
  //"07_drogi_poza_obszarem_kolowania.geojson" : t7,
  //"08_drogi_w_obszarze_kolowania.geojson" : t8,
  //"09a_oznakowanie_poziome_drogowe_przerywane_drobne.geojson" : t9a,
  //"09_oznakowanie_poziome_drogowe_przerywane.geojson" : t9,
  //"10_oznakowanie_poziome_drogowe_podwojne_linie.geojson" : t10,
  //"11_oznakowanie_poziome_drogowe_gruba_linia.geojson" : t11,
  //"12_oznakowanie_poziome_drogowe_ciagle.geojson" : t12,
  //"13_linie_bezpieczenstwa.geojson" : t13,
  //"14_oznakowanie_poziome_ciemne.geojson" : t14,
  //"15_oznakowanie_poziome_czarne_bez_ramki.geojson" : t15,
  //"16_oznakowanie_poziome_zolte.geojson" : t16,
  //"17_tory_dla_pieszych.geojson" : t17,
  //"18_budynki.geojson" : t18,
  //"19_miejsca_oczekiwania_linie_przerywane.geojson" : t19,
  //"20_miejsca_oczekiwania_linie_ciagle.geojson" : t20,
  //"21_krawedz_drogi_kolowania.geojson" : t21,
  //"22_os_drogi_kolowania.geojson" : t22,
  "23_os_drogi_kolowania_stanowiska_uzupelniajacego.geojson" : t23,
  //"24_pola_techniczne.geojson" : t24,
  //"25_strefy_zakazu_parkowania.geojson" : t25,
  //"26_strefy_stanowisk_postojowych.geojson" : t26,
  //"27_miejsca_parkingowe.geojson" : t27,
};

const LAYER_CONFIGS = [
  {
    file: "01_teren_lotniska.geojson",
    color: [75, 178, 59],
    lineColor: [75, 178, 59],
    geojson: 1,
  },
  {
    file: "02_nawierzchnia_utwardzona.geojson",
    color: [168, 168, 168],
    lineColor: [168, 168, 168],
    geojson: 1,
  },
  {
    file: "03_stanowiska_postojowe.geojson",
    color: [151, 151, 151],
    lineColor: [151, 151, 151],
    geojson: 1,
  },
  {
    file: "04_pas_startowy.geojson",
    color: [48, 48, 48],
    lineColor: [255, 255, 255],
    lineWidth: 0.5,
    geojson: 2,
  },
  {
    file: "05_poziome_oznaczenia_pasa.geojson",
    color: [255, 255, 255],
    lineColor: [255, 255, 255],
    geojson: 1,
  },

  {
    file: "06_linie_przerywane_pasa.geojson",
    color: [255, 255, 255],
    lineColor: [255, 255, 255],
    dashArray: [20, 8],
    geojson: 1,
  },
  {
    file: "07_drogi_poza_obszarem_kolowania.geojson",
    color: [92, 92, 92],
    lineColor: [92, 92, 92],
    geojson: 1,
  },
  {
    file: "08_drogi_w_obszarze_kolowania.geojson",
    color: [92, 92, 92],
    lineColor: [92, 92, 92],
    geojson: 1,
  },
  {
    file: "09_oznakowanie_poziome_drogowe_przerywane.geojson",
    color: [255, 255, 255],
    lineColor: [255, 255, 255],
    dashArray: [18, 6],
    lineWidth: 0.5,
    geojson: 1,
  },
  {
    file: "09a_oznakowanie_poziome_drogowe_przerywane_drobne.geojson",
    color: [255, 255, 255],
    lineColor: [255, 255, 255],
    dashArray: [18, 6],
    lineWidth: 0.5,
    geojson: 1,
  },
  {
    file: "10_oznakowanie_poziome_drogowe_podwojne_linie.geojson",
    color: [255, 255, 255],
    lineColor: [255, 255, 255],
    lineWidth: 0.5,
    geojson: 1,
  },
  {
    file: "11_oznakowanie_poziome_drogowe_gruba_linia.geojson",
    color: [255, 255, 255],
    lineColor: [255, 255, 255],
    geojson: 1,
  },
  {
    file: "12_oznakowanie_poziome_drogowe_ciagle.geojson",
    color: [255, 255, 255],
    lineColor: [255, 255, 255],
    lineWidth: 0.2,
    geojson: 1,
  },
  {
    file: "13_linie_bezpieczenstwa.geojson",
    color: [100, 255, 100],
    lineColor: [201, 0, 3],
    lineWidth: 0.5,
    geojson: 1,
  },
  {
    file: "14_oznakowanie_poziome_ciemne.geojson",
    color: [95, 95, 95],
    lineColor: [255, 255, 255],
    geojson: 2,
    lineWidth: 0.5
  },
  {
    file: "15_oznakowanie_poziome_czarne_bez_ramki.geojson",
    color: [10, 10, 10],
    lineColor: [10, 10, 10],
    geojson: 1,
  },
  {
    file: "16_oznakowanie_poziome_zolte.geojson",
    color: [255, 228, 0],
    lineColor: [255, 255, 255],
    lineWidth: 0.5,
    hover: true,
    geojson: 2,
  },
  {
    file: "17_tory_dla_pieszych.geojson",
    color: [144, 193, 242],
    lineColor: [144, 193, 242],
    geojson: 1,
  },
  {
    file: "18_budynki.geojson",
    color: [188, 190, 155],
    lineColor: [188, 190, 155],
    extruded: true,
    elevation: 20,
    hover: true,
    geojson: 1,
  },
  {
    file: "19_miejsca_oczekiwania_linie_przerywane.geojson",
    color: [255, 228, 0],
    lineColor: [255, 228, 0],
    lineWidth: 0.25,
    geojson: 1,
  },
  {
    file: "20_miejsca_oczekiwania_linie_ciagle.geojson",
    color: [255, 228, 0],
    lineColor: [255, 228, 0],
    lineWidth: 0.5,
    geojson: 1,
  },
  {
    file: "21_krawedz_drogi_kolowania.geojson",
    color: [255, 228, 0],
    lineColor: [255, 228, 0],
    lineWidth: 0.5,
    geojson: 1,
  },
  {
    file: "22_os_drogi_kolowania.geojson",
    color: [255, 228, 0],
    lineColor: [255, 228, 0],
    geojson: 1,
  },
  {
    file: "23_os_drogi_kolowania_stanowiska_uzupelniajacego.geojson",
    color: [255, 228, 0],
    lineColor: [255, 228, 0],
    dashArray: [20, 8],
    geojson: 1,
  },
  {
    file: "24_pola_techniczne.geojson",
    opacity: 0.1,
    color: [255, 255, 255, 0],
    lineColor: [255, 255, 255],
    lineWidth: 0.5,
    geojson: 2,
  },
  {
    file: "25_strefy_zakazu_parkowania.geojson",
    opacity: 0.1,
    color: [100, 10, 10],
    lineColor: [100, 10, 10],
    lineWidth: 0.5,
    geojson: 1,
  },
  {
    file: "26_strefy_stanowisk_postojowych.geojson",
    opacity: 0.1,
    color: [204, 0, 3, 0],
    lineColor: [204, 0, 3],
    lineWidth: 0.5,
    geojson: 2,
  },
  {
    file: "27_miejsca_parkingowe.geojson",
    color: [255, 255, 255, 0],
    lineColor: [255, 255, 255],
    lineWidth: 0.5,
    geojson: 2,
  }
];

let newData = [];

LAYER_CONFIGS.forEach((layer, index) => {


  if (geoJSONS[layer.file] != null) {
    console.log(geoJSONS[layer.file]);
    newData[index] = {
     ...layer,
     data: geoJSONS[layer.file]
   }
  }

});



const LIGHT_SETTINGS2 = {
  lightsPosition: [18, 54, 5000, 19, 55, 8000],
  ambientRatio: 0.3,
  diffuseRatio: 0.5,
  specularRatio: 0.3,
  lightsStrength: [1.0, 0.0, 2.0, 0.0],
  numberOfLights: 2,
  coordinateSystem: COORDINATE_SYSTEM.LNGLAT_EXPERIMENTAL,
};

const LIGHT_SETTINGS1 = {
  lightsPosition: [18, 54, 5000, 19, 55, 8000],
  ambientRatio: 0.2,
  diffuseRatio: 0.5,
  specularRatio: 0.3,
  lightsStrength: [1.0, 0.0, 2.0, 0.0],
  numberOfLights: 2,
  //coordinateSystem: COORDINATE_SYSTEM.LNGLAT_EXPERIMENTAL,
};


const colors = [
	[75, 178, 59],
	[168, 168, 168],
	[151, 151, 151],
	[48, 48, 48],
	[255, 255, 255],
	[255, 255, 255],
	[92, 92, 92],
	[92, 92, 92],
	[255, 255, 255],
	[255, 255, 255],
	[255, 255, 255],
	[255, 255, 255],
	[255, 255, 255],
	[100, 255, 100],
	[95, 95, 95],
	[10, 10, 10],
	[255, 228, 0],
	[144, 193, 242],
	[188, 190, 155],
	[255, 228, 0],
	[255, 228, 0],
	[255, 228, 0],
	[255, 228, 0],
	[255, 228, 0],
	[255, 255, 255],
	[100, 10, 10],
	[204, 0, 3],
	[255, 255, 255],
];

function extractId(str) {
	let id = '';
	for (let i = 0; i < str.length; ++i) {
		if (str[i] === '_') break;
		id += str[i];
	}
	return parseInt(id);
}


class MapLayerGeojson1 extends GeoJsonLayer {
	static layerName = 'MapLayer'

	constructor(props) {
    super({
      id: 'airport-geojson1',
      data: airportGeojson,
      opacity: 1,
      stroked: true,
      filled: true,
      extruded: false,
      pickable: false,
      fp64: true,

    //getElevation: f => props.elevation || 0,
  //      getFillColor: f => props.color || [255, 255, 255],
    //  getLineColor: f => props.lineColor || [255, 255, 255],

      getElevation: f => {
        return 0;
				if (extractId(f.properties.id) === 18) {
					return 20;
				}else{
					return 0;
				}
			},
      getFillColor: f => {
        //if (LAYER_CONFIGS[extractId(f.properties.id)].geojson !== 1) {
        //  return [0,0,0,0];
        //}
        //return [222,222,222];
        //console.log('WTF');
        //console.log(LAYER_CONFIGS[extractId(f.properties.id)].color);
        //console.log(colors[extractId(f.properties.id)]);
        //console.log(LAYER_CONFIGS[extractId(f.properties.id)].color);
        //return [0,0,0,0];
				return LAYER_CONFIGS[extractId(f.properties.id)].color;
			},
      getLineColor: f => {
      //  if (LAYER_CONFIGS[extractId(f.properties.id)].geojson !== 1) {
      //    return [0,0,0,0];
      //  }
        //return colors[extractId(f.properties.id)];
        //return [222,222,222];
				return LAYER_CONFIGS[extractId(f.properties.id)].lineColor;
			},
      getLineDashArray: f => {
        //return [0,0];
        let dashArray = LAYER_CONFIGS[extractId(f.properties.id)].dashArray;
        if (dashArray == null) return [0, 0];
        return dashArray;
      },
      getLineWidth: f => {
        if (
          LAYER_CONFIGS[extractId(f.properties.id)].geojson === 1 &&
          (f.geometry.type === "Polygon" || f.geometry.type === "MultiPolygon")
        ) {
          return 0;
        }

        let lineWidth = LAYER_CONFIGS[extractId(f.properties.id)].lineWidth;
        if (lineWidth == null) return 1;
        return lineWidth;
      },
      lineWidthScale: 1,
			parameters: {
        depthTest: false
			},
      //lightSettings: LIGHT_SETTINGS2,
      coordinateSystem: COORDINATE_SYSTEM.LNGLAT_EXPERIMENTAL,
      //onClick: info => console.log('Clicked:', info),
      //onHover: info => console.log('Hovered:', info),
      pickable: false,
      onClick: f => {

      },
    })
	}
}

class MapLayerGeojson3 extends GeoJsonLayer {
	static layerName = 'MapLayer'

	constructor(props) {
    super({
      id: 'airport-geojson3',
      data: zona,
      opacity: 1,
      stroked: true,
      filled: true,
      extruded: false,
      pickable: false,
      fp64: true,

    //getElevation: f => props.elevation || 0,
  //      getFillColor: f => props.color || [255, 255, 255],
    //  getLineColor: f => props.lineColor || [255, 255, 255],

      getElevation: f => {
        return 0;
			},
      getFillColor: f => {

          return [255,255,255,255];

			},
      getLineColor: f => {

          return [255,255,255,255];

			},
      getLineDashArray: f => {
        return [0, 0];
      },
      getLineWidth: f => {
        return 1;
      },
      lineWidthScale: 1,
			parameters: {
        depthTest: false
			},
      //lightSettings: LIGHT_SETTINGS2,
      coordinateSystem: COORDINATE_SYSTEM.LNGLAT_EXPERIMENTAL,
      //onClick: info => console.log('Clicked:', info),
      //onHover: info => console.log('Hovered:', info),
      pickable: false,
    })
	}
}

class MapLayerGeojson2 extends GeoJsonLayer {
	static layerName = 'MapLayer'

	constructor(props) {
    super({
      id: 'airport-geojson2',
      data: airportGeojson,
      opacity: 1,
      stroked: true,
      filled: true,
      extruded: false,
      pickable: false,
      fp64: true,

    //getElevation: f => props.elevation || 0,
  //      getFillColor: f => props.color || [255, 255, 255],
    //  getLineColor: f => props.lineColor || [255, 255, 255],

      getElevation: f => {
        return 0;
				if (extractId(f.properties.id) === 18) {
					return 20;
				}else{
					return 0;
				}
			},
      getFillColor: f => {
        if (LAYER_CONFIGS[extractId(f.properties.id)].geojson !== 2) {
          return [0,0,0,0];
        }
        //return [222,222,222];
        //console.log('WTF');
        //console.log(LAYER_CONFIGS[extractId(f.properties.id)].color);
        //console.log(colors[extractId(f.properties.id)]);
        //console.log(LAYER_CONFIGS[extractId(f.properties.id)].color);
				return LAYER_CONFIGS[extractId(f.properties.id)].color;
			},
      getLineColor: f => {
        if (LAYER_CONFIGS[extractId(f.properties.id)].geojson !== 2) {
          return [0,0,0,0];
        }
        //return colors[extractId(f.properties.id)];
        //return [222,222,222];
				return LAYER_CONFIGS[extractId(f.properties.id)].lineColor;
			},
      getLineDashArray: f => {
        let dashArray = LAYER_CONFIGS[extractId(f.properties.id)].dashArray;
        if (dashArray == null) return [0, 0];
        return dashArray;
      },
      getLineWidth: f => {
        let lineWidth = LAYER_CONFIGS[extractId(f.properties.id)].lineWidth;
        if (lineWidth == null) return 1;
        return lineWidth;
      },
      lineWidthScale: 1,
			parameters: {
        depthTest: false
			},
      //lightSettings: LIGHT_SETTINGS2,
      coordinateSystem: COORDINATE_SYSTEM.LNGLAT_EXPERIMENTAL,
      //onClick: info => console.log('Clicked:', info),
      //onHover: info => console.log('Hovered:', info),
      pickable: false,
    })
	}
}




class BuildingGeojson extends GeoJsonLayer {
	static layerName = 'MapLayer'

	constructor(props) {
    super({
      id: 'airport-geojson2',
      data: buildingGeojson,
      opacity: 1,
      stroked: true,
      filled: true,
      extruded: true,
      pickable: false,
      fp64: true,
      getElevation: f => {
					return 20;
			},
      getFillColor: f => {
				return [80, 80, 80]
			},
      getLineColor: f => {
				return [255, 255, 255]
			},
			parameters: {
        depthTest: true
			},
      lightSettings: LIGHT_SETTINGS2,
      coordinateSystem: COORDINATE_SYSTEM.LNGLAT_EXPERIMENTAL,
      //onClick: info => console.log('Clicked:', info),
      //onHover: info => console.log('Hovered:', info),
      pickable: false,
    })
	}
}

console.log('ZONAAAA');
console.log(zona);

//let layers = newData.filter(layer => layer != null).map(layer => new MapLayerGeojson({...layer}));
//layers.push(new BuildingGeojson());

let layers = [new MapLayerGeojson1(), /*new MapLayerGeojson3(), */new BuildingGeojson()];

export default class MapLayer extends CompositeLayer {

  renderLayers() {
    return layers;
  }
}
