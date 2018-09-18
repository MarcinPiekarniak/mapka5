import React, {Component} from 'react';
import DeckGL, {ScatterplotLayer} from 'deck.gl';
import MapLayer from '../../MapLayer.js';
import { connect } from "react-redux";
import { airportVehiclesClearFilters, zoomViewport, panViewport, updateTooltipId, airportVehiclesAddFilter, airportVehiclesRemoveFilter} from '../../actions';
import { getFilteredAirportVehicles } from '../../selectors';
import { typeToIcon, getDimensions} from '../../icons.js'
import SearchBox from './SearchBox'

class FilterPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      field: '',
      dropdownFieldActive: false,
      dropdownValueActive: false,
      isHighlightField: false,
      isHighlightValue: false,
    }
  }

  addFilter = () => {
    if (this.state.field !== '' && this.state.value !== '') {
      this.props.airportVehiclesAddFilter({
        field: this.state.field,
        value: this.state.value,
      });
      this.setState({
        value: '',
        field: '',
      });
    }
  }

  removeFilter = index => {
    this.props.airportVehiclesRemoveFilter(index);
  }

  setField = (field) => {
    this.setState({
      field,
      value: '',
      dropdownFieldActive: false,
      highlightField: false,
    });
  }

  hideFieldDropdown = () => {
    this.setState({
      dropdownFieldActive: false,
      highlightField: false,
    })
  }

  searchBoxForField = () => {
    if (this.state.dropdownFieldActive && this.state.mode === 'FIELD') {
      let position = {left:"30px", top:"135px"};
      return (
        <SearchBox
          position = {position}
          fields = {['id', 'name', 'type']}
          onSelect = {this.setField}
          hideDropdown = {this.hideFieldDropdown} />
        );
    } else {
      return null;
    }
  }

  showDropdownForField = () => {
    this.setState({
      dropdownFieldActive: true,
      mode: 'FIELD',
      highlightField: true,
    });
  }

  highlightField = () => {
    console.log('woah');

    this.setState({highlightField: true});
  }

  unhighlightField = () => {
    console.log('leaving');
    if (this.state.dropdownFieldActive) return;
    this.setState({highlightField: false});
  }



  setValue = (value) => {
    this.setState({
      value,
      dropdownValueActive: false,
      highlightValue: false,
    });
  }

  hideValueDropdown = () => {
    this.setState({
      dropdownValueActive: false,
      highlightValue: false,
    })
  }


  searchBoxForValue = () => {
    if (this.state.dropdownValueActive && this.state.mode === 'VALUE' && this.state.field !== '') {
      let fields = this.props.airportVehicles.map(x => x[this.state.field]);
      console.log(fields);
      let position = {left:"30px", top:"220px"};
      return (
        <SearchBox
          position={position}
          fields = {fields}
          onSelect = {this.setValue}
          hideDropdown = {this.hideValueDropdown} />
        );
    } else {
      return null;
    }
  }

  showDropdownForValue = () => {
    if (this.state.field !== '') {
      this.setState({
        dropdownValueActive: true,
        mode: 'VALUE',
      });
    }

    //
  }

  highlightValue = () => {
    this.setState({highlightValue: true});
  }

  unhighlightValue = () => {
    if (this.state.dropdownValueActive) return;
    this.setState({highlightValue: false});
  }

  trashIcon() {
    return (
      <svg viewBox="0 0 64 64" width="16px" height="16px" class="data-ex-icons-trash " data-tip="true" data-for="delete_vo18yorx" currentItem="false" style={{"fill": "gray"}}>
        <path d="M51.4,13.9v1.6c0,0.9-0.7,1.6-1.6,1.6H13.6c-0.9,0-1.6-0.7-1.6-1.6v-1.6c0-0.9,0.7-1.6,1.6-1.6h9 c0.9,0,1.6-0.7,1.6-1.6C24.3,9.7,25.1,9,26,9h11.5c0.9,0,1.6,0.7,1.6,1.6c0,0.9,0.7,1.6,1.6,1.6h9C50.7,12.3,51.4,13,51.4,13.9z" />
        <path d="M40.8,50.1l0.8-25.4h-3.3l-0.8,25.4H40.8z M30.1,50.1h3.3V24.7h-3.3V50.1z M26,50.1l-0.8-25.4h-3.3l0.8,25.4H26 z M44.9,55H18.5c-0.9,0-1.6-0.7-1.6-1.6l-1.5-31.2c0-0.9,0.7-1.7,1.6-1.7h29.4c0.9,0,1.7,0.8,1.6,1.7l-1.5,31.2 C46.5,54.3,45.8,55,44.9,55z" />
      </svg>
    );
  }


  render() {
    let backgroundField = 'rgba(59, 74, 77)';
    if (this.state.highlightField === true) {
      backgroundField = 'rgba(79, 94, 97)';
    }

    let backgroundValue = 'rgba(59, 74, 77)';
    if (this.state.highlightValue === true) {
      backgroundValue = 'rgba(79, 94, 97)';
    }

    return (
      <div className="menutab">


        <div className="menupanel-content">

        <div className="menutab-title">
          <p>FILTERS</p>
        </div>

          <div>
            <div className="menutab-text">
              <span
                onClick={this.showDropdownForField}
                style={{cursor: 'pointer'}}
                onMouseEnter={this.highlightField}
                onMouseLeave={this.unhighlightField}>
                  FIELD
              </span>
            </div>
            <div className="filter-wrapper">
              <div
                className="search-input"
                onClick={this.showDropdownForField}
                onMouseEnter={this.highlightField}
                onMouseLeave={this.unhighlightField}
                style={{cursor: 'pointer', background: backgroundField}}>
                {this.state.field === '' ? 'select field' : this.state.field}
              </div><br/>
              {this.searchBoxForField()}
            </div>
         </div>

          <div >
            <div><div className="menutab-text">
              <span
                style={{cursor: 'pointer'}}
                onClick={this.showDropdownForValue}
                onMouseEnter={this.highlightValue}
                onMouseLeave={this.unhighlightValue}>
                VALUE
              </span>
            </div>
            <div className="filter-wrapper">
              <div
                className="search-input"
                style={{cursor: 'pointer'}}
                onClick={this.showDropdownForValue}
                onMouseEnter={this.highlightValue}
                onMouseLeave={this.unhighlightValue}
                style={{cursor: 'pointer', background: backgroundValue}}>
                {this.state.field === '' ? 'select field first' : (this.state.value === '' ? 'select value' : this.state.value)}
              </div><br/>
              {this.searchBoxForValue()}
            </div></div>
          </div>
        </div>
        <div style={{"text-align": "left", "margin-bottom": "5px", height: "29px",}}>
          {this.state.field !== '' && this.state.value !== '' && <div onClick={this.addFilter} className="add-filter-button">

            + Add
          </div>}

          {this.props.filters.length > 0 && <div onClick={this.props.airportVehiclesClearFilters} className="clear-filter-button">

            {this.trashIcon()}  Cancel all
          </div>}

        </div>
        <div className="filter-list">
          {this.props.filters.map((x, i) => {
            const removeFilter = () => this.removeFilter(i);
            return (
              <div onClick={removeFilter} className="filter-list-item">

                {this.trashIcon()} {x.value}
              </div>
            )
          })}
        </div>
      </div>
    );
  }
};
      /*
onChange={ this.handleSearchChange }


      <div className="searchpanel">
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



      </div>*/



const mapStateToProps = state => {
  return {

    airportVehicles: state.airportVehicles.airportVehicles,
    filters: state.airportVehicles.filters,
    //vehiclesSearchValue: state.airportVehicles.vehiclesSearchValue,
  };
};

const mapDispatchToProps = {
  zoomViewport,
  panViewport,
  airportVehiclesAddFilter,
  airportVehiclesRemoveFilter,
  updateTooltipId,
  airportVehiclesClearFilters
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
