import React from 'react'
import { Link } from 'react-router'
import PageHeader from 'PageHeader/PageHeader.js'
import PageSpin from 'PageSpin/PageSpin.js'
import ScrollingSpin from 'ScrollingSpin/ScrollingSpin.js'
import Selection from  'Selection/Selection.js'
import Prompt from 'Prompt/Prompt.js'
import {getParentByClass} from 'util.js'
import AssistantSlideSelection from 'AssistantSlideSelection.js'
import {backToNativePage} from 'webviewInterface.js'
import {
  BASE_PAGE_DIR,
  BASE_STATIC_DIR,
  PUT_ASSISTANT_INFO,
  PUT_WEIXIN_ASSISTANT_INFO,
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
import {fetchAuth, fetchable} from 'fetch.js'
let update = require('react-addons-update')
import errors from 'errors.js'
import ua from 'uaParser.js'
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

      isHiddenSelection: true,
      isHiddenSlideSelection: true,
      isHiddenPageSpin: true,
      promptMsg: '',
      featureName: '',
      // featureSource: [],
      // selectedIndex: -1,
      recommend_bottom_bust: '-',
      recommend_cup: '-',
      selectedData: {
          "age_group": {
            selectedIndex: -1,
            defaultText: '选择年龄',
            text: '',
            featureSource: ASSISTANT_FEATRUES_AGE
          },
          "bottom_bust": {
            selectedIndex: -1,
            defaultText: '选择低围',
            text: '',
            featureSource: ASSISTANT_FEATRUES_BASE_SIZE
          },
          "cup": {
            selectedIndex: -1,
            defaultText: '选择罩杯',
            text: '',
            featureSource: ASSISTANT_FEATRUES_BRA_SIZE
          },
          "sleepwear_size": {
            selectedIndex: -1,
            defaultText: '选择睡衣尺码',
            text: '',
            featureSource: ASSISTANT_FEATRUES_SIZE
          },
          "look_gather": {
              selectedIndex: 0,
              value: 1,
              featureSource: CHEST_FEATRUES_1,
              tips: '仔细观察你的胸部，他们是',
              imgs: ['feature-1-1.png', 'feature-1-2.png', 'feature-1-3.png']
          },
          "look_stand": {
            selectedIndex: 0,
            value: 1,
            featureSource: CHEST_FEATRUES_2,
            tips: '仔细观察你的胸部，他们是',
            imgs: ['feature-2-1.png', 'feature-2-2.png', 'feature-2-3.png']
          },
          "look_chassis": {
            selectedIndex: 0,
            value: 1,
            featureSource: CHEST_FEATRUES_3,
            tips: '仔细观察你的胸部，他们是',
            imgs: ['feature-3-1.png', 'feature-3-2.png', 'feature-3-3.png']
          },
          "look_accessory_breast": {
            selectedIndex: 0,
            value: 1,
            featureSource: CHEST_FEATRUES_4,
            tips: '仔细观察你的胸部，他们是',
            imgs: ['feature-4-1.png', 'feature-4-2.png', 'feature-4-3.png']
          },
          "thickness": {
            selectedIndex: 0,
            value: 1,
            featureSource: CHEST_FEATRUES_5,
            tips: '你喜欢哪种厚度？',
            imgs: ['feature-5-1.png', 'feature-5-2.png', 'feature-5-3.png']
          },

          "underwear_style": {
            selectedIndex: 0,
            value: 1,
            featureSource: CHEST_FEATRUES_6,
            tips: '打开你的内衣橱，我们能看到什么？',
            imgs: ['feature-6-1.png', 'feature-6-2.png', 'feature-6-3.png']
          },
          "ordinary_style": {
            selectedIndex: 0,
            value: 1,
            featureSource: CHEST_FEATRUES_7,
            tips: '平常穿的话，你最中意下面哪件？',
            imgs: ['feature-7-1.png', 'feature-7-2.png', 'feature-7-3.png']
          },

          "upper_bust": {
            selectedIndex: -1,
            defaultText: '选择上胸围',
            text:'',
            tips: '仔细观察你的胸部，他们是'
          },
          "under_bust": {
            selectedIndex: -1,
            defaultText: '选择下胸围',
            text:'',
            tips: '仔细观察你的胸部，他们是'
          },

      }
    }

    this.state.stepNum = Object.keys(this.state.selectedData).length - 1


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
    } else if (target = getParentByClass(e.target, 'btn-next')) {
      let isSelectedTheValue = this.isSelectedValue()
      if (!isSelectedTheValue) {
        this.setState({
          promptMsg: this.promptMsg
        });
        this.refs['prompt'].show();
      }
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
    let fetchMethod = ua.isWeixin? fetchable : fetchAuth
    let url = ua.isWeixin? PUT_WEIXIN_ASSISTANT_INFO : PUT_ASSISTANT_INFO

    this.setState({isHiddenPageSpin: false})
    let data = {}
    Object.keys(this.state.selectedData).forEach( (item, index) => {
      data[item] = this.state.selectedData[item].value
    });
    fetchMethod(`${url}`, {method: 'post', body: JSON.stringify(data)})
      .then( (data) => {//{"id":3002,"r":1,"rea":0,"recommend_bottom_bust":75,"recommend_cup":"A"}
        if (data.rea == FETCH_SUCCESS) {
          this.setState({
            recommend_bottom_bust: data.recommend_bottom_bust,
            recommend_cup: data.recommend_cup,
            isHiddenPageSpin: true
          })
        } else {
          this.setState({promptMsg: errors[data.rea], isHiddenPageSpin: true})
          this.refs['prompt'].show()
        }
      })
      .catch((e)=>{
        this.setState({
          isHiddenPageSpin: true
        })
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
    if (this.props.params.stepId == '1' && ua.isApp) {
      backToNativePage()
        .then((data) => {
      })
    } else {

    }
    this.props.history.goBack();
  };
  componentDidMount = () => {
  };
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.params.stepId > this.state.stepNum) {
      this.postAssistentData()
    }
  };
  // shouldComponentUpdate  = (nextProps, nextState) =>{
  //
  // };
  componentWillUnmount = () => {
  };
  render() {
    let {stepId} = this.props.params
    let nextStep = 1 * stepId + 1
    let selectedIndex, featureSource, selection, configData
    let content
    switch (stepId) {
      case '1':
        content = (<Age source={this.state.selectedData.age_group}/>) //age_group
        this.isSelectedValue = () => {
          let is = !!this.state.selectedData.age_group.value
          if (!is) {
            this.promptMsg = '请选择年龄'
          }
          return is
        };
        break;
      case '2':
        content = (<Bra source={this.state.selectedData.bottom_bust} source_1={this.state.selectedData.cup}/>)
        this.isSelectedValue = () => {
          let is = !!this.state.selectedData.bottom_bust.value
          let is_1 = !!this.state.selectedData.cup.value
          if (!is) {
            this.promptMsg = '请选择底围'
          } else if (!is_1) {
            this.promptMsg = '请选择罩杯'
          }
          return is && is_1
        };
        break;
      case '3':
        content = (<Nighty source={this.state.selectedData.sleepwear_size}/>)
        this.isSelectedValue = () => {
          let is = !!this.state.selectedData.sleepwear_size.value
          if (!is) {
            this.promptMsg = '请选择睡衣尺码'
          }
          return is
        };
        break;
      case '4':
        this.state.featureName = 'look_gather'
        this.isSelectedValue = () => {
          let is = !!this.state.selectedData.look_gather.value
          if (!is) {
            this.promptMsg = '请选择您的胸部特征'
          }
          return is
        };
        break;
      case '5':
        this.state.featureName = 'look_stand'
        this.isSelectedValue = () => {
          let is = !!this.state.selectedData.look_stand.value
          if (!is) {
            this.promptMsg = '请选择您的胸部特征'
          }
          return is
        };
        break;
      case '6':
        this.state.featureName = 'look_chassis'
        this.isSelectedValue = () => {
          let is = !!this.state.selectedData.look_chassis.value
          if (!is) {
            this.promptMsg = '请选择您的胸部特征'
          }
          return is
        };
        break;
      case '7':
        this.state.featureName = 'look_accessory_breast'
        this.isSelectedValue = () => {
          let is = !!this.state.selectedData.look_accessory_breast.value
          if (!is) {
            this.promptMsg = '请选择您的胸部特征'
          }
          return is
        };
        break;
      case '8':
        this.state.featureName = 'thickness'
        this.isSelectedValue = () => {
          let is = !!this.state.selectedData.thickness.value
          if (!is) {
            this.promptMsg = '请选择您的胸部特征'
          }
          return is
        };
        break;
      case '9':
        this.state.featureName = 'underwear_style'
        this.isSelectedValue = () => {
          let is = !!this.state.selectedData.underwear_style.value
          if (!is) {
            this.promptMsg = '请选择您的胸部特征'
          }
          return is
        };
        break;
      case '10':
        this.state.featureName = 'ordinary_style'
        this.isSelectedValue = () => {
          let is = !!this.state.selectedData.ordinary_style.value
          if (!is) {
            this.promptMsg = '请选择您的胸部特征'
          }
          return is
        };
        break;
      case '11':
        this.state.selectedData['upper_bust'].featureSource = this.makeSizeItem(61, 120, 0.5)
        content = (<UpperBust source={this.state.selectedData.upper_bust}/>) //age_group
        this.isSelectedValue = () => {
          let is = !!this.state.selectedData.upper_bust.value
          if (!is) {
            this.promptMsg = '请选择您的上胸围'
          }
          return is
        };
        break;
      case '12':
        let upper
        try {
          upper = (this.state.selectedData['upper_bust'].value - 0.5) || 90
        } catch (e) {
          upper = 90
        }
        this.state.featureName = 'under_bust'
        this.state.selectedData['under_bust'].featureSource = this.makeSizeItem(60, upper, 0.5)
        content = (<UnderBust source={this.state.selectedData.under_bust}/>) //age_group
        this.isSelectedValue = () => {
          let is = !!this.state.selectedData.under_bust.value
          if (!is) {
            this.promptMsg = '请选择您的下胸围'
          }
          return is
        };
        break;

    }
    if (stepId > 3 && stepId <= this.state.stepNum - 2) {
      let props = this.state.selectedData[this.state.featureName]
      content = (
        <Chest {...props}/>
      )
    } else {
      try {
        configData = this.state.selectedData[this.state.featureName]
        selectedIndex = configData.selectedIndex
        featureSource = configData.featureSource
      } catch (err) {
        configData = {}
        selectedIndex = -1
        featureSource = []
      }
      selection = (
        <Selection
         title={configData.defaultText}
         itemType='1'
         selectedIndex={selectedIndex}
         isHidden={this.state.isHiddenSelection}
         source={featureSource}
         selectionHandler={this.selectionHandler}
        />
      )
    }
    let isSelectedTheValue = this.isSelectedValue()
    let linkTo = isSelectedTheValue? `${BASE_PAGE_DIR}/assistant/step/${nextStep}` : 'javascript:void(0)'

    return (
      <div>
        {
          stepId > this.state.stepNum?
          (
            <Result {...this.state}/>
          ) :
          (
            <div className="step-container" onClick={this.thisHandler}>
              {
                this.props.params.stepId == 1 || ua.isWeixin?
                '':
                (
                  <div className="icon-arrow-left iconfont" onClick={this.backHandler}></div>
                )
              }
              <div className="step-index arial">{`${stepId}/${this.state.stepNum}`}</div>
              <div className="step-wrap">
                {content}
              </div>
              <div className="as-next-wrap">
                <Link to={linkTo} className="btn-next icon-gt iconfont"></Link>
              </div>
              {selection}

            </div>
          )
        }
      <PageSpin isHidden={this.state.isHiddenPageSpin}/>
      <Prompt msg={this.state.promptMsg} ref="prompt" />
      </div>
    )
  }
}

//module.exports = Home
module.exports = Step
