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
import MsgItem from 'MsgItem.js'
import Input from 'Input.js'
import Contacts from 'Contacts.js'

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

  }
  fetchHistoryData = (isScrollLoading) => {
    this.state.isFetching = true
    let url = `${FETCH_INDEX_DATA}/${this.props.params.sceneId}/${this.state.pageIndex}/${this.state.pageSize}`
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
  autoHeightHandler = (e) => {
    e.target.style.height = 0
    let h = e.target.scrollHeight
    e.target.style.height = h + 'px'
    if (e.target.value) {
      this.refs['btn-post'].style.display = 'block'
      this.refs['icon-add'].style.display = 'none'
    } else {
      this.refs['btn-post'].style.display = 'none'
      this.refs['icon-add'].style.display = 'block'
    }
  };
  componentDidMount = () => {
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
        <div className="im-container">
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
