import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import PageHeader from 'PageHeader/PageHeader.js'
import PageSpin from 'PageSpin/PageSpin.js'
import ScrollingSpin from 'ScrollingSpin/ScrollingSpin.js'
import {FETCH_GOODS, FETCH_STATUS_NO_MORE_PRODUCT} from 'macros.js'
import {fetchable} from 'fetch.js'
import {getParentByClass} from 'util.js'
let update = require('react-addons-update')

import UnderwearListItem from 'UnderwearListItem/UnderwearListItem.js'
import UnderwearSearchPanel from 'UnderwearSearchPanel.js'

// import fetch from '../../components/fetch.js'


import './UnderwearList.less'
class UnderwearList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0,
      pageSize: 2,
      isFetching: false,
      isHaveGoods: true,
      isHiddenPageSpin: false,
      isHiddenScrollingSpin: true,
      isHiddenSearchPanel: true,

      size: 0,
      braSize: 0, // bra
      baseSize: 0, // bra
      category: 0, //0: all, 1：文胸，2:底裤，3:情趣
      tags: [], // tags
      prolist: [
        //  {id: "1", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "/media/test.png"}
        ]
    };

  }
  fetchData = (isScroll = false) => {
     let size = this.state.size
     let tags = this.state.tags
     if (this.state.category == '1') {
       size = `${this.state.baseSize}-${this.state.braSize}`
     } else if (this.state.category == '0') {
       size = 0
     }
     if (tags.length == 0) {
       tags = 0
     }
     let url=`${FETCH_GOODS}/${size}/${this.state.category}/`
       + `${tags}/${this.state.pageIndex}/${this.state.pageSize}`
     this.state.isFetching = true
     let nextState = {
       isHiddenScrollingSpin: isScroll? false : true,
       isHiddenPageSpin: isScroll? true : false
     }

     this.setState(nextState)

     fetchable(url)
       .then((data) => {
         if (data.rea == FETCH_STATUS_NO_MORE_PRODUCT) {
           this.state.isHaveGoods = false
         }
         let nextState = update(this.state, {
           prolist: {$push: data.goods},
           isFetching:{$set: false},
           isHiddenPageSpin: {$set: true},
           isHiddenScrollingSpin: {$set: true},
           isHiddenSearchPanel: {$set: true}
         })
         this.setState(nextState)
       })
       .catch((error) => {
         this.setState({
           isFetching: false,
           isHiddenPageSpin: true,
           isHiddenScrollingSpin: true,
           isHiddenSearchPanel: {$set: true}
         })
       })

  };
  searchHandler = (e) => {
    let target,
        nextState;
    if (target = getParentByClass(e.target, 'cat')) {
      nextState = {}
      let category = target.getAttribute('data-category')
      nextState = update(this.state, {category: {$set: category}})
    } else if (target = getParentByClass(e.target, 'base-item')) {
      nextState = {}
      let baseSize = target.getAttribute('data-val')
      nextState = update(this.state, {baseSize: {$set: baseSize}})
    } else if (target = getParentByClass(e.target, 'bra-item')) {
      nextState = {}
      let braSize = target.getAttribute('data-val')
      nextState = update(this.state, {braSize: {$set: braSize}})
    } else if (target = getParentByClass(e.target, 'tag')) {
      nextState = {}
      let tag = target.getAttribute('data-tag')
      let index = this.state.tags.indexOf(tag)
      if (target.classList.contains('on')) {
        nextState = update(this.state, {tags: {$splice: [[index, 1]]}})
      } else {
        nextState = update(this.state, {tags: {$splice: [[index, 0, tag]]}})
      }
    } else if (target = getParentByClass(e.target, 'size-item')){
      nextState = {}
      let size = target.getAttribute('data-val')
      nextState = update(this.state, {size: {$set: size}})
    } else if (target = getParentByClass(e.target, 'btn-sure')) {
      this.state.isHaveGoods = true
      this.state.prolist = []
      this.fetchData()
    }
    else if (target = getParentByClass(e.target, 'btn-close')) {
      nextState = {}
      nextState.isHiddenSearchPanel = true
    }
    nextState && this.setState(nextState)
  };
  /**
   * check the page whether changed or not when scrolling
   */
  scrollingHandler = () => {
    let scrollTop =  document.documentElement.scrollTop || window.pageYOffset ;
    let sHeight = window.innerHeight;//可视窗大小
    var pageHeight = document.documentElement.scrollHeight;
    if (scrollTop + sHeight > pageHeight - 30) {
      if (this.state.isFetching || !this.state.isHaveGoods) return

      this.setState({isHiddenScrollingSpin: false})
      this.state.pageIndex++
      this.fetchData(true)
    }
  };
  openFilterHanler = () => {
    this.setState({isHiddenSearchPanel: false})
  };
  backHandler = () => {
    let test = this;
    this.props.history.goBack();
  };
  componentWillUnmount = () => {
    document.removeEventListener('scroll', this.scrollingHandler);
  };
  componentDidMount = () => {
    this.fetchData();
    document.addEventListener('scroll', this.scrollingHandler);
  };
  render() {
    return (
      <div className="uw-list-container">
        <PageHeader headerName="所有单品">
         <div className="iconfont" onClick={this.backHandler}>&#xe609;</div>
          <div className="menu-search" onClick={this.openFilterHanler}>筛选</div>
        </PageHeader>
        <div className="list-wrap">
          <div className="adjuxt-wrap clearfix">
              {
                this.state.prolist.map(function(item) {
                  return <UnderwearListItem key={item.id} source={item}/>;
                })
              }
            </div>
          <ScrollingSpin isHidden={this.state.isHiddenScrollingSpin}/>
        </div>
        <UnderwearSearchPanel
          isHidden={this.state.isHiddenSearchPanel}
          {...this.state}
          searchHandler={this.searchHandler}
        />
        <PageSpin isHidden={this.state.isHiddenPageSpin}/>
      </div>
    )
  }
}

module.exports = UnderwearList
