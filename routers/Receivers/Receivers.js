import React from 'react'
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
  ROUTER_RECIEVER_INFO_ADD,
  RECEIVERS_EDIT} from 'macros.js'
import {fetchAuth} from 'fetch.js'
import provinces from 'provinces.js'
import {getParentByClass} from 'util.js'
let update = require('react-addons-update')


import './Receivers.less'
class Receivers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerName: '我的收貨地址',
      isHiddenConfirm: true,
      confirmMsg: '你確定要刪除改收貨人信息嗎？',
      isHiddenPrompt: true,
      promptMsg: '收貨人刪除成功',
      pageSize: 10,
      lastReceiver: 0,
      isHiddenPageSpin: false,
      isHiddenScrollingSpin: true,
      isFetching: false,
      isHaveaddress: true,
      receivers: []
    };

  }
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
  fetchListData = (isScrollLoading) => {
    this.state.isFetching = true
    let url = `${FETCH_RECEIVERS}/${this.state.lastReceiver}/${this.state.pageSize}`
    if (isScrollLoading) {
      this.setState({isHiddenScrollingSpin: false})
    } else {
      this.setState({isHiddenPageSpin: false})
    }
    fetchAuth(url)
      .then((data) => {
        if (data.rea == FETCH_STATUS_NO_MORE_PRODUCT) {
          this.state.isHaveaddress = false
          return
        }
        this.cities = data.city;
        let nextState = update(this.state, {
          receivers: {$push: data.address},
          lastReceiver: {$set: data.address[data.address.length - 1].id}
        })

        this.setState(nextState)
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
  backHandler = () => {
    this.props.history.goBack()
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
    if (target = getParentByClass(e.target, 'btn-delete')) {
      this.dataId = target.getAttribute('data-id')
      this.dataIndex = target.getAttribute('data-index')
      this.setState({isHiddenConfirm: false})
    } else if (target = getParentByClass(e.target, 'receivers-item')){
      if (!this.props.params.receiversModel){
        let receiver = target.getAttribute('data-source')
        localStorage.setItem('receiver', receiver);
        this.props.history.goBack();
      }
    }
  };
  componentDidMount = () => {
    this.fetchListData()
    document.addEventListener('scroll', this.handleScroll);
  };
  componentWillUnmount = () => {

    document.removeEventListener('scroll', this.handleScroll);
  };
  componentWillUpdate = (nextProps, nextState) => {

  };
  render() {
    return (
      <div className="receivers-container" onClick={this.crudHandler}>
        <PageHeader headerName={this.state.headerName}>
          <i className="iconfont" onClick={this.backHandler}>&#xe609;</i>
          {
            this.props.params.receiversModel == RECEIVERS_EDIT?
              (<Link to={`${BASE_PAGE_DIR}/receiver/${ROUTER_RECIEVER_INFO_ADD}`}>添加收货人</Link>):
              (<Link to={`${BASE_PAGE_DIR}/receivers/${RECEIVERS_EDIT}`}>管理</Link>)


          }

        </PageHeader>
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
                item.address = province.name + ' ' + city.name + ' ' + item.detail
                return <ReceiversItem key={index} {...item} index={index} receiversModel={this.props.params.receiversModel}/>;
              })
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
