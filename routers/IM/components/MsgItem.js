import React from 'react'
import PageSpin from 'PageSpin/PageSpin.js'
import Prompt from 'Prompt/Prompt.js'
import ScrollingSpin from 'ScrollingSpin/ScrollingSpin.js'
import {
  FETCH_INDEX_DATA,
  FETCH_STATUS_NO_MORE_PRODUCT,
  FETCH_SUCCESS,
  BASE_STATIC_DIR
} from 'macros.js'
import {fetchable} from 'fetch.js'
import errors from  'errors.js'
let update = require('react-addons-update')

import {getUserInfoFromApp} from 'webviewInterface.js'

import './MsgItem.less'
class MsgItem extends React.Component {
  constructor(props, context) {
    super(props, context);

  }
  render() {
    return (
	    <div className="msg-component">
	      <div className="msg-wrap">
	        <div className="msg-col-1">
	           <div className="avatar-wrap"
	              style={{backgroundImage:`url(${BASE_STATIC_DIR}/img/share-4.png)`}}>
	           </div>
	        </div>
	        <div className="msg-col-2">
	          <div className="msg-arrow">

	          </div>
	          <div className="msg-contant">
	          d您好，Nice in内衣，  d您好，Nice in内衣，  d您好，Nice in内衣，  d您好，Nice in内衣，  d您好，Nice in内衣，  d您好，Nice in内衣，
	          </div>
	        </div>
	        <div className="msg-col-3">
	         <div className="avatar-wrap" style={{backgroundImage: `url(${BASE_STATIC_DIR}/img/share-4.png)`}}>  </div>
	        </div>
	      </div>

	      <div className="msg-wrap right-model">
	        <div className="msg-col-1">
	           <div className="avatar-wrap"
	              style={{backgroundImage:`url(${BASE_STATIC_DIR}/img/share-4.png)`}}>
	           </div>
	        </div>
	        <div className="msg-col-2">
	          <div className="msg-arrow">
	          </div>
	          <div className="msg-contant">
	          d您好，Nice in内衣
	          </div>
	        </div>
	        <div className="msg-col-3">
	         <div className="avatar-wrap" style={{backgroundImage: `url(${BASE_STATIC_DIR}/img/share-4.png)`}}>  </div>
	        </div>
	      </div>
	      <div className="time-tips">6:45</div>
	      <div className="msg-wrap right-model img-model">
	        <div className="msg-col-1">
	           <div className="avatar-wrap"
	              style={{backgroundImage:`url(${BASE_STATIC_DIR}/img/share-4.png)`}}>
	           </div>
	        </div>
	        <div className="msg-col-2">
	          <div className="msg-arrow">

	          </div>
	          <div className="msg-contant">
	            <image src={`${BASE_STATIC_DIR}/img/underwears-banner-1.jpg`} />
	          </div>
	        </div>
	        <div className="msg-col-3">
	         <div className="avatar-wrap" style={{backgroundImage: `url(${BASE_STATIC_DIR}/img/share-4.png)`}}>  </div>
	        </div>
	      </div>
	      <div className="product-wraper">
	        <div className="flex-wraper">
	          <div
	            className="img-wraper"
	            style={{backgroundImage: 'url(http://mielseno.com/view/photo/goods/56e28004d8bca-750.jpeg)'}}
	          >
	          </div>
	          <div className="pro-info">
	            <div className="pro-name">披星戴月来睡你</div>
	            <div className="pro-price arial">&yen;152</div>
	          </div>
	        </div>
	        <div className="post-link">发送宝贝链接</div>
	      </div>
	    </div>
    )
  }
}
export default MsgItem
