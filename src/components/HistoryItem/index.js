import React, { Component } from 'react';
import './style.css';

class HistoryItem extends Component {

  render() {
    const { data } = this.props;

    return(
      <div className='history-item'>
        {JSON.stringify(data)}
      </div>
    )
  }
}

export default HistoryItem;
