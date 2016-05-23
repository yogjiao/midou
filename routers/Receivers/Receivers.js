import React from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'
import PageHeader from 'PageHeader/PageHeader.js'
import PageSpin from 'PageSpin/PageSpin.js'
import Prompt from 'Prompt/Prompt.js'
import Confirm from 'Confirm/Confirm.js'
import ReceiversItem from 'ReceiversItem.js'
import ScrollingSpin from 'ScrollingSpin/ScrollingSpin.js'
import {
  FETCH_RECEIVERS,
  FETCH_STATUS_NO_MORE_PRODUCT,
  DELETE_RECEIVERS,
  FETCH_SUCCESS,
  BASE_PAGE_DIR,
  CREATE,
  SELECT,
  RECEIVERS_EDIT,
  LS_RECEIVER,
  LS_IS_FRESH_RECEIVERS
} from 'macros.js'
import {fetchAuth} from 'fetch.js'
import provinces from 'provinces.js'
import {getParentByClass} from 'util.js'
import {backToNativePage, receiveNotificationsFromApp} from 'webviewInterface.js'
let update = require('react-addons-update')
import ua from 'uaParser.js'
import Hammer from 'hammerjs'


import './Receivers.less'
class Receivers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerName: '我的收货地址',
      isHiddenConfirm: true,
      confirmMsg: '你確定要刪除该收货人信息吗？',
      isHiddenPrompt: true,
      promptMsg: '收货人刪除成功',
      pageSize: 10,
      lastReceiver: 0,
      isHiddenPageSpin: false,
      isHiddenScrollingSpin: true,
      isFetching: false,
      isHaveaddress: true,
      receivers: []
    };

  }
  initState = () => {
    this.state.lastReceiver = 0
    this.state.receivers = []
    this.state.cities = []
  };
  deleteReceiver = (receiverId, index) => {
    let url = `${DELETE_RECEIVERS}/${receiverId}`
    this.setState({
      isFetching: true,
      isHiddenPageSpin: false,
      isHiddenConfirm: true
    })
    fetchAuth(url)
      .then((data) => {
        if (data.rea == FETCH_SUCCESS) {
          let nextState = update(this.state, {
            receivers: {$splice: [[index, 1]]},
            isHiddenPrompt: {$set: false}
          })
          this.setState(nextState)
          this.refs['prompt'].show();

          let persistenceReceiver
          try {
            persistenceReceiver = JSON.parse(localStorage.getItem(LS_RECEIVER))
            if (persistenceReceiver.id == receiverId) {
              localStorage.removeItem(LS_RECEIVER)
            }
          } catch (e) {}

        }
      })
      .catch((error) => {

      })
      .then(() => {
        this.setState({
          isFetching: false,
          isHiddenPageSpin: true,
          isHiddenScrollingSpin: true
        })
      })

  };
  fresh = () => {
    this.initState()
    return this.fetchListData()
  };
  freshWhenDetectingSignal = () => {
    clearTimeout(this.timer)
    try {
      if (localStorage.getItem(LS_IS_FRESH_RECEIVERS) == '1') {
        localStorage.removeItem(LS_IS_FRESH_RECEIVERS)
        this
          .fresh()
          .then(() => {
          })
      }
    } catch (e) {

    } finally {
      this.timer = setTimeout(() => {
        this.freshWhenDetectingSignal()
      }, 2000)
    }
  };
  fetchListData = (isScrollLoading) => {
    this.state.isFetching = true
    let url = `${FETCH_RECEIVERS}/${this.state.lastReceiver}/${this.state.pageSize}`
    if (isScrollLoading) {
      this.setState({isHiddenScrollingSpin: false})
    } else {
      this.setState({isHiddenPageSpin: false})
    }
    return fetchAuth(url)
      .then((data) => {
        if (data.rea == FETCH_STATUS_NO_MORE_PRODUCT) {

          this.state.isHaveaddress = false
          return
        }
        if (data.rea == FETCH_SUCCESS) {
          this.cities = this.cities? this.cities.concat(data.city) : data.city
          let nextState = update(this.state, {
            receivers: {$push: data.address},
            lastReceiver: {$set: data.address[data.address.length - 1].id}
          })
         this.setState(nextState)
        }
      })
      .catch((error) => {
        alert(error.message)
      })
      .then(() => {
        this.setState({
          isFetching: false,
          isHiddenPageSpin: true,
          isHiddenScrollingSpin: true
        })
      })
  };
  backHandler = () => {
    if (ua.isApp()) {
      backToNativePage()
        .then((data)=>{
          if (data.result == '1') {
            this.props.history.goBack()
          }
        })
    } else {
        this.props.history.goBack()
    }

  };
  handleScroll = () => {
    let scrollTop =  document.documentElement.scrollTop || window.pageYOffset ;
    let sHeight = window.innerHeight;//可视窗大小
    var pageHeight = document.documentElement.scrollHeight;
    if (scrollTop + sHeight > pageHeight - 30) {
      if (this.state.isHaveaddress && !this.state.isFetching){

        this.state.pageIndex++
        this.fetchListData(true)
      }
    }
  };
  deleteReceiverHandler = () => {
    this.deleteReceiver(this.dataId, this.dataIndex)
  };
  deleteCancelHandler = () => {
    this.setState({isHiddenConfirm: true})
  };
  crudHandler = (e) => {
    let target
    if (target = getParentByClass(e.target, 'icon-delete')) {
      this.dataId = target.getAttribute('data-id')
      this.dataIndex = target.getAttribute('data-index')
      this.deleteReceiverHandler()
      //this.setState({isHiddenConfirm: false})
    } else if (target = getParentByClass(e.target, 'receiver-select')){
      if (this.props.params.actionModel == SELECT){
        let receiver = target.getAttribute('data-source')
        localStorage.setItem(LS_RECEIVER, receiver)
        this.backHandler()
      }

    }
  };
  componentDidMount = () => {
    this.fetchListData()
    document.addEventListener('scroll', this.handleScroll);

    // get a reference to an element
    let target
    let maxDistance = 0
    let minDistance = 0
    let stage = ReactDOM.findDOMNode(this)
    let mc = new Hammer(stage);
    // subscribe to events
    mc.on('tap', (e) => {
      try {
        this.openTarget.style.transform = ''
      } catch (e) {}

      this.crudHandler(e)
    })
    mc.on('panstart', (e) => {
      target = getParentByClass(e.target || e.pointers[0].target, 'receivers-item-wrap')
      maxDistance = -(target.querySelector('.action-wrap').clientWidth)
      minDistance = -(target.querySelector('.action-wrap').firstChild.clientWidth)
    })
    mc.on('panmove', (e) => {
      if (target !== this.openTarget) {
        try {
          this.openTarget.style.transform = ''
        } catch (e) {

        }
      }
      if (target) {
        let x = Math.max(maxDistance, e.deltaX)
        target.style.transform = `translateX(${x}px)`
      }
    })
    mc.on('panend', (e) => {
      if (minDistance > e.deltaX) {
        target.style.transform = `translateX(${maxDistance}px)`
        this.openTarget = target
      } else {
        target.style.transform = ''
        target = null
      }
    })
    // mc.on('swipeleft', (e) => {
    //
    // })

    // window.addEventListener('storage', (e) => {
    //   if (e.key == LS_IS_FRESH_RECEIVERS) {
    //     localStorage.removeItem(LS_IS_FRESH_RECEIVERS, 1)
    //     this.fresh()
    //
    //   }
    // }, false);

    this.freshWhenDetectingSignal()

   receiveNotificationsFromApp(function(data){
     alert(JSON.stringify(data))
   })

  };
  componentWillUnmount = () => {
    clearTimeout(this.timer)
    document.removeEventListener('scroll', this.handleScroll);
  };
  componentWillUpdate = (nextProps, nextState) => {

  };
  render() {
    return (
      <div className="receivers-container">
      {
        ua.isApp()?
        '':
        (
          <PageHeader headerName={this.state.headerName}>
            <i className="iconfont icon-arrow-left" onClick={this.backHandler}></i>
            <a href={`${BASE_PAGE_DIR}/receiver/${CREATE}`}>新增地址</a>
          </PageHeader>
        )
      }

        <div className="list-wrap">
          <ul className="pro-list">
            {

              this.state.receivers.map((item, index) => {

                let province = provinces.find((province, index) => {
                  return province.id == item.province
                })
                let city = this.cities.find((city, index) => {
                  return city.id == item.city
                })
                item.provinceName = province.name
                item.cityName = city.name
                item.address = province.name + ' ' + city.name + ' ' + item.detail

                return <ReceiversItem key={index} {...item} index={index} actionModel={this.props.params.actionModel}/>;
              })
            }
            {
              this.state.receivers.length < 5?
              <a
                className="add-receiver-wrap"
                href={`${BASE_PAGE_DIR}/receiver/${CREATE}`}
              >
                <i className="iconfont icon-add"/>
                <span>添加收货人信息</span>
              </a>:
              ''
            }
          </ul>
          <ScrollingSpin isHidden={this.state.isHiddenScrollingSpin}/>
        </div>
        <Confirm
          confirmHandler={this.deleteReceiverHandler}
          isHidden={this.state.isHiddenConfirm}
          msg={this.state.confirmMsg}
          cancelHandler={this.deleteCancelHandler}
        />
        <PageSpin isHidden={this.state.isHiddenPageSpin}/>
        <Prompt isHidden={this.state.isHiddenPrompt} msg={this.state.promptMsg} ref="prompt" />
      </div>
    )
  }
}

module.exports = Receivers
