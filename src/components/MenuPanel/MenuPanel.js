import React, {Component} from 'react';
import DeckGL, {ScatterplotLayer} from 'deck.gl';
import MapLayer from '../../MapLayer.js';
import { connect } from "react-redux";
import { zoomViewport, panViewport, updateTooltipId, airportVehiclesAddFilter, airportVehiclesRemoveFilter} from '../../actions';
import { getFilteredAirportVehicles } from '../../selectors';
import { typeToIcon, getDimensions} from '../../icons.js'
import { SearchPanelContainer } from '..'
import { FilterPanelContainer } from '..'
import { LegendPanelContainer } from '..'

class MenuPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      option: 0,
    };
  }

  tab() {
    if (this.state.hidden) return null;

    return (
      <div className="menutab-holder">
        {this.state.option === 0 && <SearchPanelContainer />}
        {this.state.option === 1 && <FilterPanelContainer />}
        {this.state.option === 2 && <LegendPanelContainer />}
      </div>
    );
  }

  hideSwitch = () => {
    this.setState({
      hidden: !this.state.hidden,
    })
  }

  switchPanel = (option) => {
    console.log(option);
    if (option === this.state.option) {
      this.setState({
        hidden: !this.state.hidden,
      });
    } else {
      this.setState({
        option,
        hidden: false,
      })
    }

  }

  render() {
//
    return (
      <div>
        <div className="menupanel">
          <img src="groundeyelogo2.png" className="menupanel-logo" />
          <div className="menupanel-buttons">
            <div onClick={this.switchPanel.bind(this, 0)}>

              {this.state.option === 0 && !this.state.hidden ?
                <img src="search.png" className="menupanel-buttons-search-active" /> :
                <img src="search.png" className="menupanel-buttons-search" />

              }
            </div>
            <div onClick={this.switchPanel.bind(this, 1)}>
              {this.state.option === 1 && !this.state.hidden ?
                <img src="eye2.png" onClick={this.switchPanel.bind(this, 1)} className="menupanel-buttons-list-active" /> :
                <img src="eye2.png" onClick={this.switchPanel.bind(this, 1)} className="menupanel-buttons-list" />
              }
            </div>
            <div onClick={this.switchPanel.bind(this, 2)}>
              {this.state.option === 2 && !this.state.hidden ?
                <img src="legend.svg" onClick={this.switchPanel.bind(this, 2)} className="menupanel-buttons-legend-active" /> :
                <img src="legend.svg" onClick={this.switchPanel.bind(this, 2)} className="menupanel-buttons-legend" />
              }


            </div>
            {!this.state.hidden && <img src="hide.png"  onClick={this.hideSwitch} className="menupanel-buttons-hide" /> }
            {this.state.hidden && <img src="show.png" onClick={this.hideSwitch} className="menupanel-buttons-hide" /> }
          </div>
        </div>
        {this.tab()}
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
    filters: state.airportVehicles.filters,
    //vehiclesSearchValue: state.airportVehicles.vehiclesSearchValue,
  };
};

const mapDispatchToProps = {
  zoomViewport,
  panViewport,
  airportVehiclesAddFilter,
  airportVehiclesRemoveFilter,
  updateTooltipId
};

export const MenuPanelContainer = connect(mapStateToProps, mapDispatchToProps)(MenuPanel);


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
