import React, { Component } from 'react';
import './style.css'

class KeyButton extends Component {

  render() {
    const { data } = this.props;

    return (
      <div className='key-button'>
        {data}
      </div>
    )
  }
}

export default KeyButton;
