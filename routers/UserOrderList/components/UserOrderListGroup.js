import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import orderState from 'orderState.js'
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
    let list = []
    this.props.source.goods.forEach( (item, index) => {

      let noTryList = []
      let tryList = []
      item.forEach((item, index) => {
        let temp
        if (index == 0) {
          temp = <UserOrderItem
            oid={this.props.oid}
            ts={this.props.source.ts}
            key={index}
            source={item}
            pageType="3"
            itemType="1"/>
          noTryList.push(temp)
        } else {
          temp = <UserOrderItem
            oid={this.props.oid}
            ts={this.props.source.ts}
            key={index}
            source={item}
            pageType="3"
            itemType="2"/>
          tryList.push(temp)
        }
      })

      if (tryList.length > 0) {
        tryList = (<div className="box-list"><div className="sep-line"/>{tryList}</div>)
      }
      noTryList = noTryList.concat(tryList)
      noTryList = (<div className="order-group-item" key={index}>{noTryList}</div>)

      list.push(noTryList)

    })





    return (
      <div className="order-list-group">
        <div className="order-group-header">
          <div className={`order-state-${this.props.source.order_state} state-wrap`}>{orderState[this.props.source.order_state]}</div>
          <div className="order-id"><span>订单号:</span><i className="color-purple arial">{this.props.source.id}</i></div>
        </div>

        {list}

      </div>
    )
  }
}

export default UserOrderListGroup
