import React from 'react'
import ReactDOM from 'react-dom'

import './UserOrderItem.less'

class UserOrderItem extends React.Component {

  componentWillMount = () => {
    //this.setState({boxes: countBoxes(this.props.source.cup, this.props.source.bottom_bust)})
  };
  render = () => {
    return (
      <div className="order-item-container">
        <div className="column">
          <div className="img-wrap"><img src="/media/test.png" /></div>
        </div>
        <div className="column">
          <div className="row-wrap">
            <div className="pro-name">雪国精灵</div>
            <div className="justify-wrap">
              <div className="btn-draw-back">退款</div>
            </div>
          </div>
          <div className="row-wrap">
            <div className="size-wrap">
              尺码：<span className="arial pl5">75C</span>
            </div>
            <div className="justify-wrap">
              <div className="prepay-icon">押</div>
            </div>
          </div>
          <div className="row-wrap">
            <div className="price arial">&yen; 99</div>
            <div className="justify-wrap">
              <div className="btn-box-operate">补差价</div>
            </div>
          </div>
        </div>
      </div>
    )
  };
}

export default UserOrderItem
