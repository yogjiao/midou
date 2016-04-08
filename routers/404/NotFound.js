import React from 'react'
import {Link} from 'react-router'
import {BASE_STATIC_DIR, BASE_PAGE_DIR} from 'macros.js'
import {backToHomeNativePage} from 'webviewInterface.js'
import './NotFound.less'
class NotFound extends React.Component {

  render() {
    return (
      <div className="not-found-wrap">
        <div className="img-wrap">
          <img src={`${BASE_STATIC_DIR}/img/404.png`} />
        </div>

        <div className="home-coming">
          <p>哎呀，您访问的页面不存在！</p>
          <span>Return  to  the homepage.</span>
        </div>
        <div className="nx-wrap"><a href={`${BASE_PAGE_DIR}/scene/0`}><img src={`${BASE_STATIC_DIR}/img/neixin.png`} /></a></div>
      </div>
    )
  }
}

module.exports = NotFound
