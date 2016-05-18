import React from 'react'
import {
  FETCH_INDEX_DATA,
  FETCH_STATUS_NO_MORE_PRODUCT,
  FETCH_SUCCESS,
  BASE_STATIC_DIR
} from 'macros.js'
import {getTimeLabel} from 'util.js'

import './MsgItem.less'
class MsgItem extends React.Component {
  constructor(props, context) {
    super(props, context);

  }
  /**
   1 今天、昨天
    上午 xx:xx
   2 一年内
     x月x日  上午 xx:xx
   3 多于一年
     x年x月x日  上午 xx:xx
    相邻消息间隔>=X分钟显才示时间Label
   */
  /**
   * @param currentTime {Number} seconds
   * @param lastTime {Number} [lastTime=0] seconds
   */
  isShouldShowTimeLabel = (currentTime, lastTime) => {
    lastTime = lastTime || 0
    const IM_LABEL_INTERVAL = 5 * 60

    return currentTime - lastTime > IM_LABEL_INTERVAL
  };

  render() {
    //${BASE_STATIC_DIR}/img/share-4.png


    let source = this.props.source
    let userInfo = this.props.userInfo
    let element
    let msgElement
    let elementClass = 'msg-wrap'

    switch (source.msgType) {
      case 1:
        msgElement = (<div className="msg-contant">{source.txt}</div>)
        break;
      case 2:
        elementClass += ' img-model'
        if (/.+\.(jpg|jpeg|png|gif)$/.test(source.img)) {
          msgElement = (
            <div className="msg-contant">
              <div
                className="img-wraper"
                style={{backgroundImage: `url(${source.img})`}}
              >
              </div>
            </div>)
        } else {
          if (source.img) {
            source.img = source.img.replace(/\r\n/ig, '')
          }
          msgElement = (
            <div className="msg-contant">
              <div
                className="img-wraper"
                style={{backgroundImage: `url(data:image/jpg;base64,${source.img})`}}
              >
              </div>
            </div>)
        }
        break;
      case 3:
        msgElement = (
          <div className="msg-contant">
            <a href={source.txt}>{source.txt}</a>
          </div>)
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
        className={source.roleType == 1?  `${elementClass} right-model` : elementClass}
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
          {msgElement}

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

    let timeLabel =  this.isShouldShowTimeLabel(source.ts, this.props.lastTime)?
      getTimeLabel(source.ts * 1000, true) : ''
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
