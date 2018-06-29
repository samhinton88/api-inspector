import React, { Component } from 'react';
import './style.css';
import axios from 'axios';
import KeyButton from '../KeyButton';
import HistoryItem from '../HistoryItem';

function getAtLookup(lookup, object) {
  console.log('lookup', lookup)
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
    lookupVal: '',
    lookup: [],
    arrAtLookup: null,
    arrIndex: 0,
    history: [],
    errors: null,
    mapperFunc: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {value, lookupVal, mapperFunc } = this.state;

    const lookup = lookupVal.split('.');
    this.fetch(value, lookup, mapperFunc);
    this.setState({value: '', mapperFunc:'', lookupVal: ''});
  }

  fetch = async (uri, lookup, mapperFunc) => {

    const res = await axios.get(uri)
      .catch((errors) => this.setState({errors}));

    const responseObj = res;

    this.setState({responseObj, history: [{uri, lookup}, ...this.state.history ]});
  }

  renderResponseAtLookup = () => {
    if (!this.state.responseObj) { return }
    const { responseObj, lookup } = this.state;

    const responseAtLookup = getAtLookup(lookup, responseObj);

    if (!responseAtLookup) { return 'undefined'}

    return JSON.stringify(responseAtLookup);
  }

  renderKeyButtons = () => {
    const { responseObj, lookup, arrIndex } = this.state;

    const l = lookup.length;

    if(!responseObj) { return }

    const objectAtLookup = getAtLookup(lookup, responseObj)

    if(Array.isArray(objectAtLookup)) {
      return (
        <KeyButton
          isArray
          onForward={() => this.setState({arrIndex: arrIndex + 1})}
          onBack={() => this.setState({arrIndex: arrIndex - 1})}
        />
      )
    }

    return Object.keys(objectAtLookup).map((k) => {
      return (
        <KeyButton
          data={k}
          onClick={() => this.setState({ lookup: [...this.state.lookup, k] })}
        />
      )
    })
  }

  renderArrayHoverNav = () => {
    const { arrAtLookup } = this.state;

    if(!arrAtLookup) { return }

    return
  }

  renderHistory = () => {
    const { history } = this.state;

    return history.map((h, i) => {
      const fade = i  / 10;
      console.log(fade)

      return <HistoryItem data={h} style={{background: `rgba(48, 205, 201, ${1 - fade})`}}/>
    })
  }

  render() {
    const { lookup } = this.state;
    const lkupln = lookup.length

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
                onChange={(e) => this.setState({lookupVal: e.target.value.split('.')}) }
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
                {lkupln > 0 ? <button onClick={() => this.setState({lookup: lookup.slice(0, lkupln-1)})}>^</button> : ''}
                {this.renderKeyButtons()}
                {this.renderArrayHoverNav()}
              </div>
              <div className='response-inspector-body-container'>
                {this.renderResponseAtLookup()}
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
