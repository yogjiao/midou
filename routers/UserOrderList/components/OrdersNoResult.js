import React from 'react'
import {Link} from 'react-router'
import {BASE_STATIC_DIR, BASE_PAGE_DIR} from 'macros.js'

import 'OrdersNoResult.less'
class OrdersNoResult extends React.Component {
  render() {
    return (
      <div className="order-null-wrap">
        <img src={`${BASE_STATIC_DIR}/img/null-order.png`} />
      </div>
    )
  }
}

export default OrdersNoResult
