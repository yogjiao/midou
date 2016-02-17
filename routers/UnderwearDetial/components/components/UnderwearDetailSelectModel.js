import React from 'react'
import ReactDOM from 'react-dom'

import 'UnderwearDetailSelectModel.less'
import * as util from 'util.js'

let update = require('react-addons-update');

class UnderwearDetailSelectModel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      braSize: this.props.allBraSize[0], //杯罩
      baseSize: this.props.allBaseSize[0],
      num: 1,
      isSetupBoxService: false,
      selectedBox: {},//{braSize: 'A', baseSize: '80'}
      boxes: [] // [{braSize: 'A', baseSize: '80'}]
    }
    this.test = 0;
  }
  show = () => {
    let selectModel = ReactDOM.findDOMNode(this)
    selectModel.style.display="block"
    setTimeout(function(){
      selectModel.classList.add('on')
    }, 0)
  };
  hide = () => {
    ReactDOM.findDOMNode(this).classList.remove('on')
    setTimeout(function(){
      ReactDOM.findDOMNode(this).style.display="none"
    }.bind(this), 1000)
  };
  /**
   * 当用户选择一件内衣的尺码为   底围：X  罩杯:B  那么推荐的尺码为两个，一个是： 底围X－5   罩杯：加大一个杯即C  另一个是：底围X＋5   罩杯：减小一个杯即A
   *
   */
  countBoxes = (braSize, baseSize) => {
    baseSize = parseInt(baseSize)
    return [
      {
        braSize: String.fromCharCode(Math.min(braSize.charCodeAt(0) + 1, this.props.allBraSize.slice(-1)[0].charCodeAt(0))),
        baseSize: Math.max(baseSize - 5, this.props.allBaseSize[0])
      },
      {
        braSize: String.fromCharCode(Math.max(braSize.charCodeAt(0) - 1, this.props.allBraSize[0].charCodeAt(0))),
        baseSize: Math.min(baseSize + 5, this.props.allBaseSize.slice(-1)[0])
      }
    ]
  };
  /**
   * use the event proxy to complete all the event;
   */
  panelOperateHandler = (e) => {
    let target, nextState;

    if (target = util.getParentByClass(e.target, 'btn-post')) {
      if (this.buyActionModel == 0) {// add product to shopping cart
        
      } else {// buy now

      }
      return
    }


    if (target = util.getParentByClass(e.target, 'char')) {
      nextState = update(this.state, {
        braSize: {$set: target.getAttribute('data-value')}
      })
    } else if (target = util.getParentByClass(e.target, 'base-size')) {
      nextState = update(this.state, {
        baseSize: {$set: target.getAttribute('data-value')}
      })
    } else if (target = util.getParentByClass(e.target, 'btn-minus')) {
      nextState = update(this.state, {num: {$apply: (num) => Math.max(0, --num)}})
    } else if (target = util.getParentByClass(e.target, 'btn-add')) {
      nextState = update(this.state, {num: {$apply: (num) => ++num}})
    } else if (target = util.getParentByClass(e.target, 'btn-turn-box')) {
      nextState = update(this.state, {isSetupBoxService: {$apply: (is) => !is}})
    } else if (target = util.getParentByClass(e.target, 'box-size')) {
      nextState = update(this.state, {selectedBox: {
        braSize: {$set: target.getAttribute('data-bra')},
        baseSize: {$set: target.getAttribute('data-base')}
      }})
    }
    nextState && this.setState(nextState)


  };
  componentWillMount = () => {
    // init this.state.boxes
    let nextState
    if (this.state.braSize && this.state.baseSize) {
      nextState= update(this.state, {
        boxes: {$set: this.countBoxes(this.state.braSize, this.state.baseSize)}
      })
    }
    this.setState(nextState)
  };
  componentDidMount = () => {
    this.refs['panel']
      .addEventListener('click', this.panelOperateHandler)
  };
  componentWillUpdate = (nextProps, nextState) => {
    if (nextState.isSetupBoxService) {
      nextState.boxes = this.countBoxes(nextState.braSize, nextState.baseSize);
    }
  };
  componentWillReceiveProps = (nextProps) => {
    this.buyActionModel = nextProps.buyActionModel
  };
  render() {
    return (
      <div className="select-model-wraper" ref="panel">
        <div className="bg-blur"></div>
        <div className="select-panel">
          <dl className="cup-wrap">
            <dt><div className="triangle" />请选择罩杯</dt>
            <dd>
              {
                this.props.allBraSize.map((val, index) => {
                  return (<div key={index} data-value={val} className={val == this.state.braSize? 'char on' : 'char'}>{val}</div>)
                })
              }
            </dd>
          </dl>
          <dl className="perimeter-wrap">
            <dt><div className="triangle" />请选择底围</dt>
            <dd>
              {
                this.props.allBaseSize.map((val, index) => {
                  return (<div key={index} data-value={val} className={val == this.state.baseSize? 'size base-size on' : 'size base-size'}>{val}</div>)
                })
              }
            </dd>
          </dl>
          <dl className="num-wrap">
            <dt><div className="triangle" />请选择数量</dt>
            <dd className="clearfix">
              <div className="select-num">
                <div className="btn-minus">-</div>
                <div className="nums">{this.state.num}</div>
                <div className="btn-add">+</div>
              </div>
            </dd>
          </dl>
          <dl className="box-wrap clearfix">
            <dt><div className="triangle" /><div className={this.state.isSetupBoxService? 'btn-turn-box on' : 'btn-turn-box'}>添加盒子服务</div>请选择盒子服务</dt>
            <dd>
              {
                this.state.isSetupBoxService?
                 this.state.boxes.map((item, index) => {
                    return (<div key={index} className={item.braSize == this.state.selectedBox.braSize
                      && item.baseSize == this.state.selectedBox.baseSize?
                      'size box-size on':'size box-size'} data-base={item.baseSize} data-bra={item.braSize}>{item.baseSize}{item.braSize}</div>)
                  }) : ''
              }
            </dd>
          </dl>
          <div className="iconfont" onClick={this.hide}>&#xe601;</div>
          <div className="btn-post">确定</div>
        </div>
      </div>
    )
  }
}

UnderwearDetailSelectModel.defaultProps = {
  allBraSize: ['A','B','C','D'],
  allBaseSize: ['70', '75', '80', '85']

}

export default UnderwearDetailSelectModel
