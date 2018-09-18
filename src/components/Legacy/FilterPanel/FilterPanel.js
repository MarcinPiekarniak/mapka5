import React, {Component} from 'react';
import DeckGL, {ScatterplotLayer} from 'deck.gl';
import MapLayer from '../../MapLayer.js';
import { connect } from "react-redux";
import { zoomViewport, panViewport, updateTooltipId, airportVehiclesAddFilter, airportVehiclesRemoveFilter} from '../../actions';
import { getFilteredAirportVehicles } from '../../selectors';
import { typeToIcon, getDimensions} from '../../icons.js'

class FilterPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehiclesSearch: '',
      displayedVehicles: this.props.airportVehicles,
      filterValue: '',
      filterField: 'id',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.airportVehicles != nextProps.airportVehicles) {
      this.setState({
        displayedVehicles: nextProps.airportVehicles.filter(vehicle => {
          const {id, name, type} = vehicle;
          return (
            String(id).toLowerCase().includes(this.state.vehiclesSearch) ||
            name.toLowerCase().includes(this.state.vehiclesSearch) ||
            type.toLowerCase().includes(this.state.vehiclesSearch)
          );
        }),
      });
    }
  }

  panTo(index) {
    let coordinates = {
      longitude: this.state.displayedVehicles[index].position[0],
      latitude: this.state.displayedVehicles[index].position[1],

    }
    this.props.panViewport(coordinates);
    this.props.updateTooltipId(this.state.displayedVehicles[index].id);
  }

  zoomTo(index) {
    let coordinates = {
      longitude: this.state.displayedVehicles[index].position[0],
      latitude: this.state.displayedVehicles[index].position[1],

    }
    this.props.zoomViewport(coordinates);
    this.props.updateTooltipId(this.state.displayedVehicles[index].id);
  }


  showTooltip(index) {
    this.props.updateTooltipId(this.state.displayedVehicles[index].id);
  }

  handleSearchChange = e => {
    const displayedVehicles = this.props.airportVehicles.filter(vehicle => {
      const {id, name, type} = vehicle;
      return (
        String(id).toLowerCase().includes(e.currentTarget.value) ||
        name.toLowerCase().includes(e.currentTarget.value) ||
        type.toLowerCase().includes(e.currentTarget.value)
      );
    });
    this.setState({
      displayedVehicles: displayedVehicles,
      vehiclesSearch: e.currentTarget.value
    });
  };

/*
  handleFilterChange = e => {

    this.props.airportVehiclesFilter(e.currentTarget.value);
  };
*/
  handleFilterValueChange = e => {
    console.log(e.currentTarget.value);
    this.setState({
      filterValue: e.currentTarget.value,
    });
  }

  handleFilterTypeChange = e => {
    console.log(e.currentTarget.value);
    this.setState({
      filterField: e.currentTarget.value,
    });
  }

  addFilter = e => {
    this.props.airportVehiclesAddFilter({
      field: this.state.filterField,
      value: this.state.filterValue
    });
    this.setState({
      filterValue: '',
      filterField: 'id',
    });
  }

  removeFilter = index => {
    console.log('REMOVING ');
    console.log(index);
    this.props.airportVehiclesRemoveFilter(index);
  }

  render() {

    return (
      <div className="filterpanel">
        <div style={{"text-align": "left",}}>
          <input
            type="text"
            placeholder="Search..."
            value={this.state.vehiclesSearch}
            onChange={this.handleSearchChange}
          />
        </div>
        <div className="filterpanel-table">
          <table >
          <tr><td>id</td><td>name</td><td>type</td></tr>
          {this.state.displayedVehicles.map((x, index) => {
            let {width, height} = getDimensions(x.type);
            width = width * 0.25;
            height = height * 0.25;
            let background = index % 2 ? "rgba(100, 100, 100, 0.5)" : "rgba(150, 150, 150, 0.5)"
            let zoomTo = this.zoomTo.bind(this, index);
            let panTo = this.panTo.bind(this, index);
            let showTooltip = this.showTooltip.bind(this, index);
            return (
              <tr onClick={showTooltip} style={{"font-size": "10px", background: background}}>
                <td style={{width: "50px", height:"20px"}}><img src={typeToIcon[x.type]} width={width} height={height}/></td>
                <td style={{width: "43px", height:"20px"}}>{x.id}</td>
                <td style={{width: "134px", height:"20px"}}>{x.name}</td>
                <td style={{width: "123px", height:"20px"}}>{x.type}</td>
                <td style={{width: "40px", height:"20px"}} onClick={zoomTo}>Zoom</td>
                <td style={{width: "40px", height:"20px"}} onClick={panTo}>Pan</td>
              </tr>);
          })}
          </table>
        </div>
        <div style={{"text-align": "left",}}>
          <select value={this.state.filterField} onChange={this.handleFilterTypeChange} style={{height:"21px"}}>
            <option value="id">id</option>
            <option value="name">name</option>
            <option value="type">type</option>
          </select>

          <input
            type="text"
            placeholder="filter..."
            value={this.state.filterValue}
            onChange={this.handleFilterValueChange}
          />

          <button onClick={this.addFilter}>+</button>
        </div>
        <div className="filterpanel-filters">
          {this.props.filters.map((x, i) => {
            const removeFilter = () => this.removeFilter(i);
            return (
              <div className="filterpanel-filter">
                <span style={{width: "58px", display: "block"}}>{x.field}</span>
                <span style={{width: "173px", display: "block"}}>{x.value}</span>
                <button style={{width: "23.8px"}} onClick={removeFilter}>-</button>
              </div>
            )
          })}
        </div>



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

export const FilterPanelContainer = connect(mapStateToProps, mapDispatchToProps)(FilterPanel);


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
