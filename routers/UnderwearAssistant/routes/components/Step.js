import React from 'react'
import { Link } from 'react-router'
import PageHeader from 'PageHeader/PageHeader.js'
import PageSpin from 'PageSpin/PageSpin.js'
import ScrollingSpin from 'ScrollingSpin/ScrollingSpin.js'
import {FETCH_INDEX_DATA, BASE_DIR} from 'macros.js'
import {fetchable} from 'fetch.js'
let update = require('react-addons-update')

import Step_1 from 'Step_1.js'

import './Step.less'
class Step extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      features: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    };

  }
  backHandler = () => {
    this.props.history.goBack();
  };
  componentDidMount = () => {

  };
  componentWillUnmount = () => {
  };
  render() {
    let {stepId} = this.props.params;
    let content
    switch (stepId) {
      case '1':
        content = (<Step_1 selectedId={this.state.features[stepId - 1]}/>)
        break;
      case '2':
        content = (<Step_2 selectedId={this.state.features[stepId - 1]}/>)
        break;
      case '3':
        content = (<Step_3 selectedId={this.state.features[stepId - 1]}/>)
        break;
      case '4':
        content = (<Step_4 selectedId={this.state.features[stepId - 1]}/>)
        break;
      case '5':
        content = (<Step_5 selectedId={this.state.features[stepId - 1]}/>)
        break;
      case '6':
        content = (<Step_6 selectedId={this.state.features[stepId - 1]}/>)
        break;
      case '7':
        content = (<Step_7 selectedId={this.state.features[stepId - 1]}/>)
        break;
      case '8':
        content = (<Step_8 selectedId={this.props.features[stepId - 1]}/>)
        break;
      case '9':
        content = (<Step_9 selectedId={this.props.features[stepId - 1]}/>)
        break;
      case '10':
        content = (<Step_10 selectedId={this.props.features[stepId - 1]}/>)
        break;

    }

    return (
      <div className="step-container">
        {content}
        <div className="as-next-wrap">
          <div className="btn-next iconfont">&#xe600;</div>
        </div>
      </div>
    )
  }
}

//module.exports = Home
module.exports = Step
