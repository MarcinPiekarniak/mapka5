import React, {Component} from 'react';
import DeckGL, {ScatterplotLayer, IconLayer, TextLayer, COORDINATE_SYSTEM} from 'deck.gl';
import MapLayer from '../../MapLayer.js';
import { connect } from "react-redux";
import { updateViewport, updateTooltipId } from '../../actions';
import { getFilteredAirportVehicles, getAirportVehicleWithId } from '../../selectors';
import imageJPG from '../../data/ikonki.svg';
import icon5 from '../../data/icons/iicon5.svg';
import icon20 from '../../data/icons/iicon20.svg';
import icon21 from '../../data/icons/iicon21.svg';
import sillySVG from '../../data/silly.svg';
import {WebMercatorViewport} from 'deck.gl';
import getSVGDimensions from '../../utility';
import { getIconArray, getDimensions } from '../../icons.js';

getSVGDimensions(icon5).then(x => console.log(x)).catch(err => console.log(`WTF ${err}`));

const ICON_SIZE = 10;

class AirportMap extends Component {
  constructor(props) {
    super(props);
    this.layers = [new MapLayer()];
    this.state = {
      tooltip: {
      	object: null,
      	layer: null
      },
      width: 500,
      height: 500,
      tooltipHoverId: null,
	  };
    this.gl = null;

    /*
    setInterval(() => {

      const sampleViewport = new WebMercatorViewport({

        ...this.props.viewport,
        width: this.state.width,
        height:  this.state.height,
      });
      let v = this.props.airportVehicles[0];
      console.log('muah');
      console.log(sampleViewport);
      console.log(sampleViewport.project([v.position[0], v.position[1]]));




      console.log([v.position[0], v.position[1]]);
    }, 2000);
    */

  }



  componentDidMount() {
    window.addEventListener('resize', this._resize.bind(this));

    this._resize();
  }

  componentWillUnmount() {

  }

  _resize() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  _getObjectInfo(object) {
    return (
      <table style={{"text-align": "left"}}>
        <tr><td>id:</td><td>{object.id}</td></tr>
        <tr><td>type:</td><td>{object.type}</td></tr>
        <tr><td>name:</td><td>{object.name}</td></tr>
        <tr><td>latitude:</td><td>{object.position[0].toFixed(5)}</td></tr>
        <tr><td>longitude:</td><td>{object.position[1].toFixed(5)}</td></tr>
      </table>
    )
    //return <div>o jejku</div>;
    //return Object.keys(object).map(k => <div>o jejku</div>);
  	return Object.keys(object).map(k => <div key={k}>{k}: {object[k]}</div>);
  }

  _renderTooltip(scale) {
    let v = this.props.tooltipObject;
    let renderCloseTooltip = false;
    if (v != null) {
      renderCloseTooltip = true;
    } else {
      v = getAirportVehicleWithId(this.props.airportVehicles, this.state.tooltipHoverId);
      if (v == null) return;
    }
    const sampleViewport = new WebMercatorViewport({
      ...this.props.viewport,
      width: this.state.width,
      height:  this.state.height,
    });

    const coords = sampleViewport.project([v.position[0], v.position[1]]);
    let x = coords[0] + (getDimensions(v.type).width/getDimensions(v.type).height * ICON_SIZE/2.5 * scale);
    let y = coords[1] - (ICON_SIZE/2.5 * scale);
    let visibility = null;
    if (y > this.state.height || x > this.state.width) {
      visibility = "hidden";
      x = 0;
      y = 0;
    } else if (y > this.state.height - 100) {
      visibility = "visible";
      y = y - 100;
    } else if (x > this.state.width - 200) {
      visibility = "visible";
      x = x - 200;
    } else {
      visibility = "visible";
    }

    const closeTooltip = () => this._updateTooltipClick(null);

    return (
        <div className="tooltip"
             style={{left: x , top: y, visibility: visibility }}>
             {renderCloseTooltip && (<div className="pin" onClick={closeTooltip}>
                <svg viewBox="0 0 64 64" width="16px" height="16px"  style={{fill: "currentcolor"}}>
                  <path d="M36 35.476V59a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V35.476C21.103 33.696 16 27.453 16 20c0-8.836 7.163-16 16-16s16 7.164 16 16c0 7.453-5.103 13.697-12 15.476z"></path>
                </svg>

             </div>)}
              {this._getObjectInfo(v)}
        </div>
    );





/*

  	const {object, layer} = this.state.tooltip;

    if (!object || !layer) {
      return null;
    }

    const coords = layer.context.viewport.project([object.position[0], object.position[1]]);
    const x = coords[0];
    const y = coords[1];
    const info = this._getObjectInfo(object);
    console.log(object);
  	return (
        <div className="tooltip"
             style={{left: x, top: y}}>
          {info}
        </div>
    );*/
  }

