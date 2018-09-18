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

//import mergedGeojson from './data/merged_geojson.js';

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

const LAYER_CONFIGS = [
  {
    file: "01_teren_lotniska.geojson",
    color: [75, 178, 59],
  },
  {
    file: "02_nawierzchnia_utwardzona.geojson",
    color: [168, 168, 168],
  },
  {
    file: "03_stanowiska_postojowe.geojson",
    color: [151, 151, 151]
  },
  {
    file: "04_pas_startowy.geojson",
    color: [48, 48, 48],
  },
  {
    file: "05_poziome_oznaczenia_pasa.geojson",
    color: [255, 255, 255],
  },

  {
    file: "06_linie_przerywane_pasa.geojson",
    color: [255, 255, 255]
  },
  {
    file: "07_drogi_poza_obszarem_kolowania.geojson",
    color: [92, 92, 92]
  },
  {
    file: "08_drogi_w_obszarze_kolowania.geojson",
    color: [92, 92, 92]
  },
  {
    file: "09a_oznakowanie_poziome_drogowe_przerywane_drobne.geojson",
    color: [255, 255, 255],
    lineColor: [255, 255, 255]
  },
  {
    file: "09_oznakowanie_poziome_drogowe_przerywane.geojson",
    color: [255, 255, 255],
    lineColor: [255, 255, 255]
  },
  {
    file: "10_oznakowanie_poziome_drogowe_podwojne_linie.geojson",
    color: [255, 255, 255],
    lineColor: [255, 255, 255]
  },
  {
    file: "11_oznakowanie_poziome_drogowe_gruba_linia.geojson",
    color: [255, 255, 255],
    lineColor: [255, 255, 255]
  },
  {
    file: "12_oznakowanie_poziome_drogowe_ciagle.geojson",
    color: [255, 255, 255],
    lineColor: [255, 255, 255]
  },
  {
    file: "13_linie_bezpieczenstwa.geojson",
    color: [100, 255, 100],
    lineColor: [100, 255, 100]
  },
  {
    file: "14_oznakowanie_poziome_ciemne.geojson",
    color: [95, 95, 95],
    lineColor: [95, 95, 95]
  },
  {
    file: "15_oznakowanie_poziome_czarne_bez_ramki.geojson",
    color: [10, 10, 10],
    lineColor: [10, 10, 10]
  },
  {
    file: "16_oznakowanie_poziome_zolte.geojson",
    color: [255, 228, 0],
    hover: true
  },
  {
    file: "17_tory_dla_pieszych.geojson",
    color: [144, 193, 242]

  },
  {
    file: "18_budynki.geojson",
    color: [188, 190, 155],
    extruded: true,
    elevation: 20,
    hover: true
  },
  {
    file: "19_miejsca_oczekiwania_linie_przerywane.geojson",
    lineColor: [255, 228, 0]
  },
  {
    file: "20_miejsca_oczekiwania_linie_ciagle.geojson",
    lineColor: [255, 228, 0]
  },
  {
    file: "21_krawedz_drogi_kolowania.geojson",
    lineColor: [255, 228, 0]
  },
  {
    file: "22_os_drogi_kolowania.geojson",
    lineColor: [255, 228, 0]
  },
  {
    file: "23_os_drogi_kolowania_stanowiska_uzupelniajacego.geojson",
    lineColor: [255, 228, 0]
  },
  {
    file: "24_pola_techniczne.geojson",
    opacity: 0.1,
    color: [255, 255, 255]
  },
  {
    file: "25_strefy_zakazu_parkowania.geojson",
    opacity: 0.1,
    color: [100, 10, 10]
  },
  {
    file: "26_strefy_stanowisk_postojowych.geojson",
    opacity: 0.1,
    color: [204, 0, 3]
  },
  {
    file: "27_miejsca_parkingowe.geojson",
    color: [255, 255, 255]
  }
];




const merge_layers = () => {
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

export default merge_layers;
//merge_layers();
