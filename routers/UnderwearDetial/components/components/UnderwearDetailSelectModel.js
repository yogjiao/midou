import React from 'react'
import ReactDOM from 'react-dom'

import 'UnderwearDetailSelectModel.less'

class UnderwearDetailSelectModel extends React.Component {
  render() {
    return (
      <div className="select-wraper bg-blur">
        <div className="select-panel">
          <dl>
            <dt><div className="triangle" />请选择尺码</dt>
            <dd>
              <div className="char on">A</div>
              <div className="char">B</div>
              <div className="char">C</div>
              <div className="char">D</div>
            </dd>
            <dd>
              <div className="size on">70</div>
              <div className="size">75</div>
              <div className="size">80</div>
              <div className="size">85</div>
            </dd>
          </dl>
          <dl>
            <dt><div className="triangle" />请选择数量</dt>
            <dd className="clearfix">
              <div className="select-num">
                <div className="btn-minus">-</div>
                <div className="nums">10</div>
                <div className="btn-add">+</div>
              </div>
            </dd>
          </dl>
          <dl className="clearfix">
            <dt><div className="triangle" /><div className="btn-turn-box">添加盒子服务</div>请选择盒子服务</dt>
            <dd>
              <div className="size on">70 C</div>
              <div className="size">80 A</div>
            </dd>
          </dl>
          <div className="iconfont">&#xe601;</div>
          <div className="btn-post">确定</div>
        </div>
      </div>
    )
  }
}

export default UnderwearDetailSelectModel
