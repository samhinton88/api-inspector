import React, { Component } from 'react';
import './style.css'

class KeyButton extends Component {
  state = {
    arrIndex: 0,
    indexShowing: false
  }

  renderArrayNav = () => {
    const { isArray, indexShowing, arrIndex, onForward, onBack } = this.props;

    if(!isArray) { return }

    return (
      <div className='array-index-nav'>
        <span onClick={onBack}>{"<"}</span>
          {indexShowing ? arrIndex : 'i'}
        <span onClick={onForward}>{">"}</span>
      </div>
    )
  }

  render() {
    const { data, onClick, isArray } = this.props;

    return (
      <div
        className='key-button'
        onClick={onClick}
      >
        {data}
        {this.renderArrayNav()}
      </div>
    )
  }
}

export default KeyButton;
