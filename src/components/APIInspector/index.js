import React, { Component } from 'react';
import './style.css';
import axios from 'axios';
import KeyButton from '../KeyButton';
import HistoryItem from '../HistoryItem';

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
    lookup: '',
    history: [],
    errors: null,
    mapperFunc: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {value, lookup, mapperFunc } = this.state;

    this.fetch(value, lookup, mapperFunc);
    this.setState({value: '', lookup: '', mapperFunc:''});
  }

  fetch = async (uri, lookup, mapperFunc) => {


    const res = await axios.get(uri)
      .catch((errors) => this.setState({errors}));

    console.log('raw response', res)

    const lkup  = lookup
      ? lookup.split('.')
      : [];
    console.log('full lookup as array before process', lkup)
    const data = getAtLookup(lkup, res)
    let keys;

    if (Array.isArray(data)) {
      keys = ['Array'];
    } else {
      keys = data ? Object.keys(data) : undefined
    }

    const response = {
      data,
      keys
    };

    console.log('response after lookup', response)

    this.setState({response, history: [...this.state.history, {uri, lookup}]});
  }

  renderKeyButtons = () => {
    const { keys } = this.state.response;

    if(!keys) { return }

    return keys.map((k) =>  <KeyButton data={k} />)
  }

  renderHistory = () => {
    const { history } = this.state;

    return history.reverse().map((h, i) => {
      const fade = i  / 10;
      console.log(fade)

      return <HistoryItem data={h} style={{background: `rgba(48, 205, 201, ${1 - fade})`}}/>
    })
  }

  render() {
    console.log(this.state)

    return (
      <div className='api-inspector'>
        <div className='api-inspector-form-section'>
          <div className='api-inspector-form-container'>
            <h2>URI Inspector</h2>
            <form className='api-inspector-form' onSubmit={this.handleSubmit}>
              <input
                placeholder='uri'
                value={this.state.value}
                onChange={(e) => this.setState({value: e.target.value}) }
              />
              <input
                placeholder='lookup'
                value={this.state.lookup}
                onChange={(e) => this.setState({lookup: e.target.value}) }
              />
              <input
                placeholder='if array is found, run this map'
                value={this.state.mapperFunc}
                onChange={(e) => this.setState({mapperFunc: e.target.value}) }
              />
              <button type='submit' >Fetch</button>
            </form>

          </div>

          <div className='response-inspector-container'>
            <div className='response-inspector'>

              <div className='response-inspector-key-container'>
                {this.renderKeyButtons()}
              </div>
              <div className='response-inspector-body-container'>
                {this.state.response ? JSON.stringify(this.state.response.data) : ''}
                {this.state.errors ? JSON.stringify(this.state.errors) : ''}
              </div>
            </div>
          </div>
        </div>
        <div className='api-inspector-history-section'>
          <div className='api-inspector-history-section-header'>
            <h2>History</h2>
          </div>
          <div className='api-inspector-history-section-body'>
            {this.renderHistory()}
          </div>
        </div>
      </div>
    )
  }
}

export default APIInspector;