  _renderTooltipHover() {
    if (this.state.tooltipHoverId == null) return;

    let v = getAirportVehicleWithId(this.props.airportVehicles, this.state.tooltipHoverId);

    const sampleViewport = new WebMercatorViewport({
      ...this.props.viewport,
      width: this.state.width,
      height:  this.state.height,
    });

    const coords = sampleViewport.project([v.position[0], v.position[1]]);
    let x = coords[0] + (getDimensions(v.type).width/getDimensions(v.type).height * ICON_SIZE/2.5 * Math.pow(2, this.props.viewport.zoom - 15));
    let y = coords[1] - (ICON_SIZE/2.5 * Math.pow(2, this.props.viewport.zoom - 15));
    let visibility = null;
    if (y > this.state.height || x > this.state.width) {
      visibility = "hidden";
      x = 0;
      y = 0;
    } else if (y > this.state.height - 100) {
      visibility = "visible";
      y = y - 100;
    } else if (x > this.state.width - 200) {
      visibility = "visible";
      x = x - 200;
    } else {
      visibility = "visible";
    }

    return (
        <div className="tooltip"
             style={{left: x , top: y, visibility: visibility }}>
              {this._getObjectInfo(v)}
        </div>
    );
  }

  _updateTooltipClick(info) {
    if (info != null) {
      this.props.updateTooltipId(info.object.id);
    } else {
      this.props.updateTooltipId(null);
    }
  }

  _updateTooltipHover(info) {
    if (info != null) {
      this.setState({
        tooltipHoverId: info.object.id,
      });
    } else {
      this.setState({
        tooltipHoverId: null,
      });
    }
  }

/*
  _updateTooltip(info) {
  	if (info) {
  		const {object, layer} = info;
		  this.setState({tooltip: {object, layer}});
    } else {
    	this.setState({tooltip: {object: null, layer: null}});
    }
  }
  */

