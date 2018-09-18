import React, {Component} from 'react';
import DeckGL, {ScatterplotLayer} from 'deck.gl';
import MapLayer from '../../MapLayer.js';
import { connect } from "react-redux";
import { zoomViewport, panViewport, updateTooltipId, airportVehiclesAddFilter, airportVehiclesRemoveFilter} from '../../actions';
import { getFilteredAirportVehicles } from '../../selectors';
import { typeToIcon, getDimensions} from '../../icons.js'

class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehiclesSearch: '',
      displayedVehicles: this.props.airportVehicles,
      filterValue: '',
      filterField: 'id',
    //  suggestionActive: false,
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

/*
  searchDropdown = () => {
    //if (!this.state.suggestionActive) return null;
    return (
      <div className="search-dropdown">
      </div>
    );
  }

  onFocus = () => {
    this.setState({
     suggestionActive: true,
    });
  }

  onBlur = () => {
    this.setState({
      suggestionActive: false,
    });
  }

  onFocus={ this.onFocus }
  onBlur={ this.onBlur }

*/
  render() {

    return (
      <div className="menutab">

        <div className="menupanel-content">

          <div className="menutab-title">
            <p>SEARCH</p>
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

          <div className="searchpanel-list-header">
            <div style={{width:"27px", "text-align":"center", padding:"1px"}}>
              <span>ID</span>
            </div>
            <div style={{width:"126px", "text-align":"center", padding:"1px"}}>
              <span>NAME</span>
            </div>
            <div style={{width:"50px", "text-align":"center", padding:"1px"}}>
              <span>TYPE</span>
            </div>
          </div>
          <div className="searchpanel-list">
            <table >
              <tbody>
                {this.state.displayedVehicles.map((x, index) => {
                  let {width, height} = getDimensions(x.type);
                  width = width * 0.25;
                  height = height * 0.25;
                  //let background = index % 2 ? "rgba(100, 100, 100, 0.5)" : "rgba(150, 150, 150, 0.5)"
                  let background = "rgba(59, 74, 77, 1)";
                  let zoomTo = this.zoomTo.bind(this, index);
                  let panTo = this.panTo.bind(this, index);
                  let showTooltip = this.showTooltip.bind(this, index);
                  return (
                    <tr onClick={showTooltip} className="searchpanel-list-item">

                      <td style={{width: "23px", height:"26px"}}>{x.id}</td>
                      <td style={{width: "126px", height:"26px"}}>{x.name}</td>
                      {/*<td style={{width: "123px", height:"20px"}}>{x.type}</td>*/}
                      <td style={{width: "50px", height:"26px"}}><img src={typeToIcon[x.type]} width={width} height={height}/></td>
                      <td style={{width: "36px", height:"26px"}} onClick={zoomTo}>Zoom</td>
                      <td style={{width: "36px", height:"26px"}} onClick={panTo}>Pan</td>
                    </tr>);
                })}
              </tbody>
            </table>
          </div>
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

export const SearchPanelContainer = connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
