import React from 'react'
import { Link } from 'react-router'
import PageHeader from 'PageHeader/PageHeader.js'
import PageSpin from 'PageSpin/PageSpin.js'
import ScrollingSpin from 'ScrollingSpin/ScrollingSpin.js'
import Selection from  'Selection/Selection.js'
import {getParentByClass} from 'util.js'
import AssistantSlideSelection from 'AssistantSlideSelection.js'
import {
  BASE_PAGE_DIR,

  ASSISTANT_FEATRUES_AGE,
  ASSISTANT_FEATRUES_BASE_SIZE,
  ASSISTANT_FEATRUES_BRA_SIZE,
  ASSISTANT_FEATRUES_SIZE,
  CHEST_FEATRUES_1,
  CHEST_FEATRUES_2,
  CHEST_FEATRUES_3,
  CHEST_FEATRUES_4,
  CHEST_FEATRUES_5,
  CHEST_FEATRUES_6,
  CHEST_FEATRUES_7
} from 'macros.js'
import {fetchable} from 'fetch.js'
let update = require('react-addons-update')

import Age from 'Age.js'
import Bra from 'Bra.js'
import Nighty from 'Nighty.js'
import Chest from 'Chest.js'
import Result from 'Result.js'


import './Step.less'
class Step extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stepNum: 12,
      isHiddenSelection: true,
      isHiddenSlideSelection: true,
      featureName: '',
      // featureSource: [],
      // selectedIndex: -1,
      selectedData: {
          "age_group": {selectedIndex: -1, text: '选择年龄', featureSource: ASSISTANT_FEATRUES_AGE},

          "bottom_bust": {selectedIndex: -1, text: '选择低围', featureSource: ASSISTANT_FEATRUES_BASE_SIZE},
          "cup": {selectedIndex: -1, text: '选择罩杯', featureSource: ASSISTANT_FEATRUES_BRA_SIZE},

          "sleepwear_size": {selectedIndex: -1, text: '选择睡衣尺码', featureSource: ASSISTANT_FEATRUES_SIZE},

          "look_gather": {selectedIndex: -1,  featureSource: CHEST_FEATRUES_1, tips: '仔细观察你的胸部，他们是'},
          "look_stand": {selectedIndex: -1,  featureSource: CHEST_FEATRUES_2, tips: '仔细观察你的胸部，他们是' },
          "look_chassis": {selectedIndex: -1,  featureSource: CHEST_FEATRUES_3, tips: '仔细观察你的胸部，他们是'},
          "look_accessory_breast": {selectedIndex: -1,  featureSource: CHEST_FEATRUES_4, tips: '仔细观察你的胸部，他们是'},
          "thickness": {selectedIndex: -1,  featureSource: CHEST_FEATRUES_5, tips: '仔细观察你的胸部，他们是'},

          "underwear_style": {selectedIndex: -1,  featureSource: CHEST_FEATRUES_6, tips: '仔细观察你的胸部，他们是'},
          "ordinary_style": {selectedIndex: -1,  featureSource: CHEST_FEATRUES_7, tips: '仔细观察你的胸部，他们是'},

          "upper_bust": {},
          "under_bust": {},


      }
    }

  }
  thisHandler = (e) => {
    let target
    if (target = getParentByClass(e.target, 'select-wrap')) {
      let featureName = target.getAttribute('data-feature-name')
      let nextState = {
        isHiddenSelection: false,
        featureName: featureName,
      }
      this.setState(nextState)
    } else if (target = getParentByClass(e.target, 'as-item')) {
      let nextState = this.getNextStateForSelectedData(target)
      this.setState(nextState)
    }
  };
  getNextStateForSelectedData = (target) => {
    let source = JSON.parse(target.getAttribute('data-source'))
    let index = target.getAttribute('data-index')
    let schema, temp
    source.selectedIndex = index
    schema = temp = {}

    temp = temp.selectedData = {}
    temp = temp[this.state.featureName] = {}

    Object.keys(source).forEach((item, index) => {
      temp[item] = {$set: source[item]}
    })

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
    let selection
    let nextStep = 1 * stepId + 1
    let selectedIndex, featureSource
    if (stepId < 4) {
      try {
        selectedIndex = this.state.selectedData[this.state.featureName].selectedIndex
        featureSource = this.state.selectedData[this.state.featureName].featureSource
      } catch (err) {
        selectedIndex = -1
        featureSource = []
      }
      selection = (
        <Selection
         itemType='1'
         selectedIndex={selectedIndex}
         isHidden={this.state.isHiddenSelection}
         source={featureSource}
         selectionHandler={this.selectionHandler}
        />
      )
    }
    let content
    switch (stepId) {
      case '1':
        content = (<Age source={this.state.selectedData.age_group}/>) //age_group
        break;
      case '2':
        content = (<Bra source={this.state.selectedData.bottom_bust} source_1={this.state.selectedData.cup}/>)
        break;
      case '3':
        content = (<Nighty source={this.state.selectedData.sleepwear_size}/>)
        break;
      case '4':
        this.state.featureName = 'look_gather'
        break;
      case '5':
        this.state.featureName = 'look_stand'
        break;
      case '6':
        this.state.featureName = 'look_chassis'
        break;
      case '7':
        this.state.featureName = 'look_accessory_breast'
        break;
      case '8':
        this.state.featureName = 'thickness'
        break;
      case '9':
        this.state.featureName = 'underwear_style'
        break;
      case '10':
        this.state.featureName = 'ordinary_style'
        break;

    }
    if (stepId > 3) {
      let props = this.state.selectedData[this.state.featureName]
      content = (
        <Chest {...props}/>
      )
    }

    let isResult = stepId > this.state.stepNum
    return (
      <div>
        {
          isResult?
          (
            <Result />
          ) :
          (
            <div className="step-container" onClick={this.thisHandler}>
              <div className="iconfont" onClick={this.backHandler}>&#xe609;</div>
              <div className="step-index arial">{`${stepId}/${this.state.stepNum}`}</div>
              <div className="step-wrap">
                {content}
              </div>
              <div className="as-next-wrap">
                <Link to={`${BASE_PAGE_DIR}/assistant/step/${nextStep}`} className="btn-next iconfont">&#xe600;</Link>
              </div>
              {selection}

            </div>
          )
        }
      </div>
    )
  }
}

//module.exports = Home
module.exports = Step
