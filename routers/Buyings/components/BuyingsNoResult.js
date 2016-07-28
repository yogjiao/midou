import React from 'react'
import {Link} from 'react-router'
import {BASE_STATIC_DIR, BASE_PAGE_DIR} from 'macros.js'

import 'BuyingsNoResult.less'
class BuyingsNoResult extends React.Component {
  render() {
    return (
      <div className="home-null-wrap">
        <div className="img-wrap">
          <img src={`${BASE_STATIC_DIR}/img/null-buyings.png`} />
        </div>
        <div className="tips-cn">没有符合条件的商品哦~</div>
        <div className="tips-en">Sorry, the product you required is not available now</div>
      </div>
    )
  }
}

export default BuyingsNoResult
