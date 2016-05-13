import React from 'react'
import ReactDOM from 'react-dom'
import PageSpin from 'PageSpin/PageSpin.js'
import Prompt from 'Prompt/Prompt.js'
import ScrollingSpin from 'ScrollingSpin/ScrollingSpin.js'

import errors from  'errors.js'

import {getUserInfoFromApp, calloutNativePhoto} from 'webviewInterface.js'
import MsgItem from 'MsgItem.js'
import Input from 'Input.js'
import Contacts from 'Contacts.js'
import ContactsItem from 'ContactsItem.js'
import {getParentByClass, REGEXP_URL} from 'util.js'
import {getMiDouToken} from 'commonApp.js'

import IScroll from 'IScroll/build/iscroll-probe.js'
import {
  FETCH_INDEX_DATA,
  FETCH_STATUS_NO_MORE_PRODUCT,
  FETCH_SUCCESS,
  BASE_PAGE_DIR,
  BASE_STATIC_DIR,
  WS_URL,
  TEST_TOKEN,
  FETCH_GOOD
} from 'macros.js'
import {fetchable, fetchAuth} from 'fetch.js'
let update = require('react-addons-update')
/*
id: 56
token: 'midouToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2LCJpYXQiOjE0NjIzNTM1NDUsImV4cCI6MTc3NzcxMzU0NX0.LzemqdTuWQosx33db7bCsLbjH4UHFArIZtZa_BJC8KE;'
+ 'expires=' + new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toGMTString();
*/

