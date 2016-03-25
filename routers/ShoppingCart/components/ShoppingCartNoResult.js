import React from 'react'
import {Link} from 'react-router'
import {BASE_STATIC_DIR, BASE_PAGE_DIR} from 'macros.js'

import 'ShoppingCartNoResult.less'
class ShoppingCartNoResult extends React.Component {
  render() {
    return (
      <div className="cart-null-wrap">
        <div className="img-wrap">
          <img src={`${BASE_STATIC_DIR}/img/null-cart.png`} />
        </div>
        <div className="cart-coming">
          <p>快选几件放进来吧！</p>
          <span>Thank  you  for  shopping  here  and  have  a  nice  day !</span>

        </div>
      </div>
    )
  }
}

export default ShoppingCartNoResult
