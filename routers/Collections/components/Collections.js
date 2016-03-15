import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import PageHeader from 'PageHeader/PageHeader.js'
import PageSpin from 'PageSpin/PageSpin.js'
import ScrollingSpin from 'ScrollingSpin/ScrollingSpin.js'
import {
  FETCH_GOODS,
  FETCH_COLLECTIONS,
  FETCH_STATUS_NO_MORE_PRODUCT,
  FETCH_SUCCESS,
  UNDERWEAR_BRA_SIZE,
  UNDERWEAR_BASE_SIZE,
  UNDERWEAR_TAGS,
  UNDERWEAR_TYPES,
  UNDERWEAR_SIZE,
  BASE_PAGE_DIR
} from 'macros.js'
import {fetchable, fetchAuth} from 'fetch.js'
import {getParentByClass} from 'util.js'
let update = require('react-addons-update')

import UnderwearListItem from 'UnderwearListItem/UnderwearListItem.js'
import CollectionsNoResult from 'CollectionsNoResult.js'
import {backToNativePage} from 'webviewInterface.js'
// import fetch from '../../components/fetch.js'


import './Collections.less'
class Collections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerName: '我的收藏',
      pageIndex: 0,
      pageSize: 6,
      isFetching: false,
      isHaveGoods: true,
      isHiddenPageSpin: false,
      isHiddenScrollingSpin: true,
      isHiddenSearchPanel: true,
      isNull: false,

      sizeIndex: 0,
      braSizeIndex: 0, // bra
      baseSizeIndex: 0, // base
      category: 0, //0: all, 1：文胸，2:底裤，3:情趣
      tagsIndex: [0],//new Array(UNDERWEAR_TAGS.length), // tags
      prolist: [
        //  {id: "1", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "/media/test.png"}
        ]
    }

  }
  fetchData = (isScrollingFetch = false) => {
     let fetchFn = fetchable

     let url

     url=`${FETCH_COLLECTIONS}/${this.state.pageIndex}/${this.state.pageSize}`
     fetchFn = fetchAuth
     this.state.isFetching = true
     let nextState = {
       isHiddenScrollingSpin: isScrollingFetch? false : true,
       isHiddenPageSpin: isScrollingFetch? true : false
     }

     this.setState(nextState)

     fetchFn(url)
       .then((data) => {
         if (data.rea == FETCH_STATUS_NO_MORE_PRODUCT) {
           this.state.isHaveGoods = false
           if (this.state.pageIndex == 0) {
             this.setState({isNull: true})
           }
         } else if (data.rea == FETCH_SUCCESS) {
           let nextState = update(this.state, {
             prolist: {$push: data.goods}
           })
           this.setState(nextState)
         }
       })
       .catch((error) => {
       })
       .then(() => {
         this.setState({
           isFetching: false,
           isHiddenPageSpin: true,
           isHiddenScrollingSpin: true,
           isHiddenSearchPanel: {$set: true}
         })
       })

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
      this.state.pageIndex ++
      this.fetchData(true)
    }
  };
  openFilterHanler = () => {
    this.setState({isHiddenSearchPanel: false})
  };
  backHandler = () => {
    backToNativePage()
      .then((data)=>{

      })

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
        <PageHeader headerName={this.state.headerName}>
          <div className="iconfont" onClick={this.backHandler}>&#xe609;</div>
        </PageHeader>
        {
          this.state.isNull?
          (<CollectionsNoResult />):
          (
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
          )
        }

        <PageSpin isHidden={this.state.isHiddenPageSpin}/>
      </div>
    )
  }
}

module.exports = Collections