  render() {
    const { width, height } = this.state;
    let allLayers = this.layers.slice(0);
    //Math.pow(2.5, this.props.viewport.zoom - 15);
    //console.log(this.props.viewport.zoom);

    let zoom =  this.props.viewport.zoom;
    let scale = 1;

    if (zoom > 18) {
      scale = Math.pow(2, this.props.viewport.zoom - 16);
    } else if (zoom < 18 && zoom > 15){
      scale = 4;
    } else {
      scale = Math.pow(0.99, this.props.viewport.zoom - 111.951);
    }

    const iconLayers = getIconArray(this.props.airportVehicles, scale);
    allLayers = allLayers.concat(iconLayers);

/*
    const textLayer = new TextLayer({
                id: 'twitter-topics-raw',
                data: [{
                  "label": "HARCORE TEXT PLZ",
                  "coordinates": [
                    18.468,
                    54.3792,


                  ],
                  "weight": 1
                }],
                getText: d => d.label,
                getPosition: x => x.coordinates,
                getColor: d => [255, 255, 255],
                getSize: d => 20,
                getAngle: this.props.viewport.bearing - 24,
                sizeScale: 32 / 20,
                fp64: true,
              })


    allLayers.push(textLayer);
    */



    const getCursor = ({isDragging}) => {
      if (this.state.tooltipHoverId != null) {
        return 'pointer';
      }


      let venderPrefix = '';

      // Get CSS vendor prefix
      try {
        const styleObj = document.createElement('div').style;
        const prefix = /^(webkit|moz|ms|o)(?=[A-Z])/;
        for (const key in styleObj) {
          if (prefix.test(key)) {
            venderPrefix = `-${key.match(prefix)[0]}-`;
            break;
          }
        }
      } catch (error) {
        // document not available
      }

      const VENDOR_PREFIX = venderPrefix;

      const PREFIX = VENDOR_PREFIX === '-webkit-' ? VENDOR_PREFIX : '';

      const CURSOR = {
        GRABBING: `${PREFIX}grabbing`,
        GRAB: `${PREFIX}grab`,
        POINTER: 'pointer'
      };


      return (isDragging ? CURSOR.GRABBING : CURSOR.GRAB);
    }

//getCursor={() => 'pointer'

    return (
      <div style={{width:width, height:height, background: "#141D28"}}>
        {this._renderTooltip(scale)}
        <DeckGL
          {...this.props.viewport}
          width={width}
          height={height}
          layers={allLayers}
          controller={true}
          onViewStateChange={({viewState}) => {
            this.props.updateViewport(viewState)
          }}
          onLayerClick={info => this._updateTooltipClick.bind(this)(info)}
          onLayerHover={info => this._updateTooltipHover.bind(this)(info)}
          getCursor={getCursor}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    airportVehicles: getFilteredAirportVehicles(
      state.airportVehicles.airportVehicles,
      state.airportVehicles.filters
    ),
    viewport: state.viewports.currentViewport,
    tooltipObject: getAirportVehicleWithId(
      state.airportVehicles.airportVehicles,
      state.airportVehicles.tooltipId
    ),
  };
};

const mapDispatchToProps = { updateViewport, updateTooltipId };

export const AirportMapContainer = connect(mapStateToProps, mapDispatchToProps)(AirportMap);


/*
car: {
  lat: 54.3792,
  lng: 18.468
},


this.timerID = setInterval(
  () => this._updateVehiclesPositions(),
  80
);*/
	//clearInterval(this.timerID);

/*
  _updateTooltip(info) {
  	if (info) {
  		const {x, y, object, layer} = info;
		this.setState({tooltip: {x, y, object, layer}});
    } else {
    	this.setState({tooltip: {x: 0, y: 0, object: null, layer: null}});
    }
  }

  _updateInfoWindow(info) {
  	if (info) {
  		const {object, layer} = info;
		this.setState({infowindow: {object, layer}});
    } else {
    	this.setState({infowindow: {object: null, layer: null}});
    }
  }

  _getObjectInfo(object) {
  	return Object.keys(object).map(k => <div key={k}>{k}: {object[k]}</div>);
  }

  _renderTooltip() {
  	const {x, y, object, layer} = this.state.tooltip;

    if (!object || !layer) {
      return null;
    }

  	let info = layer.id === "vehicles layer" ? this._getObjectInfo(object) : this._getObjectInfo(object.properties);

  	return (
      <div className="tooltip"
           style={{left: x, top: y}}>
        {info}
      </div>
    );

  }

  _renderInfoWindow() {
  	const {object, layer} = this.state.infowindow;

    if (!object || !layer) {
      return null;
    }

  	let info = layer.id === "vehicles layer" ? this._getObjectInfo(object) : this._getObjectInfo(object.properties);
  	return (
      <div className="infowindow">
        {info}
      </div>
    );
  }*/
/*
  _updateVehiclesPositions() {
  	this.setState(prevState => {
  		const newVehicles =  prevState.vehicles.map(v => ({
  			position: [
  				v.position[0] + v.speed * Math.cos(v.bearing * Math.PI / 180),
  				v.position[1] + v.speed * Math.sin(v.bearing * Math.PI / 180)
  			],
  			bearing: v.bearing,
  			speed: v.speed,
  			id: v.id
  		}))

  		let newObject = prevState.infowindow.object;
  		if (prevState.infowindow && prevState.infowindow.layer && prevState.infowindow.layer.id === "vehicles layer" && prevState.infowindow.object && prevState.infowindow.object.id) {
  			newObject = newVehicles.filter(v => v.id === prevState.infowindow.object.id).slice(-1)[0];
  			if(!newObject) {
  				newObject = prevState.infowindow.object;
  			}
  		}

  		return {
  			vehicles: newVehicles,
  			infowindow: {
  				...prevState.infowindow,
  				object: newObject
  			}
  		}
  	});
  }*/
