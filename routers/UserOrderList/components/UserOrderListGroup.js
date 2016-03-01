import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import UserOrderItem from 'UserOrderItem/UserOrderItem.js'

import './UserOrderListGroup.less'
class UserOrderListGroup extends React.Component {
  componentWillMount = () => {
  };
  componentDidMount = () => {
  };
  componentWillReceiveProps = (props) => {
  };
  componentWillUpdate = (nextProps, nextState) => {
    //nextState.totalPrice = this.calculateTotalPrice(nextState.goodList, nextState.isSelectedAll)
  };
  render() {
    let boxList = []
    this.props.source.goods.forEach((item, index) => {
      if (index > 0) {
        let temp
        temp = <UserOrderItem key={index} source={item} pageType="3" itemType="2"/>
        boxList.push(temp)
      }
    })
    if (boxList.length > 0) {
      boxList = (<div className="box-list"><div className="sep-line"/>{boxList}</div>)
    }
    return (
      <div className="order-detail-group">
        <div className="order-group-header">
          <div className={`state-wrap order-state-${this.props.source.order_state}`}>已支付</div>
          <div className="order-id"><span>订单号:</span><i className="color-purple">{this.props.source.id}</i></div>
        </div>
        <UserOrderItem
          source={this.props.source.goods[0]}
          pageType="3"
          itemType="1"
        />
        {boxList}

      </div>
    )
  }
}

export default UserOrderListGroup
