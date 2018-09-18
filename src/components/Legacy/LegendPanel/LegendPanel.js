import { resetViewport, zoomInViewport, zoomOutViewport } from '../../actions';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { typeToIcon, getDimensions} from '../../icons.js'
export class LegendPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  switch() {
    console.log('woah');
    this.setState({
      open: !this.state.open,
    });
  }

  legend() {
    if (this.state.open) {
      return (
        <div className="legend">
          <table>
            {Object.keys(typeToIcon).map(icon => {
              let {width, height} = getDimensions(icon);
              width = width * 0.5;
              height = height * 0.5;
              return (
                <tr style={{background: "#fff"}}>
                  <td><img src={typeToIcon[icon]} width={width} height={height}/></td>
                  <td style={{color: "#000"}}>{icon}</td>
                </tr>
              );

            })}

          </table>
        </div>
      )
    } else {
      return null;
    }
  }

  render() {
    return (
      <div>
        <button className="legend-button" onClick={this.switch.bind(this)}>Legend</button>
        {this.legend()}
      </div>
    );
  }
}
