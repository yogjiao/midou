import React from 'react'
import PageSpin from 'PageSpin/PageSpin.js'
import Prompt from 'Prompt/Prompt.js'
import ScrollingSpin from 'ScrollingSpin/ScrollingSpin.js'

import {fetchable} from 'fetch.js'
import errors from  'errors.js'

import {getUserInfoFromApp} from 'webviewInterface.js'
import MsgItem from 'MsgItem.js'
import Input from 'Input.js'
import Contacts from 'Contacts.js'

import {getParentByClass} from 'util.js'
import {getMiDouToken} from 'commonApp.js'

import {
  FETCH_INDEX_DATA,
  FETCH_STATUS_NO_MORE_PRODUCT,
  FETCH_SUCCESS,
  BASE_STATIC_DIR,
  FETCH_SERVICE_HISTOR,
  PUT_MESSAGE,
  WS_URL
} from 'macros.js'
let update = require('react-addons-update')

import './IM.less'
class IM extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      pageIndex: 0,
      pageSize: 6,
      isHiddenPageSpin: true,
      isHiddenScrollingSpin: false,
      isFetching: false,
      isHaveGoods: true,
      goodsList: [],
      isExpect: false
    };

    this._uniqueId = 0;
  }
  uniqueId = () => {
    return this._uniqueId++;
  };
  createSocket = () => {
    this.ws = new WebSocket(WS_URL)
  };
  fetchHistoryData = (isScrollLoading) => {
    this.state.isFetching = true
    let url = `${FETCH_SERVICE_HISTOR}/${this.props.params.sceneId}/${this.state.pageIndex}/${this.state.pageSize}`
    let nextState = {}
    if (isScrollLoading) {
      nextState.isHiddenScrollingSpin = false
    } else {
      nextState.isHiddenPageSpin = false
    }
    this.setState(nextState)
    fetchable(url)
      .then((data) => {
        if (data.rea == FETCH_STATUS_NO_MORE_PRODUCT) {

          this.state.isHaveGoods = false
          if (this.state.pageIndex == 0) {
            this.setState({isExpect: true})
          } else {
            this.setState({isHiddenScrollingSpin: true})
          }
        } else if (data.rea == FETCH_SUCCESS) {
          let nextState = update(this.state, {
            goodsList: {$push: data.goods}
          })
          this.setState(nextState)
        } else {
          this.setState({promptMsg: errors[data.rea]})
          this.refs['prompt'].show()
        }

      })
      .catch((error) => {
      })
      .then(()=>{
        this.setState({
          isFetching: false,
          isHiddenPageSpin: true,
          //isHiddenScrollingSpin: true
        })
      })
  };
  handleScroll = () => {
    let scrollTop =  document.documentElement.scrollTop || window.pageYOffset ;
    let sHeight = window.innerHeight;//可视窗大小
    var pageHeight = document.documentElement.scrollHeight;
    if (scrollTop + sHeight > pageHeight - sHeight ) {
      if (this.state.isHaveGoods && !this.state.isFetching){
        this.setState({isHiddenScrollingSpin: false})
        this.state.pageIndex++
        this.fetchListData(true)
      }
    }
  };
  getSendMessage = () => {
    let msg = {}
    msg.id = 5005
    msg.recipient = '800'
    msg.txt = document.getElementById('textarea').value
    msg.token = getMiDouToken()
    msg.msgid = this.uniqueId()
    return msg

  };
  thisHandler = (e) => {//icon-add
    let target
    if (target = getParentByClass(e.target, 'icon-add')) {
      let msg = JSON.stringify(this.getSendMessage())
      this.ws.send(msg)
    }
  };
  componentDidMount = () => {
    this.createSocket()

    document.addEventListener('scroll', this.handleScroll);
  };
  componentWillUnmount = () => {
    document.removeEventListener('scroll', this.handleScroll);
  };
  // componentWillReceiveProps = (nextProps) => {
  //   debugger;
  // };
  // test = () => {
  //   '<div className="test" onClick={this.test}>点击获取用户信息</div>'
  //   getUserInfoFromApp()
  //     .then(function(data){
  //       alert(JSON.stringify(data));
  //     })
  // };
  render() {
    return (
        <div className="im-container" onClick={this.thisHandler}>
          <div className="layout-container">
            <div className="msg-container clearfix">
              <ScrollingSpin isHidden={this.state.isHiddenScrollingSpin}/>
              <MsgItem />
            </div>
            <Input />
          </div>
          <i className="iconfont icon-people btn-contacts"></i>
          <Contacts />
          <PageSpin isHidden={this.state.isHiddenPageSpin}/>
          <Prompt msg={this.state.promptMsg} refs="prompt"/>
        </div>
    )
  }
}
// Home.childContextTypes = {
//     pageSpin: React.PropTypes.node.isRequired
//   }
// Home.contextTypes = {
//     name: React.PropTypes.string.isRequired,
//     //router: React.PropTypes.func.isRequired
// }
// Home.context = {
//   //pageSpin: pageSpin
// }
module.exports = IM
