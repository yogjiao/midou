import React from 'react'
import ReactDOM from 'react-dom'
import {BASE_STATIC_DIR} from 'macros.js'

import './ShareToSocialMedia.less'

class ShareToSocialMedia extends React.Component {
  /*
  "type": "微博,QQ,朋友圈,微信朋友",
          "url": "网址",
          "title": "这是标题",
          "description": "这是描述",
          "imgUrl": "http://www.baidu.com"

  */
  render() {
    let style = {display: 'block'}
    if (this.props.isHidden) style.display = 'none'
    return (
      <div className="share-social-container" style={style} onClick={this.shareHandler}>
        <div className="blur-overlay"></div>
        <div className="share-content">
          <h6>分享至：</h6>
          <ul className="media-wrap">
            <li className="media-item" data-type="1">
                <div className="img-wrap"><img src={`${BASE_STATIC_DIR}/img/share-1.png`}/></div>
                <span className="share-name">朋友圈</span>
            </li>
            <li className="media-item" data-type="2">
                <div className="img-wrap"><img src={`${BASE_STATIC_DIR}/img/share-2.png`}/></div>
                <span className="share-name">微信</span>
            </li>
            <li className="media-item" data-type="3">
                <div className="img-wrap"><img src={`${BASE_STATIC_DIR}/img/share-3.png`}/></div>
                <span className="share-name">微博</span>
            </li>
            <li className="media-item" data-type="4">
                <div className="img-wrap"><img src={`${BASE_STATIC_DIR}/img/share-4.png`}/></div>
                <span className="share-name arial">QQ</span>
            </li>
          </ul>
          <div className="cancel-shrare">取消</div>
        </div>
      </div>
    )
  }
}

export default ShareToSocialMedia
