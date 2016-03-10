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
  UNDERWEAR_BRA_SIZE,
  UNDERWEAR_BASE_SIZE,
  UNDERWEAR_TAGS,
  UNDERWEAR_TYPES,
  UNDERWEAR_SIZE
} from 'macros.js'
import {fetchable, fetchAuth} from 'fetch.js'
import {getParentByClass} from 'util.js'
let update = require('react-addons-update')

import UnderwearListItem from 'UnderwearListItem/UnderwearListItem.js'
import UnderwearSearchPanel from 'UnderwearSearchPanel.js'
import {backToUserCenterNativePage} from 'webviewInterface.js'
// import fetch from '../../components/fetch.js'


import './Underwears.less'
class Underwears extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerName: '所有单品',
      pageIndex: 0,
      pageSize: 6,
      isFetching: false,
      isHaveGoods: true,
      isHiddenPageSpin: false,
      isHiddenScrollingSpin: true,
      isHiddenSearchPanel: true,

      sizeIndex: 0,
      braSizeIndex: 0, // bra
      baseSizeIndex: 0, // base
      category: 0, //0: all, 1：文胸，2:底裤，3:情趣
      tagsIndex: new Array(UNDERWEAR_TAGS.length), // tags
      prolist: [
        //  {id: "1", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "/media/test.png"}
        ]
    }
    this.state.tagsIndex[0] = true

  }
  getSearchParams = () => {
    let size
    let tags
    if (this.state.category == 0) {
      size = 0
      tags = 0
    } else if (this.state.category == 1) {
      size = `${UNDERWEAR_BASE_SIZE[this.state.baseSizeIndex].value}-${UNDERWEAR_BRA_SIZE[this.state.braSizeIndex].value}`
      tags = []
      this.state.tagsIndex.forEach((is, index)=>{
        if (is) {
          tags.push(UNDERWEAR_TAGS[index].value)
        }
      })
    } else {
      size = UNDERWEAR_SIZE[this.state.sizeIndex].value
      tags = 0
    }

    return {size, tags}
  };
  fetchData = (isScrollingFetch = false) => {
     let fetchFn = fetchable

     let url

     if (this.props.route.path == 'collections') {
       url=`${FETCH_COLLECTIONS}/${this.state.pageIndex}/${this.state.pageSize}`
       fetchFn = fetchAuth
     } else {
       let {size, tags} = this.getSearchParams()
       url=`${FETCH_GOODS}/${size}/${this.state.category}/`
         + `${tags}/${this.state.pageIndex}/${this.state.pageSize}`
     }
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
  getDataAttributes = (target) => {
    return {
      source: target.getAttribute('data-source'),
      index: target.getAttribute('data-index')
    }
  };
  searchHandler = (e) => {
    let target,
        nextState;
    if (target = getParentByClass(e.target, 'cat')) {
      let {source, index} = this.getDataAttributes(target)
      nextState = update(this.state, {category: {$set: index}})
    } else if (target = getParentByClass(e.target, 'base-item')) {
      let {source, index} = this.getDataAttributes(target)
      nextState = update(this.state, {baseSizeIndex: {$set: index}})
    } else if (target = getParentByClass(e.target, 'bra-item')) {
      let {source, index} = this.getDataAttributes(target)
      nextState = update(this.state, {braSizeIndex: {$set: index}})
    } else if (target = getParentByClass(e.target, 'tag')) {
      let {source, index} = this.getDataAttributes(target)
      if (target.classList.contains('on')) {
        if (index == 0) {

        } else {
          let splice = [[index, 1, false]]
          let isHasOtherSelected = this.state.tagsIndex.some((value, tagIndex) => {
            return !!tagIndex && index != tagIndex && !!value
          })
          if (!isHasOtherSelected) {
            splice.push([0, 1, true])
          }
          nextState = update(this.state, {tagsIndex: {$splice: splice}})
        }

      } else {
        if (index == 0) {
          nextState = {}
          nextState.tagsIndex = new Array(UNDERWEAR_TAGS.length)
          nextState.tagsIndex[0] = true
        } else {
          let splice = [[index, 1, true]]
          if (this.state.tagsIndex[0]) {
            splice.push([0, 1, false])
          }
          nextState = update(this.state, {tagsIndex: {$splice: splice}})
        }
      }
    } else if (target = getParentByClass(e.target, 'size-item')){
      let {source, index} = this.getDataAttributes(target)
      nextState = update(this.state, {
        sizeIndex: {$set: index},
        pageIndex: {$set: 0}
      })
    } else if (target = getParentByClass(e.target, 'btn-sure')) {
      this.state.pageIndex = 0
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
      this.state.pageIndex ++
      this.fetchData(true)
    }
  };
  openFilterHanler = () => {
    this.setState({isHiddenSearchPanel: false})
  };
  backHandler = () => {
    if (this.props.route.path == 'collections') {
      backToUserCenterNativePage()
        .then((data)=>{

        })
    } else {
      this.props.history.goBack();
    }

  };
  componentWillMount = () => {
    if (this.props.route.path == "collections") {
      this.state.headerName = '我的收藏'
    }
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
        {
          this.props.route.path == 'collections'?
          <div className="iconfont" onClick={this.backHandler}>&#xe609;</div>:
          <div></div>
        }

         {
           this.props.route.path == "underwears"?
           (<div className="menu-search" onClick={this.openFilterHanler}>筛选</div>):
           ''
         }

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

module.exports = Underwears
