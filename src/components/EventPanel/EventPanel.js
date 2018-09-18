import React, {Component} from 'react';
import { connect } from "react-redux";
import { eventsDismissAlert, zoomViewport, updateTooltipId } from '../../actions';
import { getFilteredAirportVehicles, getAirportVehicleWithId } from '../../selectors';


class EventPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null,
      focused: null,
    };

    this.classNames = {
      'ALERT': {
        empty: 'eventpanel-alert-empty',
        noempty: 'eventpanel-alert-not-empty',
        active: 'eventpanel-alert-active',
      },
      'WARNING': {
        empty: 'eventpanel-warning-empty',
        noempty: 'eventpanel-warning-not-empty',
        active: 'eventpanel-warning-active',
      },
      'NOTIFICATION': {
        empty: 'eventpanel-notification-empty',
        noempty: 'eventpanel-notification-not-empty',
        active: 'eventpanel-notification-active',
      },
    };
  }

  buttonClick(type, propsField) {
    if (this.state.active === type) {
      this.setState({
        active: null
      });
    } else if (this.props[propsField].length > 0) {
      this.setState({
        active: type
      });
    }
  }

  alertButtonClick = () => {
    this.buttonClick('ALERT', 'alerts');
  }

  warningButtonClick = () => {
    this.buttonClick('WARNING', 'warnings');
  }

  notificationButtonClick = () => {
    this.buttonClick('NOTIFICATION', 'notifications');
  }

  getClassName(field, type) {
    if (this.props[field].length === 0) {
      return this.classNames[type].empty;
    }
    if (this.state.active === type) {
      return this.classNames[type].active;
    }
    else return this.classNames[type].noempty;
  }

  getAlarmClassName = () => {
    return this.getClassName('alerts', 'ALERT');
  }

  getWarningClassName = () => {
    return this.getClassName('warnings', 'WARNING');
  }

  getNotificationClassName = () => {
    return this.getClassName('notifications', 'NOTIFICATION');
  }

  focusEvent = index => {
    this.setState({
      focused: index,
    })
  }

  dismissAlert = () => {
    if (this.state.focused != null) {
      this.props.eventsDismissAlert(this.state.focused);
      this.setState({
        focused: null,
      });
    }
  }

  showObject = () => {
    if (this.state.focused != null) {
      let objectId = this.props.alerts[this.state.focused].objectId;
      let v = getAirportVehicleWithId(
        this.props.airportVehicles,
        objectId
      );
      let coordinates = {
        longitude: v.position[0],
        latitude: v.position[1],
      }
      this.props.updateTooltipId(objectId);
      this.props.zoomViewport(coordinates);
    }
  }

  eventsInfo() {
    if (this.state.active == null) return null;
    return (
      <div className="events-info">
        <div className="events-info-title">
          <span>Alerts</span>
        </div>
        <div className="events-info-body">
          <div className="events-event-header">
            <div>
              <span className="events-event-title">
                event nr {this.state.focused != null && this.props.alerts[this.state.focused].eventId}
              </span>
              <span className="events-dismiss" onClick={this.dismissAlert}>dismiss</span>
            </div>
            <div style={{display:"flex"}} onClick={this.showObject}>
              <div className="events-show-eye-frame">
                <img className="events-show-eye" src='eye.png'/>
              </div>
              <span className="events-show">show the object</span>
            </div>
          </div>

          <div className="events-list">
            {this.props.alerts.map((e, index) => {
              let className = null;
              if (index === this.state.focused) {
                className = "events-list-focused";
              } else {
                className="events-list-notfocused";
              }
              return (
                <div className={className}>
                  <span onClick={this.focusEvent.bind(this, index)}>{e.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.eventsInfo()}
        <div className="eventpanel">
          <span className="eventpanel-title">EVENTS POPUP</span>
          <div className="eventpanel-status">
            <div>
              <div onClick={this.alertButtonClick} className={this.getAlarmClassName()}>{this.props.alerts.length}</div>
              <div onClick={this.warningButtonClick} className={this.getWarningClassName()}>{this.props.warnings.length}</div>
              <div onClick={this.notificationButtonClick} className={this.getNotificationClassName()}>{this.props.notifications.length}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    alerts: state.events.alerts,
    warnings: state.events.warnings,
    notifications: state.events.notifications,
    airportVehicles: state.airportVehicles.airportVehicles
  };
};

const mapDispatchToProps = {
  eventsDismissAlert, zoomViewport, updateTooltipId
};

export const EventPanelContainer = connect(mapStateToProps, mapDispatchToProps)(EventPanel);
