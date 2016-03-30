import React from 'react'
import ReactDOM from 'react-dom'

import {BASE_STATIC_DIR} from 'macros.js'
import {shareToSocialCircle, backToNativePage} from 'webviewInterface.js'
import Prompt from 'Prompt/Prompt.js'

import './ShareToSocialMedia.less'

class ShareToSocialMedia extends React.Component {
  /*
  "type": "微博,QQ,朋友圈,微信朋友",
          "url": "网址",
          "title": "这是标题",
          "description": "这是描述",
          "imgUrl": "http://www.baidu.com"

  */

  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
      promptMsg: ''
    };

  };
  show = () => {
    this.setState({isHidden: false})
  };
  hide = () => {
    this.setState({isHidden: true})
  };
  thishandler = () => {
    let target
    let nextState;
    if (target = getParentByClass(e.target, 'media-item')) {
      nextState = {}
      let type = target.getAttribute('data-type')
      let data = {}
      data.type = type
      data.url = this.props.url
      data.title = this.props.title
      data.description = this.props.description
      data.imgUrl = this.props.imgUrl
      shareToSocialCircle(data)
        .then( (data) => {
          if (data.result == '1') {
            this.setState({promptMsg: '分享成功'})
          } else {
            this.setState({promptMsg: '分享失败'})
          }
        })
        .then(()=>{
          this.refs['prompt'].show()
        })
      nextState.isHiddenSharePanel = true
    } else if (target = getParentByClass(e.target, 'cancel-shrare')) {
      nextState = {}
      nextState.isHidden = true
    }
    nextState && this.setState(nextState)
  };
  render() {
    let style = {display: 'block'}
    if (this.state.isHidden) style.display = 'none'
    return (
      <div className="share-social-container" style={style} onClick={this.thisHandler}>
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
        <Prompt msg={this.state.promptMsg}/>
      </div>
    )
  }
}

export default ShareToSocialMedia
