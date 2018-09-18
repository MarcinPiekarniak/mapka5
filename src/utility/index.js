export default function getSVGDimensions(path) {
  return new Promise((resolve, reject) => {

    var parseString = require('xml2js').parseString;

    var attrToLowerCase = function(name) {
  		return name.toLowerCase();
  	}

  	var parseString = require('xml2js').parseString;
  	var height = null;
  	var width = null;

  	fetch(path).then(response => response.text()).then((data) => {
      if (!data) return reject('failed to load');
      parseString(data, {strict: false, attrkey:'ATTR', attrNameProcessors:[attrToLowerCase]}, function (err, result) {
      	if (err) return reject(err);
      	var hasWidthHeightAttr = result.SVG.ATTR['width'] && result.SVG.ATTR['height'];
      	if (hasWidthHeightAttr) {
      		height = result.SVG.ATTR['height'];
      		width = result.SVG.ATTR['width'];
      	} else {
      		width = result.SVG.ATTR['viewbox'].toString().replace(/^\d+\s\d+\s(\d+\.?[\d])\s(\d+\.?[\d])/, "$1");
      		height = result.SVG.ATTR['viewbox'].toString().replace(/^\d+\s\d+\s(\d+\.?[\d])\s(\d+\.?[\d])/, "$2");
      	}
      	return resolve({height: parseFloat(height), width: parseFloat(width)});
      });
  	}).catch(err => reject(err));
  });
}

export { GeoJsonGeometriesLookup } from './geojson-geometries-lookup';


//{ height: 74.79999542236328, width: 100.00000762939453 }
//get('../data/icons2/iicon1.svgg').then(x => console.log(x)).catch(x=>console.log(x));
