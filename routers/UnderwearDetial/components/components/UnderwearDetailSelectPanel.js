import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import {
  UNDERWEAR_BRA_SIZE,
  UNDERWEAR_BASE_SIZE,
  BASE_PAGE_DIR,
  UNDERWEAR_SIZE
} from 'macros.js'


let update = require('react-addons-update')


import 'UnderwearDetailSelectPanel.less'
class UnderwearDetailSelectPanel extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     braSize: this.props.allBraSize[0], //杯罩
  //     baseSize: this.props.allBaseSize[0],
  //     num: 1,
  //     isSetupBoxService: false,
  //     selectedBox: {},//{braSize: 'A', baseSize: '80'}
  //     boxes: [] // [{braSize: 'A', baseSize: '80'}]
  //   }
  //   this.test = 0;
  // }
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
  componentDidMount = () => {
  };
  render() {
    let boxesEl,
        braEl,
        baseEl,
        sizeEl;
    switch (this.props.category) {
      case '1':
        baseEl = (
          <dl className="perimeter-wrap">
            <dt>
              <i className="iconfont icon-triangle-left-top" />
              <span  className="label-name">请选择底围</span>
            </dt>
            <dd>
              {
                this.props.allBase.map((val, index) => {
                  return (
                    <div
                      key={index}
                      data-value={val}
                      className={val == this.props.baseSize?
                        'box-service-item base-size on' :
                        'box-service-item base-size'}
                    >
                      {val}
                    </div>)
                })
              }
            </dd>
          </dl>
        )

          braEl = (
            <dl className="cup-wrap">
              <dt>
                <i className="iconfont icon-triangle-left-top" />
                <span className="label-name">请选择罩杯</span>
              </dt>
              <dd>
                {
                  this.props.goods.inventoryInfo.allBase[this.props.baseSize]
                    .map((val, index) => {
                      return (
                        <div
                          key={index}
                          data-value={val}
                          className={
                            val == this.props.braSize?
                            'char-circle bra-size  on' :
                            'char-circle bra-size'}
                        >
                          {val}
                        </div>
                      )
                  })
                }
              </dd>
            </dl>
          )

        if (this.props.boxes.length) {
          boxesEl = (
            <dl className="box-wrap clearfix">
              <dt>
                <i className="iconfont icon-triangle-left-top" />
                <span className="label-name">请选择盒子服务</span>
                <Link to={`${BASE_PAGE_DIR}/box-service`} className="what-is-box">什么是盒子服务？</Link>
              </dt>
              {
                 this.props.boxes.map((item, index) => {
                    return (
                      <dd className="box-service-wrap" key={index}>
                        <div className="box-service-item">{item.baseSize}{item.braSize}</div>
                        <div className="select-num">
                          <div className="btn-minus" data-index={index}>
                            <i className="iconfont icon-minus" />
                          </div>
                          <div className="nums">{item.count}</div>
                          <div className="btn-add" data-index={index}>
                            <i className="iconfont icon-add" />
                          </div>
                        </div>
                      </dd>)
                  })
              }

            </dl>
          )
        }
        break;
      case '2':
      case '3':
        sizeEl = (
          <dl className="cup-wrap">
            <dt>
              <i className="iconfont icon-triangle-left-top" />
              <span className="label-name">请选择尺码</span>
            </dt>
            <dd>
              {
                this.props.allSize.map((val, index) => {
                  return (<div key={index} data-value={val} className={val == this.props.size? 'char-circle no-bra-size  on' : 'char-circle no-bra-size'}>{val}</div>)
                })
              }
            </dd>
          </dl>
        )
        break;
    }
    return (

      <div
        className={this.props.isHidden?
          'select-model-wrap' :
          'select-model-wrap on'}
        onClick={this.props.selectHandler}
      >
        <div className="bg-blur"></div>
        <div className="select-panel">
          <div className="select-panel-adjust">
            <div>{baseEl}</div>
            <div>{braEl}</div>

            {sizeEl}
            <dl className="num-wrap">
              <dt>
                <i className="iconfont icon-triangle-left-top" />
                <span className="label-name">请选择数量</span>
              </dt>
              <dd>
                <div className="select-num-wrap clearfix">
                  <div className="select-num">
                    <div className="btn-minus"><i className="iconfont icon-minus" /></div>
                    <div className="nums">{this.props.count}</div>
                    <div className="btn-add"><i className="iconfont icon-add" /></div>
                  </div>
                </div>
              </dd>
            </dl>

            {boxesEl}
          </div>
          <div className="iconfont close-select-panel">&#xe602;</div>
          <div className="btn-post">确定</div>
        </div>
      </div>
    )
  }
}

export default UnderwearDetailSelectPanel
