import React, {Component} from 'react';
import onClickOutside from 'react-onclickoutside';

class SearchBox extends Component {

  constructor(props) {
    super(props);
    //this.props.fields - array
    this.state = {
      searchValue: '',
    }
  }

  handleSearchValueChange = e => {
    this.setState({
      searchValue: e.currentTarget.value,
    });
  }

  getFilteredFields() {
    const searchValue = this.state.searchValue.toLowerCase();
    //const fields = ['id', 'name', 'type'];

    return this.props.fields.filter(f => {
      return String(f).toLowerCase().includes(searchValue);
    });
  }

  handleClickOutside = () => {
    console.log('outside!');
    this.props.hideDropdown();
  }

  render() {
    let f = (field) => this.props.onSelect(field);
    let styles = {

    };
    return (
      <div
        className="search-dropdown"
        style={{
          position: "absolute",
          left: this.props.position.left,
          top: this.props.position.top,
        }}>
        <input
          className="dropdown-search-input"
          type="text"
          value={ this.state.searchValue }
          onChange= { this.handleSearchValueChange }
        />
        <div className="dropdown-search-input-icon">
          <svg viewBox="0 0 64 64" width="18px" height="18px" style={{fill: "currentcolor", color:"#8A94A5"}}>
            <path d="M56.74,53.21l-3.53,3.53a1.67,1.67,0,0,1-2.35,0L40.21,46.09A24.32,24.32,0,0,0,46.1,40.2L56.74,50.85A1.66,1.66,0,0,1,56.74,53.21Z"></path>
            <path d="M26.22,6.78A19.46,19.46,0,1,0,42.6,36.7a19.18,19.18,0,0,0,3.08-10.47A19.45,19.45,0,0,0,26.22,6.78ZM11.64,26.22A14.58,14.58,0,1,1,26.22,40.81,14.6,14.6,0,0,1,11.64,26.22Z"></path>
          </svg>
        </div>
        <div className="dropdown-search-list">
        {this.getFilteredFields().map(field => {
          return (
            <div className="dropdown-search-list-item" onClick={f.bind(this, field)}>
              <span >
                  {field}<br/>
              </span>
            </div>
          );
        })}
        </div>
      </div>
    );
  }
}



export default onClickOutside(SearchBox);
