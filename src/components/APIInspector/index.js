import React, { Component } from 'react';
import './style.css';
import axios from 'axios';
import KeyButton from '../KeyButton';

import HistoryItem from '../HistoryItem';
import ArrayHoverNav from '../ArrayHoverNav';
import EndPointModel from '../EndPointModel';

function getAtLookup(lookup, object) {

  let candidate = object;

  for (let i=0; i<lookup.length; i++) {

    candidate = candidate[lookup[i]]

  }

  return candidate;
}

class APIInspector extends Component {
  state = {
    value: '',
    response: "",
    lookupVal: '',
    lookup: [],
    arrAtLookup: true,
    arrIndex: 0,
    history: [],
    errors: null,
    perceivedArrPos: 0,
    responseObj: {}
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {value, lookupVal, mapperFunc } = this.state;

    const lookup = lookupVal.split('.');
    this.setState({value: '', mapperFunc:'', lookupVal: '', errors: '', lookup:[]});
    this.fetch(value, lookup, mapperFunc);
  }

  fetch = async (uri, lookup, mapperFunc) => {

    const res = await axios.get(uri)
        .catch((errors) => this.setState({errors}));

    const responseObj = res;

    this.setState({responseObj, history: [{uri, lookup}, ...this.state.history ]});
  }

  renderResponseAtLookup = () => {
    if (!this.state.responseObj) { return }
    const { responseObj, lookup, perceivedArrPos } = this.state;

    const responseAtLookup = getAtLookup(lookup, responseObj);

    if (!responseAtLookup) { return 'undefined'}

    if(Array.isArray(responseAtLookup)) {

      const pos = this.calcPerceivedArrPos(responseAtLookup.length)

      return(
        <EndPointModel
          onClick={(index, k) => this.setState({ lookup: [...this.state.lookup, index, k] })}
          object={responseAtLookup[pos]}
          summaryMode={true}
          isArray
          perceivedArrPos={pos}
        />
      )
    }

    return(
        <EndPointModel
                onClick={(k) => this.setState({ lookup: [...this.state.lookup, k] })}
                object={responseAtLookup}
                perceivedArrPos={perceivedArrPos}
        />
      )
  }

  renderKeyButtons = () => {
    const { responseObj, lookup, arrIndex } = this.state;

    if(!responseObj) { return }

    const objectAtLookup = getAtLookup(lookup, responseObj)

    if(Array.isArray(objectAtLookup)) {
      const pos = this.calcPerceivedArrPos(objectAtLookup.length);
      return (
        <KeyButton
          isArray
          pos={pos}
          onForward={() => this.setState({arrIndex: arrIndex + 1})}
          onBack={() => this.setState({arrIndex: arrIndex - 1})}
        />
      )
    }

    if(typeof objectAtLookup === 'string') {
      console.log('is string')
      return
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

  calcPerceivedArrPos = (length) => {
    const { arrPercentagePos } = this.state;
    const segSize = 100 / length;
    const perceivedArrPos = Math.floor(arrPercentagePos / segSize);
    return perceivedArrPos;
  }

  renderArrayHoverNav = () => {
    const { arrAtLookup } = this.state;

    if(!arrAtLookup) { return }

    return <ArrayHoverNav cb={(p) => this.setState({arrPercentagePos: p})}/>
  }

  renderHistory = () => {
    const { history } = this.state;

    return history.map((h, i) => {
      const fade = i  / 10;

      return <HistoryItem data={h} style={{background: `rgba(48, 205, 201, ${1 - fade})`}}/>
    })
  }

  renderErrors = () => {
    const { errors } = this.state;

    if(!errors) { return }

    return (
      <div className='error-container'>
        <h2>Errors</h2>
        {JSON.stringify(errors)}

      </div>
    )
  }

  renderLookUp = () => {
    const { lookup, responseObj } = this.state;

    let indexBracket = '';

    if(!lookup || !responseObj) { return }

    const objectAtLookup = getAtLookup(lookup, responseObj);

    if (Array.isArray(objectAtLookup)) {
      indexBracket = `[${this.calcPerceivedArrPos(objectAtLookup.length)}]`
    }

    const breadcrumbs = lookup.map((lu) => {
      return (
        <div
          onClick={() => this.setState({lookup: lookup.slice(0, lookup.indexOf(lu))})}
        >
          {lu}.
        </div>
      )
    })

    return [...breadcrumbs, indexBracket];
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
                value={this.state.lookupVal}
                onChange={(e) => this.setState({lookupVal: e.target.value.split('.')}) }
              />
              <button type='submit' >Fetch</button>
            </form>

          </div>

          <div className='response-inspector-container'>
            <div className='response-inspector'>

              <div className='response-inspector-key-container'>
                <div>
                  <div className='lookup-container'>
                    {lkupln > 0 ? <button onClick={() => this.setState({lookup: lookup.slice(0, lkupln-1)})}>^</button> : ''}
                    {this.renderLookUp()}
                  </div>
                </div>
                <div>
                  <div className='hover-nav-container'>
                    {this.renderArrayHoverNav()}
                  </div>
                </div>
              </div>
              <div className='response-inspector-body-container'>
                {this.renderResponseAtLookup()}
                {this.renderErrors()}
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