import './IM.less'
class IM extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      pageIndex: 0,
      pageSize: 6,
      isHiddenPageSpin: true,
      isHiddenScrollingSpin: true,
      isFetching: false,
      isHaveGoods: true,
      msgList: [],
      msgCached: {},
      isExpect: false,

      usersInfo: {},
      lastMsgId: 0,
      msgCountPerPage: 10,
      isFirstFetchHistoryMsg: true,
      isFetchingHistoryMsg: false,

      isHiddenContactsPanel: true,
      contactList: [],
      lastContactId: 0,
      contactCountPerPage: 20,
      isFirstFetchContact: true,
      isFetchingContacts: false,
      isHasContactsData: true,

      isSupport: false,
      isHiddenMediaWraper: true
    };
    this.friendId = this.props.params.friendId || 56
    this.productId = this.props.location.query.productId
    this._uniqueId = 0;
    alert(window.innerHeight)
  }
  uniqueId = () => {
    return ++this._uniqueId;
  };
  createSocket = () => {
    this.ws = new WebSocket(WS_URL)

    this.ws.onopen = (e) => {
        let params = {}
        params.id = 5001
        params.token = getMiDouToken() //|| TEST_TOKE
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

  createContactsScroller = () => {
    this.contactsScroller = new IScroll('#contacts-scroller', { probeType: 3, mouseWheel: true });
    this.fetchContacts()

    let scrollHandler = () => {
      if (!this.state.isHasContactsData) {
        this.contactsScroller.off('scroll', scrollHandler)
        return
      }
      let scroller = this.contactsScroller
      if (scroller.y - scroller.maxScrollY > 200) {
        this.fetchContacts()
      }
    }

    this.contactsScroller.on('scroll', scrollHandler);
  };
  refreshContact = (contacts) => {
    let contactList = this.state.contactList.filter((contact, index, list) => {
      return !contacts.some((item) => {item.sender == contact.sender})
    })

    contactList = contacts.concat(contactList)

    this.setState({contactList: contactList})

  };

  msgHandler = (data) => {
    if (data.r == '0') {
      alert(errors[data.rea]);
      return
    }

    let nextState
    switch (data.id) {
      case '5002': //get user infor

        this.state.userInfo = data.user // the user is logined currently
        this.setState({isSupport: data.user.role == '1'? true : false})
        // assume this fetched onece only
        this.fetchHistoryMsg()
        this.createContactsScroller()
        break;
      case '5004': //respond sending msg //client_msgid
        delete this.state.msgCached[data.chat.client_msgid]
        break;
      case '5006': // get history record
        this.state.usersInfo = Object.assign(this.state.usersInfo, data.users)
        this.state.lastMsgId = data.chats[0].id
        this.state.isFetchingHistoryMsg = false
        this.state.isHiddenScrollingSpin = true
        nextState = update(this.state, {msgList: {$unshift: data.chats}})
        if (nextState.isFirstFetchHistoryMsg) {//msgCount
          nextState.isFirstFetchHistoryMsg = false
          this.setState(nextState, () => {
            this.refreshMsgScrollerToEnd();
          })
          // get product info
          if (!this.state.isSupport) {
            this.sendProductMsgCard()
          }

        } else {
          this.setState(nextState, () => {
            this.msgScroller.refresh();

            let y = this.msgScrollerHeight - this.msgScroller.scrollerHeight
            this.msgScroller.scrollTo(0, y)
          })
        }
        break;
      case '5008': //contacts push from server
        this.state.isFetchingContacts = false

        if (data.rea == FETCH_STATUS_NO_MORE_PRODUCT) {
          this.state.isHasContactsData = false;
          return
        }

        this.state.lastContactId = data.chats[data.chats.length - 1].id
        nextState = update(this.state, {contactList: {$push: data.chats}})
        this.setState(nextState, () => {
          this.contactsScroller.options.startX = this.contactsScroller.x;
          this.contactsScroller.refresh();
        })
        // this.contactsScroller.updateCache(this.contactStart, data.chats)
        // this.contactsScroller.reorderInfinite()

        break;
      case '5009': //push msg from server
        this.state.usersInfo = Object.assign(this.state.usersInfo, data.users)
        this.state.lastMsgId = data.chats[0].id
        this.state.isFetchingHistoryMsg = false
        let msgs = data.chats.filter((item, index, chats) => {
          return item.sender == this.friendId
        })
        if (msgs && msgs.length) {
          nextState = update(this.state, {msgList: {$push: msgs}})
          this.setState(nextState, () => {
            this.refreshMsgScrollerToEnd();
          })
        }

        //build contacts
        let contacts = []
        data.chats.forEach((item, index, chats) => {
          let contact = Object.assign({}, item, this.state.usersInfo[item.sender])
          contacts.push(contact)
        })
        this.refreshContact(contacts);
        break;
      default:

    }
  };
  sendProductMsgCard = () => {
    if (!this.productId) return
    let url = `${FETCH_GOOD}/${this.productId}`
    return fetchable(url)
      .then((data) => {
        if (data.r != '1') return

        let msg = {}
        msg = {}
        msg.msgType = 4
        msg.img = data.goods.main_img
        msg.name = data.goods.name
        msg.price = data.goods.price
        msg.link = `${window.location.origin}${BASE_PAGE_DIR}/underwear/${this.productId}`
        msg.ts = Math.floor(Date.now() / 1000)
        msg.client_msgid = this.uniqueId()
        let nextState = update(this.state, {msgList: {$push: [msg]}})
        this.setState(nextState, () => {
          this.refreshMsgScrollerToEnd()
        })
      })
      .catch((error) => {
      })
  };
  getSendBaseInfo = () => {
    let msg = {}
    msg.id = 5003
    msg.recipient = this.friendId//? 85 : 56
    msg.token = getMiDouToken()// || TEST_TOKEN
    msg.client_msgid = this.uniqueId()
    msg.ts = Date.now() / 1000
    return msg
  };
  getSendMessage = () => {
    let msg = this.getSendBaseInfo()
    let textarea = document.getElementById('textarea')
    msg.txt = textarea.value
    textarea.value = ''
    return msg

  };
  getSendImg = (img) => {
    let msg = this.getSendBaseInfo()
    msg.img = img
    return msg
  };
  getSendLink = (link) => {
    let msg = this.getSendBaseInfo()
    msg.txt = link
    return msg
  };
  refreshMsgScrollerToEnd = () => {

    this.msgScroller.refresh();
    this.msgScroller.scrollTo(0, this.msgScroller.maxScrollY)
  };
  refreshMsgScrollerToTop = () => {
    this.msgScroller.refresh();
    this.msgScroller.scrollTo(0, 0)
  };

  fetchHistoryMsg = () => {
    if (this.state.isFetchingHistoryMsg) {
      return
    }
    this.msgScrollerHeight = this.msgScroller.scrollerHeight
    this.state.isFetchingHistoryMsg = true
    this.setState({isHiddenScrollingSpin: false}, () => {
      this.msgScroller.refresh()
    })
    let msg = {}
    msg.id = 5005
    msg.start_id = this.state.lastMsgId
    msg.count = this.state.msgCountPerPage
    msg.friend_id = getMiDouToken()//? 85 : 56
    msg.token = getMiDouToken()// || TEST_TOKEN

    this.ws.send(JSON.stringify(msg))

  };
  fetchContacts = (start, count) => {
    if (this.state.isFetchingContacts) {
      return
    }
    this.state.isFetchingContacts = true
    this.contactCount = Math.max(this.state.contactCountPerPage, count || 0)
    let msg = {}
    msg.id = 5007
    msg.start_id = this.state.lastContactId
    msg.count = this.contactCount
    msg.token = getMiDouToken() || TEST_TOKEN

    this.ws.send(JSON.stringify(msg))
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
      this.setState(nextState, () => {
        this.refs['input-wraper'].textareaChangeHandler()
        this.refreshMsgScrollerToEnd()
      })
      this.state.msgCached[msg.client_msgid] = msg
    } else if (target = getParentByClass(e.target, 'open-media-wraper')) {
      this.setState({isHiddenMediaWraper: false}, () => {
        this.refreshMsgScrollerToEnd()
      })
    } else if (target = getParentByClass(e.target, 'media-item')) {
      this.setState({isHiddenMediaWraper: true}, () => {
        this.refreshMsgScrollerToEnd()
      })
    } else if (target = getParentByClass(e.target, 'post-link')) {
      let msg = this.getSendLink(target.getAttribute('data-link'))
      let nextState
      this.ws.send(JSON.stringify(msg))

      delete msg.id
      msg.sender = this.state.userInfo.id
      nextState = update(this.state, {msgList: {$push: [msg]}})
      this.setState(nextState, (e) => {
        this.refreshMsgScrollerToEnd();
      })
      this.state.msgCached[msg.client_msgid] = msg

    } else if (target = getParentByClass(e.target, 'icon-camera')) {
      calloutNativePhoto()
        .then((data) => {
          let nextState
          let msg = this.getSendImg(data.img)
          this.ws.send(JSON.stringify(msg))

          delete msg.id
          msg.sender = this.state.userInfo.id
          nextState = update(this.state, {msgList: {$push: [msg]}})
          this.setState(nextState)
          this.state.msgCached[msg.client_msgid] = msg
        })
    } else if (target = getParentByClass(e.target, 'btn-contacts')) {
      this.setState({isHiddenContactsPanel: !this.state.isHiddenContactsPanel})
    } else if (target = getParentByClass(e.target, 'close-contacts')) {
      this.setState({isHiddenContactsPanel: !this.state.isHiddenContactsPanel})
    }
  };


  componentDidMount = () => {
    this.createSocket()
    this.msgScroller = new IScroll('#msg-scroller')
    this.msgScroller.on('scrollEnd', () => {
      if (this.msgScroller.y >= 0) {
          this.fetchHistoryMsg()
      }
    })

    //document.addEventListener('scroll', this.handleScroll);


  };
  componentWillUnmount = () => {

  };

  /*
    message type:
    roleType: 0-not everything; 1 meyself; 2 friend
    msgType bit message-type: 0 welcomoe; 1 text; 2 img; 3 link; 4 product card
  */
  render() {
    return (
        <div className="im-container" onClick={this.thisHandler}>
          <div className="layout-container">
            <div className="msg-container clearfix" id="msg-scroller">
              <div>
                {
                  this.state.isHiddenScrollingSpin?
                  '':
                  (<ScrollingSpin isHidden={false} />)

                }
                {

                  this.state.msgList.map((item, index, msgs) => {
                  //  debugger;
                    let userInfo = this.state.usersInfo[item.sender]
                    let lastTime = index == 0? '0' : msgs[index - 1].ts

                    if (item.msgType == 4) {
                      return (
                        <MsgItem
                          source={item}
                          lastTime={lastTime}
                          userInfo={userInfo}
                          key={item.client_msgid || item.id}
                        />
                      )
                    }
                    // role handle
                    if (item.sender == this.state.userInfo.id) {
                      item.roleType = 1
                    } else {
                      item.roleType = 2
                    }
                    // message handle
                    if (item.img) {
                      item.msgType = 2
                    } else if (REGEXP_URL.test(item.txt)) {
                      item.msgType = 3
                    } else {
                      item.msgType = 1
                    }
                    return (
                      <MsgItem
                        source={item}
                        lastTime={lastTime}
                        userInfo={userInfo}
                        key={item.client_msgid || item.id}
                      />
                    )
                  })
                }
              </div>
            </div>
            <Input isHiddenMediaWraper={this.state.isHiddenMediaWraper} ref="input-wraper" />
          </div>
          {
            this.state.isSupport?
            (<i className="iconfont icon-people btn-contacts"></i>) : ''
          }

          <Contacts
            isHidden={this.state.isHiddenContactsPanel}
            ws={this.ws}
            source={this.state.contactList}
          />
          <PageSpin isHidden={this.state.isHiddenPageSpin}/>
          <Prompt msg={this.state.promptMsg} refs="prompt"/>
        </div>
    )
  }
}
module.exports = IM
