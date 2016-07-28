import React from 'react'
import PageSpin from 'PageSpin/PageSpin.js'
import BuyingsItem from 'BuyingsItem.js'
import Prompt from 'Prompt/Prompt.js'
import ScrollingSpin from 'ScrollingSpin/ScrollingSpin.js'
import {
  FETCH_INDEX_DATA,
  FETCH_STATUS_NO_MORE_PRODUCT,
  FETCH_SUCCESS,
  BASE_STATIC_DIR,
  BASE_PAGE_DIR,
  FETCH_BUYINGS
} from 'macros.js'
import {fetchAuth} from 'fetch.js'
import errors from  'errors.js'
import BuyingsNoResult from 'BuyingsNoResult.js'
let update = require('react-addons-update')
import {getParentByClass} from 'util.js'
import {getUserInfoFromApp, receiveNotificationsFromApp} from 'webviewInterface.js'

import './Buyings.less'
class Buyings extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      pageIndex: 0,
      pageSize: 6,
      isHiddenPageSpin: false,
      isHiddenScrollingSpin: true,
      isFetching: false,
      isHaveGoods: true,
      goodsList: [],
      isExpect: false,

      selectionsIndex: [] // index
    };

  }
  fetchListData = (isScrollLoading) => {
    this.state.isFetching = true
    let url = `${FETCH_BUYINGS}/${this.state.pageIndex}/${this.state.pageSize}`
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
    this.fetchListData()
    document.addEventListener('scroll', this.handleScroll);

    receiveNotificationsFromApp((data, callback) => {
      if (data.type == '14') {
        let data = {}
        data.data = this.state.selectionsIndex.map((item, index) => {
          return  this.state.goodsList[item]
        })
        callback(data)
      }
    })
  };
  componentWillUnmount = () => {
    document.removeEventListener('scroll', this.handleScroll);
  };
  thisHandler = (e) => {
    let target
    let nextState
    if (target = getParentByClass(e.target, 'buyings-item')) {
      let index = target.getAttribute('data-index')
      let isSelected = target.getAttribute('data-is-selected')
      if (isSelected == "true") {
        let num = this.state.selectionsIndex.findIndex((item, num) => {
          return item ==  index
        })

        nextState = update(this.state, {selectionsIndex: {$splice:[[num, 1]]}})
      } else {
        nextState = update(this.state, {selectionsIndex: {$push: [index]}})
      }
    }

    nextState && this.setState(nextState)
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
        <div className="home-container" onClick={this.thisHandler}>

          {
            this.state.isExpect?
            (<BuyingsNoResult />):
            (
              <div className="list-wrap">
                <ul className="pro-list">
                  {
                    this.state.goodsList.map((item, index) => {
                      let isSelected = this.state.selectionsIndex.some((select, num) => {
                        return  select == index
                      })
                      let isDisable = false

                      if (!isSelected && this.state.selectionsIndex.length > 3) {
                        isDisable = true
                      }
                      return <BuyingsItem
                        key={index}
                        {...item}
                        index={index}
                        isSelected={isSelected}
                        isDisable={isDisable}
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
module.exports = Buyings
