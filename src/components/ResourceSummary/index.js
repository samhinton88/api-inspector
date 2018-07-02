import React, { Component } from 'react';
import './style.css'

class ResourceSummary extends Component {

  renderKeyVals = () => {
    const { object, onClick } = this.props;

    if(!object) { return }

    if(typeof object === 'string') {
      return <div>String: {object}</div>
    }

    if(typeof object === 'number') {
      return <div>Number: {object}</div>
    }


    return Object.keys(object).map((k, i) => {
      const type = typeof object[k];
      return (
        <div className='resource-summary-item' onClick={() => onClick(k)}>
          <div className='key-button' style={{animationName: 'fadein', animationDuration: `${i}s`}}>{k}:</div>
          <div className='type-container'>{type}</div>
          <div className='stringify-container'>{JSON.stringify(object[k])}</div>
        </div>
      )
    })
  }

  render() {

    return (
      <div className='resource-summary'>
        {this.renderKeyVals()}
      </div>
    )
  }
}

export default ResourceSummary;
