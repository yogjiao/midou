import React from 'react'
import PageSpin from 'PageSpin/PageSpin.js'
import HomeListItem from 'HomeListItem.js'
import ScrollingSpin from 'ScrollingSpin/ScrollingSpin.js'
import {FETCH_INDEX_DATA, FETCH_STATUS_NO_MORE_PRODUCT, BASE_STATIC_DIR} from 'macros.js'
import {fetchable} from 'fetch.js'
let update = require('react-addons-update')

import {getUserInfoFromApp} from 'webviewInterface.js'

import './Home.less'
class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      pageIndex: 0,
      pageSize: 2,
      isHiddenPageSpin: false,
      isHiddenScrollingSpin: true,
      isFetching: false,
      isHaveGoods: true,
      goodsList: [],
      isExpect: false
    };

  }
  fetchListData = (isScrollLoading) => {
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
          }
        }
        let nextState = update(this.state, {
          goodsList: {$push: data.goods}
        })
        this.setState(nextState)
      })
      .catch((error) => {
      })
      .then(()=>{
        this.setState({
          isFetching: false,
          isHiddenPageSpin: true,
          isHiddenScrollingSpin: true
        })
      })
  };
  handleScroll = () => {
    let scrollTop =  document.documentElement.scrollTop || window.pageYOffset ;
    let sHeight = window.innerHeight;//可视窗大小
    var pageHeight = document.documentElement.scrollHeight;
    if (scrollTop + sHeight > pageHeight - 50) {
      if (this.state.isHaveGoods && !this.state.isFetching){
        this.setState({isHiddenScrollingSpin: false})
        this.state.pageIndex++
        this.fetchListData(true)
      }
    }
  };
  componentDidMount = () => {
    this.fetchListData()
    document.addEventListener('scroll', this.handleScroll.bind(this));
  };
  componentWillUnmount = () => {

    document.removeEventListener('scroll', this.handleScroll.bind(this));
  };
  // test = () => {
  //   '<div className="test" onClick={this.test}>点击获取用户信息</div>'
  //   getUserInfoFromApp()
  //     .then(function(data){
  //       alert(JSON.stringify(data));
  //     })
  // };
  render() {
    return (
        <div className="home-container">
          <div className="bg-wrap">
          </div>
          {
            this.state.isExpect?
            (<div className="expext-wrap"><img src={`${BASE_STATIC_DIR}/img/expect.png`}/></div>):
            (
              <div className="list-wrap">
                <ul className="pro-list">
                  {
                    this.state.goodsList.map(function(pro) {
                      return <HomeListItem key={pro.id} {...pro}/>;
                    })
                  }
                </ul>
                <ScrollingSpin isHidden={this.state.isHiddenScrollingSpin}/>
              </div>
            )
          }
          <PageSpin isHidden={this.state.isHiddenPageSpin}/>
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
module.exports = Home
