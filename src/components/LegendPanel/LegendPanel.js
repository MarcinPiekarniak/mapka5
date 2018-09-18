import React, {Component} from 'react';
import DeckGL, {ScatterplotLayer} from 'deck.gl';
import { connect } from "react-redux";
import { typeToIcon, getDimensions} from '../../icons.js'

class LegendPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      displayedIcons: Object.keys(typeToIcon),
    };
  }

  handleSearchChange = e => {
    const displayedIcons = Object.keys(typeToIcon).filter(icon => {
      return (
        String(icon).toLowerCase().includes(e.currentTarget.value)
      );
    });
    this.setState({
      displayedIcons: displayedIcons,
      search: e.currentTarget.value
    });
  };

  render() {

    return (

      <div className="menutab">

        <div className="menupanel-content">

          <div className="menutab-title">
            <p>LEGEND</p>
          </div>

          <div className="search-input-wrapper">
            <input
              className="search-input"
              type="text"
              placeholder="Search..."
              value={ this.state.vehiclesSearch }
              onChange={ this.handleSearchChange }
            />
          </div>

          <div className="legendpanel-list-header">
            <div style={{width:"169px", "text-align":"center", padding:"1px"}}>
              <span>TYPE</span>
            </div>
            <div style={{width:"48px", "text-align":"center", padding:"1px"}}>
              <span>ICON</span>
            </div>
          </div>

          <div className="legendpanel-list-wrapper">
            <div className="legendpanel-list">
              <table>
                <tbody>
                  {this.state.displayedIcons.map(icon => {
                    let {width, height} = getDimensions(icon);
                    width = width * 0.25;
                    height = height * 0.25;
                    //let background = index % 2 ? "rgba(100, 100, 100, 0.5)" : "rgba(150, 150, 150, 0.5)"
                    let background = "rgba(59, 74, 77, 1)";
                    return (
                      <tr className="legendpanel-list-item">
                        <td style={{width: "165px", height:"26px"}}>
                          {icon}
                        </td>
                        <td style={{width: "48px", height:"26px"}}>
                          <img src={typeToIcon[icon]} width={width} height={height}/>
                        </td>
                        <td style={{width: "66px", height:"26px",cursor: "pointer"}}>
                          Change Icon
                        </td>
                      </tr>);
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {

};

const mapDispatchToProps = {

};

export const LegendPanelContainer = connect(mapStateToProps, mapDispatchToProps)(LegendPanel);


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
