import React from 'react'
import PageSpin from 'PageSpin/PageSpin.js'
import ScrollingSpin from 'ScrollingSpin/ScrollingSpin.js'
import {
  FETCH_STATUS_NO_MORE_PRODUCT,
  FETCH_SUCCESS,
  BASE_STATIC_DIR,
  BASE_PAGE_DIR,
  FETCH_NICE_SHOW,
  FETCH_NICE_SHOWS,
  FETCH_GOOD
} from 'macros.js'
import {fetchable, fetchAuth, fetchOption} from 'fetch.js'
import errors from  'errors.js'
let update = require('react-addons-update')
import {getParentByClass} from 'util.js'
import AdditionalTips from './AdditionalTips.js'
import ShowItem from 'ShowItem/ShowItem.js'
import Hammer from 'hammerjs'
import ShareToSocialMedia from 'ShareToSocialMedia/ShareToSocialMedia.js'
import Swiper from 'Swiper'

import './NiceShowlayout.less'
class NiceShowlayout extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isHiddenPageSpin: true,
      isHiddenScrollingSpin: true,


      isHiddenConfirm: true,
      isHiddenComments: true,
      isHiddenMoreMenu: true,

      goodsDetail: {}, // {ids: {}, ids: {}}

      isFetchingShows: false,
      niceShows: {shows: [], pageIndex: 0, pageSize: 5, isHaveShows: true},

      currentDetailGoodsId: null,
      currentNiceShowGoodsId: null,

      showPart: 0, //0: part-one  1: part-two
      willShowPart: 0,

      detailTabIndex: 0,
      willDetailTabIndex: 0,
    };


  }
  // fetchShowData = () => {
  //   let url = `${FETCH_NICE_SHOW}/${this.props.params.showId}`
  //   this.setState({isHiddenPageSpin: false})
  //   fetchable(url)
  //     .then((data) => {
  //       if (data.rea == FETCH_SUCCESS) {
  //         this.setState({showData: data.show, goodsSelectedId: data.show.goods[0].id})
  //       } else {
  //         throw new Error(errors[data.rea])
  //       }
  //
  //     })
  //     .catch((error) => {
  //
  //     })
  //     .then(()=>{
  //       this.setState({
  //         isHiddenPageSpin: true,
  //         //isHiddenScrollingSpin: true
  //       })
  //     })
  // };
  fetchDetailData = (goodsId) => {
    let url = `${FETCH_GOOD}/${goodsId}`
    this.setState({isHiddenPageSpin: false})
    fetchable(url)
      .then((data) => {
        if (data.rea == FETCH_SUCCESS) {
          this.state.currentGoodsId = goodsId
          this.state.goodsDetail[data.goods.id] = data.goods
          //this.props.goodsDataChangeHandler(data.goods)
          //debugger;
          this.forceUpdate()
        } else {
          throw new Error(errors[data.rea])
        }

      })
      .catch((error) => {
      })
      .then(()=>{
        this.setState({
          isHiddenPageSpin: true,
          //isHiddenScrollingSpin: true
        })
      })
  };
  fetchShowsData = () => {
    this.state.isFetchingShows = true
    let url = `${FETCH_NICE_SHOWS}/${this.state.niceShows.pageIndex}/${this.state.niceShows.pageSize}/${this.state.currentNiceShowGoodsId}`
    let nextState = {}
    if (this.state.pageIndex == 0) {
      nextState.isHiddenScrollingSpin = false
    } else {
      nextState.isHiddenPageSpin = false
    }
    this.setState(nextState)
    fetchOption(url)
      .then((data) => {
        if (data.rea == FETCH_STATUS_NO_MORE_PRODUCT) {
          this.state.niceShows.isHaveShows = false
          if (!this.state.pageIndex) {
            this.setState({isExpect: true})
          } else {
            this.setState({isHiddenScrollingSpin: true})
          }
        } else if (data.rea == FETCH_SUCCESS) {
          let nextState = update(this.state, {
            niceShows: {shows: {$push: data.shows}}
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
          isFetchingShows: false,
          isHiddenPageSpin: true,
          isHiddenScrollingSpin: true
        })
      })
  };
  thisHandler = (e) => {
    let target
    if (target = getParentByClass(e.target, 'icon-ellipsis')) {
      this.setState({isHiddenMoreMenu: false})
    } else if (target = getParentByClass(e.target, 'icon-share')) {
      this.setState({isHiddenMoreMenu: true})
      this.refs['share'].show()
    } else if (target = getParentByClass(e.target, 'icon-delete')) {
      this.setState({isHiddenMoreMenu: true, isHiddenConfirm: false})
    } else if (target = getParentByClass(e.target, 'tab-item')) {
      let index = parseInt(target.getAttribute('data-index'))
      this.setState({detailTabIndex: index})

      if (index == 1) {
        if (this.state.currentNiceShowGoodsId != this.props.goodsSelectedId) {
          this.state.niceShows.shows = []
          this.state.niceShows.pageIndex = 0
          this.state.niceShows.isHaveShows = true

          this.state.currentNiceShowGoodsId = this.props.goodsSelectedId
          this.fetchShowsData()
        }

      }

    }
    //  else if (target = getParentByClass(e.target, 'matching-card')) {
    //
    // }
  };
  moreMenuHandler = (e) => {
    let target
    if (target = getParentByClass(e.target, 'cancel-selection')) {
      this.setState({isHiddenMoreMenu: true})
    }
  };
  confirmHandler = (e) => {
    let target
    if (target = getParentByClass(e.target, 'btn-cancel')) {
      this.setState({isHiddenConfirm: true})
    } else if (target = getParentByClass(e.target, 'btn-confirm')) {
      this.setState({isHiddenConfirm: true})
    }
  };
  bindGesture = () => {

    let pageContainers = document.querySelectorAll('.page-container')
    let slideControl = document.querySelector('.slider-control')
    let tabContent = document.querySelector('.tab-content')

    var mc = new Hammer.Manager(document.querySelector('.layout-adjust'), {touchAction: 'pan-y'})
    mc.add(new Hammer.Pan({ threshold: 10, pointers: 0  }))

    mc.add(new Hammer.Swipe()).recognizeWith(mc.get('pan'))

    mc.on('panstart', (e) => {
      let target
      let container = pageContainers[this.state.showPart]

      if (e.direction == Hammer.DIRECTION_UP &&
        container.scrollHeight - container.scrollTop - window.innerHeight < 1) {
        this.state.willShowPart = 1
      } else if (e.direction == Hammer.DIRECTION_DOWN && this.state.showPart == 1) {
        container = container.querySelectorAll('.content-adjust')[this.state.detailTabIndex]

        if (target = getParentByClass(e.target, 'tab-wrap')) {

          this.state.willShowPart = 0
        } else if (target = getParentByClass(e.target, 'tab-content') &&
          container.scrollTop < 1) {

          this.state.willShowPart = 0
        }
      }
    })
    mc.on('panup', (e) => {

      if (this.state.showPart != 0 ) return
      if (this.state.willShowPart == 1) {
        let delta = Math.max(e.deltaY, -slideControl.offsetHeight/2)
        slideControl.style.transitionDuration = '0s'
        // slideControl.style.transform = `translateY(${delta}px)`
        slideControl.style.top = `${delta}px`
      }
    })
    mc.on('pandown', (e) => {
      if (this.state.showPart != 1 ) return
      if (this.state.willShowPart == 0) {
        let delta = Math.min(e.deltaY, slideControl.offsetHeight/2)
        delta = -slideControl.offsetHeight + delta
        slideControl.style.transitionDuration = '0s'
        // slideControl.style.transform = `translateY(${delta}px)`
        slideControl.style.top = `${delta}px`
      }
    })

    // mc.on('pan', (e) => {
    //   let target
    //   if (target = getParentByClass(e.target, 'tab-container')) { // for tab switch
    //     let delta = -this.state.detailTabIndex * window.innerWidth + e.deltaX
    //     tabContent.style.transitionDuration = '0s'
    //     tabContent.style.transform = `translateX(${delta}px)`
    //   }
    // })


    mc.on('panend', (e) => {
      if (this.state.willShowPart == 1) {
        this.state.showPart = 1
        //slideControl.style.transform = 'translate(0, -600px)'
        slideControl.style.transitionDuration = '.3s'

        let offset = - (slideControl.offsetHeight * this.state.showPart)
        //slideControl.style[Hammer.prefixed(slideControl.style, 'transform')] = `-webkit-translateY(${offset}px)`
        //slideControl.style['-webkit-transform'] = `translateY(${offset}px)`
        //slideControl.style['transform'] = `translateY(${offset}px)`

        slideControl.style.top = `${offset}px`

      //alert(-slideControl.offsetHeight * this.state.showPart)
        if (this.state.currentGoodsId != this.props.goodsSelectedId) {
          this.fetchDetailData(this.props.goodsSelectedId)
        }



        this.state.willShowPart = -1
      } else if (this.state.willShowPart == 0) {
        this.state.showPart = 0
        slideControl.style.transitionDuration = '.3s'
        let offset = -slideControl.offsetHeight * this.state.showPart
      //  slideControl.style['-webkit-transform'] = `translateY(${-slideControl.offsetHeight * this.state.showPart}px)`
      //  slideControl.style.transform = `translateY(${-slideControl.offsetHeight * this.state.showPart}px)`
        slideControl.style.top = `${offset}px`
        this.state.willShowPart = -1
      }

      // let target
      // if (target = getParentByClass(e.target, 'tab-container')) {
      //   let delta = -this.state.detailTabIndex * window.innerWidth + e.deltaX
      //   delta = Math.min(Math.max(Math.round(delta / window.innerWidth), -1), 0)
      //   tabContent.style.transitionDuration = '.3s'
      //   tabContent.style.transform = `translateX(${window.innerWidth * delta}px)`
      //
      //   this.setState({detailTabIndex: Math.abs(delta)})
      //
      //   if (Math.abs(delta) == 1) {
      //     if (this.state.currentNiceShowGoodsId != this.props.goodsSelectedId) {
      //       this.state.niceShows.shows = []
      //       this.state.niceShows.pageIndex = 0
      //       this.state.niceShows.isHaveShows = true
      //
      //       this.state.currentNiceShowGoodsId = this.props.goodsSelectedId
      //       this.fetchShowsData()
      //     }
      //
      //   }
      // }

    })
  };

  componentDidMount = () => {
  this.bindGesture()

    // document.querySelectorAll('.page-container .content-adjust')[1].addEventListener('scroll', (e) => {
    //
    //   let target = e.target
    //   let scrollTop =  target.scrollTop
    //   let sHeight = target.offsetHeight;//可视窗大小
    //   var pageHeight = target.scrollHeight;
    //   if (scrollTop + sHeight > pageHeight - 50 ) {
    //     if (this.state.niceShows.isHaveShows && !this.state.isFetchingShows){
    //       this.setState({isHiddenScrollingSpin: false})
    //       this.state.niceShows.pageIndex++
    //       this.fetchShowsData()
    //     }
    //   }
    // });

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
  render() {
    let testImage = `${BASE_STATIC_DIR}/img/test.png`

    let detailInfo = {}


    try {
      detailInfo = this.state.goodsDetail[this.state.currentGoodsId] || {}
    } catch (e) {}

    return (
      <div className="layout-container" onClick={this.thisHandler}>
        <div className="layout-adjust">
          <div className="slider-control">
            <div className="page-container" >
                {this.props.children}

                <div className="slide-tips clearfix">
                  <div className="sep-line"></div>
                  <div className="tips-wrapper ">
                    <div>继续拖动，查看商品详情</div>
                    <div className="iconfont icon-slide-down"></div>
                    <div>下拉释放，返回商品详情</div>
                  </div>
                </div>
            </div>

            <div　className="page-container">

                <div className="tab-container">
                  <div className="tab-wrap">
                    <div className="tab-list">
                      <span
                        className={this.state.detailTabIndex == 0 ? 'on tab-item' : 'tab-item'}
                        data-index={0}
                      >图文详情</span>
                      <span
                        className={this.state.detailTabIndex == 1 ? 'on tab-item' : 'tab-item'}
                        data-index={1}
                      >评论晒单</span>
                    </div>
                  </div>
                  <div className="tab-content" style={{left: `${this.state.detailTabIndex * window.innerWidth * -1}px`}}>
                    <div className="content-adjust">
                      {
                        detailInfo.id ?
                        (
                          <div>
                            <div className="detail-header">
                              <div className="leaf-bg"></div>
                              <div className="header-wrap">
                                <div className="check-wrap"></div>
                                <div className="header-name">
                                  <div>产品细节</div>
                                  <p>PRODUCT DETAILS</p>
                                </div>
                                <div className="check-wrap"></div>
                              </div>
                            </div>
                            <div className="pro-details" dangerouslySetInnerHTML={{__html: detailInfo.detail}}>
                            </div>

                            <div className="detail-header">
                              <div className="leaf-bg" />
                              <div className="header-wrap">
                                <div className="check-wrap" />
                                <div className="header-name">
                                  <div>相关产品</div>
                                  <p>RELATED COMMODITY</p>
                                </div>
                                <div className="check-wrap" />
                              </div>
                            </div>
                            <div className="relative-pro">
                              {
                                detailInfo.goods_recommend.map((item, index) => {
                                  return (
                                    <a className="rel-item" href={`${BASE_PAGE_DIR}/underwear/${item.id}`}>
                                      <div style={{backgroundImage: `url(${item.thumb_img})`}}/>
                                    </a>
                                  )
                                })
                              }
                            </div>

                            <AdditionalTips />

                            {
                              this.state.isHiddenComments?
                                '':
                                <ShowItem />
                            }
                          </div>
                        ) : ''
                      }
                    </div>
                    <div className="content-adjust">
                      {
                        this.state.isExpect ?
                        (
                          <div className="null-shows"></div>
                        ) :
                        (
                          <div className="shows">
                            {
                              this.state.niceShows.shows.map((item, index) => {
                                let mediaType = item.video ? 1 : 0
                                return <ShowItem
                                  key={item.id}
                                  index={index}
                                  {...item}
                                  mediaType={mediaType}
                                  img={item.img || item.video.screenshot}
                                />;
                              })
                            }
                            <ScrollingSpin isHidden={this.state.isHiddenScrollingSpin}/>
                          </div>
                        )
                      }

                    </div>
                  </div>
                </div>

            </div>
          </div>
        </div>
        <PageSpin isHidden={this.state.isHiddenPageSpin} />

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
// NiceShowlayout.defaultProps = {
//   goodsDataChangeHandler:　function(){}
// }
module.exports = NiceShowlayout
