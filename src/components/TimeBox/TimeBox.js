import React, {Component} from 'react';

export class TimeBox extends Component{

  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  appendZero(x) {
    return x < 10 ? ('0' + x) : x;
  }

  render() {
    //const UTCStringDate = (this.state.date.toISOString()).substring(0, 19).replace('T', ' ').replace('-','/').replace('-','/');
    const date = this.state.date;
    const hours = this.appendZero(date.getUTCHours());
    const minutes = this.appendZero(date.getUTCMinutes());
    const seconds = this.appendZero(date.getUTCSeconds());
    const dateString = `${hours}:${minutes}:${seconds}`;
    return (
      <div className="timebox">
      	<span className="timebox-utc-text">UTC</span><span>{dateString}</span>
      </div>
    );
  }
};


export const TimeBoxContainer = (TimeBox);
