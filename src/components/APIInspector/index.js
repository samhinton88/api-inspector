import React, { Component } from 'react';
import './style.css';
import axios from 'axios';

function getAtLookup(lookup, object) {
  let candidate = object;

  for (let i=0; i<lookup.length; i++) {
    console.log('checking lookup', lookup[i])


    candidate = candidate[lookup[i]]

    console.log('found', candidate)
  }

  return candidate;
}

class APIInspector extends Component {
  state = {
    value: '',
    response: "",
    lookup: null,
    history: [],
    mapperFunc: null
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.fetch(this.state.value);
    this.setState({value: ''});
  }

  fetch = async (uri) => {
    const { mapperFunc } = this.state;

    const res = await axios.get(uri);

    console.log('raw response', res)

    const lookup  = this.state.lookup
      ? this.state.lookup.split('.')
      : [];
    console.log('full lookup as array before process', lookup)
    const data = getAtLookup(lookup, res)

    if (Array.isArray(data)) {

    }

    const response = {
      data,
      keys: data ? Object.keys(data) : undefined
    };

    console.log('response after lookup', response)

    this.setState({response, history: [...this.state.history, {uri, lookup}]});
  }

  render() {
    console.log(this.state)

    return (
      <div className='api-inspector'>
        <div className='api-inspector-form-container'>
          <h2>URI Inspector</h2>
          <form className='api-inspector-form' onSubmit={this.handleSubmit}>
            <input placeholder='uri' onChange={(e) => this.setState({value: e.target.value}) }/>
            <input placeholder='lookup' onChange={(e) => this.setState({lookup: e.target.value}) }/>
            <input placeholder='if array is found, run this map' onChange={(e) => this.setState({mapperFunc: e.target.value}) }/>
            <button type='submit' >Fetch</button>
          </form>

        </div>

        <div className='response-inspector-container'>
          <div className='response-inspector'>
            <div className='response-inspector-key-container'>

            </div>
            {this.state.response ? JSON.stringify(this.state.response.keys) : ''}
          </div>
        </div>
      </div>
    )
  }
}

export default APIInspector;
