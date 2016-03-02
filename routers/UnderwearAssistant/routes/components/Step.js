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
  BASE_STATIC_DIR,
  PUT_ASSISTANT_INFO,
  FETCH_SUCCESS,

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
import {fetchAuth} from 'fetch.js'
let update = require('react-addons-update')

import Age from 'Age.js'
import Bra from 'Bra.js'
import Nighty from 'Nighty.js'
import Chest from 'Chest.js'
import Result from 'Result.js'
import UpperBust from 'UpperBust.js'
import UnderBust from 'UnderBust.js'
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
      recommend_bottom_bust: '',
      recommend_cup: '',
      selectedData: {
          "age_group": {selectedIndex: 0, text: '70后', value: '70', featureSource: ASSISTANT_FEATRUES_AGE},

          "bottom_bust": {selectedIndex: -1, text: '选择低围', featureSource: ASSISTANT_FEATRUES_BASE_SIZE},
          "cup": {selectedIndex: -1, text: '选择罩杯', featureSource: ASSISTANT_FEATRUES_BRA_SIZE},

          "sleepwear_size": {selectedIndex: -1, text: '选择睡衣尺码', featureSource: ASSISTANT_FEATRUES_SIZE},

          "look_gather": {
              selectedIndex: 0,
              featureSource: CHEST_FEATRUES_1,
              tips: '仔细观察你的胸部，他们是',
              imgs: ['feature-1-1.png', 'feature-1-2.png', 'feature-1-3.png']
          },
          "look_stand": {
            selectedIndex: 0,
            featureSource: CHEST_FEATRUES_2,
            tips: '仔细观察你的胸部，他们是',
            imgs: ['feature-2-1.png', 'feature-2-2.png', 'feature-2-3.png']
          },
          "look_chassis": {
            selectedIndex: 0,
            featureSource: CHEST_FEATRUES_3,
            tips: '仔细观察你的胸部，他们是',
            imgs: ['feature-3-1.png', 'feature-3-2.png', 'feature-3-3.png']
          },
          "look_accessory_breast": {
            selectedIndex: 0,
            featureSource: CHEST_FEATRUES_4,
            tips: '仔细观察你的胸部，他们是',
            imgs: ['feature-4-1.png', 'feature-4-2.png', 'feature-4-3.png']
          },
          "thickness": {
            selectedIndex: 0,
            featureSource: CHEST_FEATRUES_5,
            tips: '你喜欢哪种厚度？',
            imgs: ['feature-5-1.png', 'feature-5-2.png', 'feature-5-3.png']
          },

          "underwear_style": {
            selectedIndex: 0,
            featureSource: CHEST_FEATRUES_6,
            tips: '打开你的内衣橱，我们能看到什么？',
            imgs: ['feature-6-1.png', 'feature-6-2.png', 'feature-6-3.png']
          },
          "ordinary_style": {
            selectedIndex: 0,
            featureSource: CHEST_FEATRUES_7,
            tips: '平常穿的话，你最中意下面哪件？',
            imgs: ['feature-7-1.png', 'feature-7-2.png', 'feature-7-3.png']
          },

          "upper_bust": {selectedIndex: -1, text:'选择上胸围', tips: '仔细观察你的胸部，他们是'},
          "under_bust": {selectedIndex: -1,  text:'选择下胸围',   tips: '仔细观察你的胸部，他们是'},

      }
    }

  }
  makeSizeItem = (floor, upper, delta) => {
    let list = []
    while (floor <= upper) {
      let temp = {
        value: floor,
        text: new Number(floor).toFixed(1)
      }
      list.push(temp)
      floor += delta
    }
    return list
  };
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
  postAssistentData =  () => {
    let data = {}
    Object.keys(this.state.selectedData).forEach( (item, index) => {
      data[item] = this.state.selectedData[item].value
    });
    fetchAuth(`${PUT_ASSISTANT_INFO}`, {method: 'post', body: JSON.stringify(data)})
      .then( (data) => {//{"id":3002,"r":1,"rea":0,"recommend_bottom_bust":75,"recommend_cup":"A"}
        if (data.rea == FETCH_SUCCESS) {
          this.setState({
            recommend_bottom_bust: data.recommend_bottom_bust,
            recommend_cup: data.recommend_cup
          })
        }
      })
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
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.params.stepId > this.state.stepNum) {
      this.postAssistentData()
    }
  };
  componentWillUnmount = () => {
  };
  render() {

    let {stepId} = this.props.params
    let nextStep = 1 * stepId + 1
    let selectedIndex, featureSource, selection
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
      case '11':
        this.state.selectedData['upper_bust'].featureSource = this.makeSizeItem(60, 120, 0.5)
        content = (<UpperBust source={this.state.selectedData.upper_bust}/>) //age_group
        break;
      case '12':
        this.state.featureName = 'under_bust'
        this.state.selectedData['under_bust'].featureSource = this.makeSizeItem(60, 90, 0.5)
        content = (<UnderBust source={this.state.selectedData.under_bust}/>) //age_group
        break;

    }
    if (stepId > 3 && stepId < 11) {
      let props = this.state.selectedData[this.state.featureName]
      content = (
        <Chest {...props}/>
      )
    } else {
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

    let isResult = stepId > this.state.stepNum
    return (
      <div>
        {
          isResult?
          (
            <Result {...this.state}/>
          ) :
          (
            <div className="step-container" onClick={this.thisHandler}>
              <div className="icon-arrow-left iconfont" onClick={this.backHandler}></div>
              <div className="step-index arial">{`${stepId}/${this.state.stepNum}`}</div>
              <div className="step-wrap">
                {content}
              </div>
              <div className="as-next-wrap">
                <Link to={`${BASE_PAGE_DIR}/assistant/step/${nextStep}`} className="btn-next icon-gt iconfont"></Link>
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
