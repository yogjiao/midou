import React from 'react'
import ReactDOM from 'react-dom'

import 'UnderwearDetailSelectModel.less'

var update = require('react-addons-update');

class UnderwearDetailSelectModel extends React.Component {
  constructor(props) {
    super(props)
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
  render() {
    return (
      <div className="select-model-wraper">
        <div className="bg-blur"></div>
        <div className="select-panel">
          <dl className="cup-wrap">
            <dt><div className="triangle" />请选择罩杯</dt>
            <dd>
              <div className="char on">A</div>
              <div className="char">B</div>
              <div className="char">C</div>
              <div className="char">D</div>
            </dd>
          </dl>
          <dl className="perimeter-wrap">
            <dt><div className="triangle" />请选择底围</dt>
            <dd>
              <div className="size on">70</div>
              <div className="size">75</div>
              <div className="size">80</div>
              <div className="size">85</div>
            </dd>
          </dl>
          <dl className="num-wrap">
            <dt><div className="triangle" />请选择数量</dt>
            <dd className="clearfix">
              <div className="select-num">
                <div className="btn-minus">-</div>
                <div className="nums">10</div>
                <div className="btn-add">+</div>
              </div>
            </dd>
          </dl>
          <dl className="box-wrap clearfix">
            <dt><div className="triangle" /><div className="btn-turn-box">添加盒子服务</div>请选择盒子服务</dt>
            <dd>
              <div className="size on">70 C</div>
              <div className="size">80 A</div>
            </dd>
          </dl>
          <div className="iconfont" onClick={this.hide}>&#xe601;</div>
          <div className="btn-post">确定</div>
        </div>
      </div>
    )
  }
}

export default UnderwearDetailSelectModel
