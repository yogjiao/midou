import React from 'react'
import {Link} from 'react-router'
import {BASE_STATIC_DIR, BASE_PAGE_DIR} from 'macros.js'

import 'HomeNoResult.less'
class HomeNoResult extends React.Component {
  render() {
    return (
      <div className="home-null-wrap">
        <div className="img-wrap">
          <img src={`${BASE_STATIC_DIR}/img/null-scene.png`} />
        </div>

        <div className="home-coming">
          <span><a href={`${BASE_PAGE_DIR}/scene/0`}>nice  in</a>  is  coming.</span>
          <p>敬请期待</p>
        </div>
        <ul className="link-servies">
          <li>客服电话：0755-26530336</li>
          <li>客服时间：周一至周五 9:00-18:00</li>
          <li>联系邮箱：kf@mielseno.com</li>
        </ul>
        <div className="nx-wrap"><img src={`${BASE_STATIC_DIR}/img/neixin.png`} /></div>
      </div>
    )
  }
}

export default HomeNoResult
