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
  WS_URL,
  TEST_TOKEN
} from 'macros.js'
let update = require('react-addons-update')
/*
id: 56
token: 'midouToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2LCJpYXQiOjE0NjIzNTM1NDUsImV4cCI6MTc3NzcxMzU0NX0.LzemqdTuWQosx33db7bCsLbjH4UHFArIZtZa_BJC8KE'
*/
/*
微信信息日期展示

1 今天
xx:xx

2 一周内
星期x xx:xx

3 超过一周
2015年x月x日 xx:xx


相邻消息间隔>=X分钟显才示时间Label
*/
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
      msgList: [],
      msgCached: {},
      isExpect: false
    };

    this._uniqueId = 0;
  }
  uniqueId = () => {
    return ++this._uniqueId;
  };
  msgHandler = (data) => {
    switch (data.id) {
      case '5002': //get user infor
        this.state.userInfo = data.user
        break;
      case '5004': //respond sending msg //client_msgid
        delete this.state.msgCached[data.chat.client_msgid]
        break;
      case '5009': //push msg from server
        if (this.state.userInfo && !this.state.guestInfo) {
          for (var key in data.users) {
            if (key != this.state.userInfo.id) {
              this.state.guestInfo = data.users[key]
              break;
            }
          }
        }
        let nextState = update(this.state, {msgList: {$push: data.chats}})
        this.setState(nextState)
        break;
      default:

    }
  };
  getSendMessage = () => {
    let msg = {}
    msg.id = 5003
    msg.recipient = getMiDouToken()? 85 : 56
    msg.txt = document.getElementById('textarea').value
    msg.token = getMiDouToken() || TEST_TOKEN
    msg.client_msgid = this.uniqueId()
    msg.ts = Date.now() / 1000
    return msg

  };
  thisHandler = (e) => {//icon-add
    let target
    if (target = getParentByClass(e.target, 'btn-post')) {
      let msg = this.getSendMessage()
      let nextState

      this.ws.send(JSON.stringify(msg))

      delete msg.id
      msg.sender = this.state.userInfo.id
      nextState = update(this.state, {msgList: {$push: [msg]}})
      this.setState(nextState)
      this.state.msgCached[msg.client_msgid] = msg


    }
  };
  createSocket = () => {
    this.ws = new WebSocket(WS_URL)

    this.ws.onopen = function(e) {
        let params = {}
        params.id = 5001
        params.token = getMiDouToken() || TEST_TOKEN
        params = JSON.stringify(params)
        e.target.send(params)
		};
    this.ws.onmessage = (e) => {
      let data = JSON.parse(e.data)
      this.msgHandler(data)
    };
		this.ws.onclose = function(msg) {
		 console.log("Disconnected - status "+msg);
    }
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

  /*
    msg type:
    0: welcome
    1: myself text
    2: guest text
    3: myselt img
    4: guest img
    5: product info mest
  */
  render() {
    return (
        <div className="im-container" onClick={this.thisHandler}>
          <div className="layout-container">
            <div className="msg-container clearfix">
              <ScrollingSpin isHidden={this.state.isHiddenScrollingSpin} />
              {
                this.state.msgList.map((item, index, msgs) => {
                //  debugger;
                  let userInfo
                  if (item.sender == this.state.userInfo.id) {
                    item.msgType = 1
                    userInfo = this.state.userInfo
                  } else {//guestInfo
                    item.msgType = 2
                    userInfo = this.state.guestInfo
                  }
                  return (
                    <MsgItem
                      source={item}
                      userInfo={userInfo}
                      key={item.client_msgid || item.id}
                    />
                  )
                })
              }

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
