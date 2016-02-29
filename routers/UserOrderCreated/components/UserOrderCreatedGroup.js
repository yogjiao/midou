import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import UserOrderItem from 'UserOrderItem/UserOrderItem.js'

import './UserOrderCreatedGroup.less'
class UserOrderCreatedGroup extends React.Component {
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
        if (index == 0) return;
        let temp
        temp = <UserOrderItem key={index} source={item} pageType="1" itemType="2"/>
        boxList.push(temp)
    })
    if (boxList.length > 0) {
      boxList = (<div className="box-list"><div className="sep-line"/>{boxList}</div>)
    }
    return (
      <div className="order-created-group">
        <UserOrderItem
          source={this.props.source.goods[0]}
          pageType="1"
          itemType="1"
        />
        {boxList}

      </div>
    )
  }
}

export default UserOrderCreatedGroup
