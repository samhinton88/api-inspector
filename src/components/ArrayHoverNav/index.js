import React, { Component } from 'react';
import './style.css';

class ArrayHoverNav extends Component {
  state = {
    arrayNavRef: React.createRef(),
    background: null,
    hovering: false,
    mouseX: null,
    y: null
  }

  renderBackground = () => {
    const { percentagePos } = this.state;

    return { background: `linear-gradient(90deg, rgba(48, 205, 201, 1) ${percentagePos -1}%, white ${percentagePos}%, rgba(48, 205, 201, 1) ${percentagePos + 1}%)`}
  }

  renderPercentage = () => {
    const { arrayNavRef, mouseX} = this.state;

    if (!arrayNavRef.current) { return }

    const { x, y, width } = arrayNavRef.current.getBoundingClientRect();

    const xpos = mouseX -  x;

    const percentagePos = (xpos / width) * 100;

    return percentagePos;
  }

  calcPerceivedArrPos = () => {

  }

  handleMouseMove = (e) => {
    const { cb } = this.props;

    this.setState(
            {
              mouseX: e.clientX,
              percentagePos: this.renderPercentage()
            })

    cb(this.renderPercentage())
  }

  render() {



    return (
      <div
        className='array-hover-nav'
        style={this.renderBackground()}
        ref={this.state.arrayNavRef}
        onMouseOver={() => this.setState({hovering: true})}
        onMouseLeave={() => this.setState({hovering: false})}
        onMouseMove={this.handleMouseMove}
      >

      </div>
    )
  }
}

export default ArrayHoverNav;
