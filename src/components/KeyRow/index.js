import React, { Component } from 'react';
import './style.css';

class KeyRow extends Component {

  render() {
    console.log('rendering keyrow')
    const childCount = this.props.children.length;
    console.log('childCount', childCount)

    const cssGridColumns = { gridTemplateColumns: 'auto '.repeat(childCount) }
    console.log(cssGridColumns)
    return (
      <div
        className='key-row'
        style={cssGridColumns}
      >
        {this.props.children}
      </div>
    )
  }
}

export default KeyRow;
