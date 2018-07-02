import React, { Component } from 'react';
import './style.css';

import KeyButton from '../KeyButton';
import KeyRow from '../KeyRow';
import ResourceSummary from '../ResourceSummary';

class EndPointModel extends Component {

  renderValues = () => {
    const { object, onClick, summaryMode, isArray, perceivedArrPos = 0 } = this.props;

    if (!object) { return }

    if (isArray) {

      return (
        <ResourceSummary
          object={object}
          index={perceivedArrPos}
          onClick={(k) => onClick(perceivedArrPos, k)}
          isArray
        />
      )
    }

    if (typeof object === 'string' || typeof object === 'number') {
      return (
        <ResourceSummary
          object={object}
        />
      )
    }

    if (typeof object === 'number') {
      console.log('is string ')
      return (
        <KeyButton summaryMode={true} data={object} />
      )
    }

    // decide grid structure
    const keys = Object.keys(object);

    const segments = [];

    for (let i=0; i < keys.length; i+=3 ) {
      segments.push(keys.slice(i, i+3))
    }

    return segments.map((seg, i) => {
      const calcHeight = 400 / (segments.length + 1);

      const row = seg.map((key, j) => {
        const calcWidth = 500 / (seg.length + 0.5);

        const delay = (j + (i * 3)) * 0.1;

        return (
          <KeyButton
            data={object}
            resourceName={key}
            onClick={()=> onClick(key)}
            calcWidth={calcWidth}
            calcHeight={calcHeight}
            delay={delay}
            summaryMode={summaryMode}
          />
        )
      })

      return (
        <KeyRow>
          {row}
        </KeyRow>
      )
    })
  }

  render() {


    return (
      <div className='end-point-model'>
        {this.renderValues()}
      </div>
    )
  }
}

export default EndPointModel;
