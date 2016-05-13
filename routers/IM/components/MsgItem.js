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
  prefixedZero = (num, length = 2) => {
    return ('0000' + num).slice(-length)
  };
  /**
   1 今天、昨天
    上午 xx:xx
   2 一年内
     x月x日  上午 xx:xx
   3 多于一年
     x年x月x日  上午 xx:xx
    相邻消息间隔>=X分钟显才示时间Label
   */
  getTimeLabel = (currentTime, lastTime) => {
    lastTime = lastTime || 0
    const IM_LABEL_INTERVAL = 0.3 * 60
    const ONE_DAY = 24 * 60 * 60
    const ONE_WEEK = 7 * 60 * 60
    const ONE_YEAR = 365 * ONE_DAY
    const WEEK_LABEL = ['日', '一', '二', '三', '四', '五', '六']

    if (currentTime - lastTime < IM_LABEL_INTERVAL) {
      return ''
    }

    let label,
        now = Date.now() / 1000,
        interval = now - currentTime,
        oCurrentDate = new Date(currentTime * 1000),
        Y = oCurrentDate.getFullYear(),
        M = this.prefixedZero(oCurrentDate.getMonth()),
        D = this.prefixedZero(oCurrentDate.getDate()),
        h = oCurrentDate.getHours(),
        _h = this.prefixedZero(h),
        m = this.prefixedZero(oCurrentDate.getMinutes()),
        s = this.prefixedZero(oCurrentDate.getMinutes())

    if (now - currentTime < ONE_DAY) {
      label = (h < 12? '上午' : '下午') + `: ${_h}:${m}`
    } else if (now - currentTime < ONE_DAY * 2) {
      label = '昨天' +  (h < 12? '上午' : '下午') + `: ${_h}:${m}`
    } else if (now - currentTime < ONE_YEAR) {
      label = `${M}月${D}日 ` + (h < 12? '上午' : '下午') + `: ${_h}:${m}`
    } else {
      label = `${Y}年${M}月${D}日 ` + (h < 12? '上午' : '下午') + `: ${_h}:${m}`
    }
    return label
  };
  render() {
    //${BASE_STATIC_DIR}/img/share-4.png


    let source = this.props.source
    let userInfo = this.props.userInfo
    let element
    let msgElement

    switch (source.msgType) {
      case 1:
        msgElement = source.txt
        break;
      case 2:
        msgElement = (<image src={`data:image/jpg;base64,${source.img}`} />)
        break;
      case 3:
        msgElement = (<a href={source.txt}>{source.txt}</a>)
        break;
      default:

    }

    element = source.msgType == 4?
    (
      <div className="product-wraper">
        <div className="flex-wraper">
          <div
            className="img-wraper"
            style={{backgroundImage: `url(${source.img})`}}
          >
          </div>
          <div className="pro-info">
            <div className="pro-name">{source.name}</div>
            <div className="pro-price arial">&yen;{source.price}</div>
          </div>
        </div>
        <div className="post-link" data-link={source.link}>发送链接</div>
      </div>
    ) :
    (
      <div
        className={source.roleType == 1? 'msg-wrap right-model' : 'msg-wrap'}
      >
        <div className="msg-col-1">
          {
            source.roleType == 2?
            (
              <div className="avatar-wrap"
               style={{backgroundImage:`url(${userInfo.headimg})`}}>
              </div>
            ) : ''
          }
        </div>
        <div className="msg-col-2">
          <div className="msg-arrow">
          </div>
          <div className="msg-contant">
            {msgElement}
          </div>
        </div>
        <div className="msg-col-3">
          {
            source.roleType == 1?
            (
              <div className="avatar-wrap"
               style={{backgroundImage:`url(${userInfo.headimg})`}}>
              </div>
            ) : ''
          }
        </div>
      </div>
    )

    let timeLabel = this.getTimeLabel(source.ts, this.props.lastTime)
    return (
	    <div className="msg-component">
        {
          timeLabel? (<div className="time-tips">{timeLabel}</div>) : ''
        }
        {element}
	    </div>
    )
  }
}
export default MsgItem
