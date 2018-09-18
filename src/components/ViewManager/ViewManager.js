import { resetViewport, zoomInViewport, zoomOutViewport } from '../../actions';
import React, {Component} from 'react';
import { connect } from "react-redux";

export class ViewManager extends Component {

  resetViewport() {
    this.props.resetViewport();
  }

  zoomInViewPort() {
    this.props.zoomInViewport();
  }

  zoomOutViewPort() {
    this.props.zoomOutViewport();
  }

  render() {
    return (
      <div>
        <div className="viewmanager-zoom-out-holder">
          <img src="minus.png" className="viewmanager-zoom-content" onClick={this.zoomOutViewPort.bind(this)}/>
        </div>
        <div className="viewmanager-zoom-in-holder">
          <img src="plus.png" className="viewmanager-zoom-content" onClick={this.zoomInViewPort.bind(this)}/>
        </div>
        <div className="viewmanager-zoom-reset-holder">
          <img src="default.png" className="viewmanager-zoom-content" onClick={this.resetViewport.bind(this)}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = { resetViewport, zoomInViewport, zoomOutViewport};

export const ViewManagerContainer = connect(mapStateToProps, mapDispatchToProps)(ViewManager);
