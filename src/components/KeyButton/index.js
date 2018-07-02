import React, { Component } from 'react';
import './style.css'

class KeyButton extends Component {
  state = {
    arrIndex: 0,
    indexShowing: false
  }


  render() {
    const {
      data,
      onClick,
      resourceName,
      calcWidth,
      calcHeight,
      delay,
      summaryMode
    } = this.props;


    return (
      <div
        className='key-button'
        onClick={onClick}
        style={
          {
            width: calcWidth,
            height: calcHeight,
            animationDelay: `${delay}s`,
            animationDuration: '0.5s',
            animationName: 'fadein',
            cursor: summaryMode ? 'auto': ''
          }
        }
      >
        {summaryMode ? JSON.stringify(data): resourceName}
        {/*{this.renderArrayNav()}*/}
      </div>
    )
  }
}

export default KeyButton;
