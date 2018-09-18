import React, { Component } from 'react';
import bg from './pool_table.png';
import './App.css';
import { AirportContainer } from './Airport.js';
import { connect } from "react-redux";

import merge from './merge_layers.js';
//console.log('merged');
//merge();

export class App extends Component {
  render() {
    let style = {backgroundImage: 'url("' + bg + '")'}
    return (
      <div className="App" style={style}>
        {/*<div className="App-header">
          <h1 className="App-title">Lotnisko</h1>
        </div>*/}
        <AirportContainer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = { };

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
