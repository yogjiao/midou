import React from 'react'
import { Link } from 'react-router'
import PageHeader from 'PageHeader/PageHeader.js'
import PageSpin from 'PageSpin/PageSpin.js'
import ScrollingSpin from 'ScrollingSpin/ScrollingSpin.js'
import Selection from  'Selection/Selection.js'
import {getParentByClass} from 'util.js'
import {
  BASE_PAGE_DIR,

  ASSISTANT_FEATRUES_AGE
} from 'macros.js'
import {fetchable} from 'fetch.js'
let update = require('react-addons-update')

import Age from 'Age.js'

import './Step.less'
class Step extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stepNum: 12,
      isHiddenSelection: true,
      featureName: '',
      featureSource: [],
      selectedIndex: -1,
      selectedData: {
          "age_group": {selectedIndex: 2, text: '选择年龄'},

          "bottom_bust": {},
          "cup": {},

          "upper_bust": {},
          "under_bust": {},
          "sleepwear_size": {},
          "look_stand": {},
          "look_gather": {},
          "look_chassis": {},
          "look_accessory_breast": {},
          "thickness": {},
          "underwear_style": {},
          "ordinary_style": {}
      }
    }

  }
  thisHandler = (e) => {
    let target
    if (target = getParentByClass(e.target, 'select-wrap')) {
      let featureName = target.getAttribute('data-feature-name')
      this.setState({isHiddenSelection: false, featureName: featureName, featureSource: ASSISTANT_FEATRUES_AGE})
    } else if (target = getParentByClass(e.target, 'btn-next')) {
      //this.setState({isHiddenSelection: false})
    }
  };
  getNextStateForSelectedData = (target) => {
    let source = JSON.parse(target.getAttribute('data-source'))
    let index = target.getAttribute('data-index')
    let schema = {}
    let selectedDataSchema = {}
    source.selectedIndex = {$set: index}
    
    selectedDataSchema[this.state.featureName] = {$set: source}
    schema.selectedData = selectedDataSchema
    schema.isHiddenSelection = {$set: true}
    return update(this.state, schema)
  };
  selectionHandler = (e) => {
    let target
    let nextState
    if (target = getParentByClass(e.target, 'select-item-wrap')) {
      nextState = this.getNextStateForSelectedData(target)
    }

    nextState && this.setState(nextState)
  };
  backHandler = () => {
    this.props.history.goBack();
  };
  componentDidMount = () => {

  };
  componentWillUnmount = () => {
  };
  render() {
    let {stepId} = this.props.params
    let nextStep = 1 * stepId + 1
    let selectedIndex
    try {
      selectedIndex = this.state.selectedData[this.state.featureName].selectedIndex
    } catch (err) {
      selectedIndex = -1
    }
    let content
    switch (stepId) {
      case '1':
        content = (<Age source={this.state.selectedData.age_group}/>)
        break;
      case '2':
        content = (<Bra source={this.state.selectedData.bottom_bust} source_1={this.state.selectedData.cup}/>)
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
      <div className="step-container" onClick={this.thisHandler}>
        <div className="step-index arial">{`${stepId}/${this.state.stepNum}`}</div>
        <div className="step-wrap">
          {content}
        </div>
        <div className="as-next-wrap">
          <Link to={`${BASE_PAGE_DIR}/assistant/step/${nextStep}`} className="btn-next iconfont">&#xe600;</Link>
        </div>
        <Selection
         itemType='1'
         selectedIndex={selectedIndex}
         isHidden={this.state.isHiddenSelection}
         source={this.state.featureSource}
         selectionHandler={this.selectionHandler}
        />
      </div>
    )
  }
}

//module.exports = Home
module.exports = Step
