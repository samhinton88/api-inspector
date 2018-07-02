import React, { Component } from 'react';
import './style.css';

class HistoryItem extends Component {

  render() {
    const { data: { uri }, style } = this.props;

    return(
      <div className='history-item' style={style} >
        <div className='verb-type'>GET</div>{uri || 'empty'}
      </div>
    )
  }
}

export default HistoryItem;
