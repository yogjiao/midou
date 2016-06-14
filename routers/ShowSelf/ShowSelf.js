import React from 'react'
import PageSpin from 'PageSpin/PageSpin.js'
import ShowSelfItem from 'ShowSelfItem.js'
import Prompt from 'Prompt/Prompt.js'
import ScrollingSpin from 'ScrollingSpin/ScrollingSpin.js'
import Confirm from 'Confirm/Confirm.js'
import {
  FETCH_INDEX_DATA,
  FETCH_STATUS_NO_MORE_PRODUCT,
  FETCH_SUCCESS,
  BASE_STATIC_DIR,
  BASE_PAGE_DIR,
  FETCH_USER_SHOW_IMG,
  DELETE_USER_SHOW_IMG,
  EDIT,
  SCAN
} from 'macros.js'
import {fetchable, fetchAuth} from 'fetch.js'
import errors from  'errors.js'
import ShowSelfNoResult from 'ShowSelfNoResult.js'
let update = require('react-addons-update')
import {getParentByClass} from 'util.js'
import {receiveNotificationsFromApp} from 'webviewInterface.js'

import './ShowSelf.less'
class ShowSelf extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      pageIndex: 0,
      pageSize: 10,
      isHiddenPageSpin: false,
      isHiddenScrollingSpin: true,
      isFetching: false,
      isHaveShowImg: true,
      imageList: [],
      isExpect: false,

      isHiddenConfirm: true,

      model: SCAN
    };

  }
  fetchListData = (isScrollLoading) => {
    this.state.isFetching = true
    let url = `${FETCH_USER_SHOW_IMG}/0/0/${this.state.pageIndex}/${this.state.pageSize}`
    let nextState = {}
    if (isScrollLoading) {
      nextState.isHiddenScrollingSpin = false
    } else {
      nextState.isHiddenPageSpin = false
    }
    this.setState(nextState)
    fetchAuth(url)
      .then((data) => {
        if (data.rea == FETCH_STATUS_NO_MORE_PRODUCT) {

          this.state.isHaveShowImg = false
          if (this.state.pageIndex == 0) {
            this.setState({isExpect: true})
          } else {
            this.setState({isHiddenScrollingSpin: true})
          }
        } else if (data.rea == FETCH_SUCCESS) {
          let nextState = update(this.state, {
            imageList: {$push: data.images}
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
      if (this.state.isHaveShowImg && !this.state.isFetching){
        this.setState({isHiddenScrollingSpin: false})
        this.state.pageIndex++
        this.fetchListData(true)
      }
    }
  };
  thisHandler = (e) => {
    let target
    if (target = getParentByClass(e.target, 'icon-close')) {
      this.imageId = target.getAttribute('data-id')
      this.imageIndex = target.getAttribute('data-index')
      this.setState({isHiddenConfirm: false})
    }
  };
  componentDidMount = () => {
    this.fetchListData()
    document.addEventListener('scroll', this.handleScroll);


    receiveNotificationsFromApp((data, callback) => {
      if (data.type == '10') {// edit
        this.setState({model: EDIT})
      } else if (data.type == '11') {// complete
        this.setState({model: SCAN})
      }
    })


  };
  componentWillUnmount = () => {
    document.removeEventListener('scroll', this.handleScroll);
  };
  deleteShowImageHandler = () => {
    this.setState({isHiddenConfirm: true})
    let url = `${DELETE_USER_SHOW_IMG}/${this.imageId}`
    fetchAuth(url)
      .then((data) => {
        if (data.rea == FETCH_SUCCESS) {
          let nextState = update(this.state, {
            imageList: {$splice: [[this.imageIndex, 1]]}
          })

          nextState.promptMsg = '删除成功'


          this.setState(nextState)
        } else {
          this.setState({promptMsg: errors[data.rea]})
        }
      })
      .catch((error) => {
        this.setState({promptMsg: errors[error.rea]})
      })
      .then(()=>{
        this.refs['prompt'].show()
      })
  };
  deleteCancelShowImageHandler = () => {
    this.setState({isHiddenConfirm: true})
  };
  render() {
    return (
        <div className="home-container" onClick={this.thisHandler}>

          {
            this.state.isExpect?
            (<ShowSelfNoResult />):
            (
              <div className="list-wrap">
                <ul className="pro-list clearfix">
                  {
                    this.state.imageList.map((item, index) => {
                      return <ShowSelfItem
                        key={item.id}
                        index={index}
                        model={this.state.model}
                        {...item}

                      />;
                    })
                  }
                </ul>
                <ScrollingSpin isHidden={this.state.isHiddenScrollingSpin}/>
              </div>
            )
          }
          <PageSpin isHidden={this.state.isHiddenPageSpin}/>
          <Prompt msg={this.state.promptMsg} ref="prompt"/>
          <Confirm
            confirmHandler={this.deleteShowImageHandler}
            isHidden={this.state.isHiddenConfirm}
            msg={this.state.confirmMsg}
            cancelHandler={this.deleteCancelShowImageHandler}
          />
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
module.exports = ShowSelf
