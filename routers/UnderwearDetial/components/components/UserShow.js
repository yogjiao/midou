import React from 'react'
import ReactDOM from 'react-dom'
import {
  FETCH_SUCCESS,
  BASE_PAGE_DIR,
  BASE_STATIC_DIR,
  FETCH_STATUS_NO_MORE_PRODUCT,
  FETCH_USER_SHOW_USER,
  FETCH_USER_SHOW_IMG,
  DELETE_USER_SHOW_IMG,
  POST_LIKE_USER_SHOW_IMG,
  DELET_LIKE_USER_SHOW_IMG,
  POST_SHOW_IMG,
} from 'macros.js'
import {fetchAuth, fetchable} from 'fetch.js'
import {
  getUserInfoFromApp,
  calloutNativeMorePhoto,
  calloutNativeCameraAndPhoto
} from 'webviewInterface.js'
import {getMiDouToken, getAppVerison, compareVersion} from 'commonApp.js'
import ua from 'uaParser.js'
import Swiper from 'Swiper'
let update = require('react-addons-update')
import {getParentByClass, pick} from 'util.js'

import Prompt from 'Prompt/Prompt.js'
import errors from 'errors.js'
//http://humyang.github.io/2015/cimgh4xfl004ky9jd4h31xa0u/   //getChildContext
import 'UserShow.less'
class UserShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promptMsg: '',


      userPageIndex: 0,
      userNumPerPage: 12,
      userList: [],
      isHaveUserInfo: true,
      isZeroUser: false,
      userSelectedIndex: -1,//被选中的用户id

      loadUserScale: 3,

      imgNumPerPage: 5,
      reloadNumUtilEnd: 3,
      isLoadingMoreShowImg: false,
      //isTriggerNewAlbum: false,
      //imagesCached: {0:{imgs: [{img:`${BASE_STATIC_DIR}/img/neixin.png`}]}},//缓存所有加载过的图片  {imgs: [], isHaveShowImg: false, pageIndex: 0}

      isFetchingLike: false,
    }
  }
  formatTime = (ts) => {
    ts = ts && ts * 1000 || Date.now()
    let date = new Date(ts)
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
  };
  fetchUser = () => {
    let num = this.state.userNumPerPage * this.state.loadUserScale;
    let url = `${FETCH_USER_SHOW_USER}/${this.context.productId}/` +
      `${this.state.userPageIndex}/${num}`
    let token = getMiDouToken()
    let fetchMethod = fetchable
    if (token) {
      fetchMethod = fetchAuth
    }
    return fetchMethod(url)
      .then((data) => {
        if (data.rea == FETCH_SUCCESS) {
          this.state.isZeroUser = false
          if (data.users.length < num) {//isHaveUserInfo
            this.state.isHaveUserInfo = false
          }

          data.users.forEach((item, index, users) => {
            item.isHaveShowImg = true
          })
          let nextState = update(this.state, {userList: {$push: data.users}})

          this.setState(nextState, () => {
            this.avatarSlider.updateSlidesSize()
          });
        } else if (data.rea == FETCH_STATUS_NO_MORE_PRODUCT) {
          this.state.isHaveUserInfo = false
          if (this.state.userPageIndex == 0) {
            this.setState({isZeroUser: true})
          }
        }

        return data
      })
  };
  fetchUserShowImg = (isSlideToFirst) => {
    if (this.state.isLoadingMoreShowImg) {
      return
    }
    this.state.isLoadingMoreShowImg = true
    let userSelectedIndex = this.state.userSelectedIndex
    let pageIndex
    let userId = this.state.userList[userSelectedIndex].id

    if (/\d+/.test(this.state.userList[userSelectedIndex].imgPageIndex)) {
      pageIndex = ++this.state.userList[userSelectedIndex].imgPageIndex
    } else {
      pageIndex = this.state.userList[userSelectedIndex].imgPageIndex = 0
    }


    let url = `${FETCH_USER_SHOW_IMG}/${userId}/${this.context.productId}/` +
      `${pageIndex}/${this.state.imgNumPerPage}`

    let token = getMiDouToken()
    let fetchMethod = fetchable
    if (token) {
      fetchMethod = fetchAuth
    }

    return fetchMethod(url)
      .then((data) => {
        if (data.rea == FETCH_SUCCESS) {
          let schema = {}
          if (data.images.length < this.state.imgNumPerPage) {
            this.state.userList[userSelectedIndex].isHaveShowImg = false
          }
          if (getMiDouToken()
            && userSelectedIndex == 0
            && Array.isArray(this.uploadimages)) {
            data.images = data.images.filter((item, index) =>　{
              return !this.uploadimages.some((img, index) => {
                return item.id == img.id
              })
            })
          }
          if (pageIndex != 0) {
            schema[userSelectedIndex] = {images: {$push: data.images}}
          } else {
            if (!Array.isArray(this.state.userList[userSelectedIndex].images)) {
              this.state.userList[userSelectedIndex].images = []
            }
            this.state.userList[userSelectedIndex].imagesTotalCount = data.total_count
            schema[userSelectedIndex] = {images: {$push: data.images}}
          }
          let nextState = update(this.state, {userList: schema})

          if (isSlideToFirst) {
            this.showSlider.activeIndex = 0
          }
          this.setState(nextState, () => {
            this.showSlider.update(true)
          });
        } else if (data.rea == FETCH_STATUS_NO_MORE_PRODUCT) {
          this.state.userList[userSelectedIndex].isHaveShowImg = false
        }
        this.state.isLoadingMoreShowImg = false
      })
  };
  thisHandler = (e) => {
    let target
    if (target = getParentByClass(e.target, 'avatar-wraper')) {
      let index = target.getAttribute('data-index')
      if (index == this.state.userSelectedIndex) {
        return
      }
      if (Array.isArray(this.state.userList[index].images)) {
        this.showSlider.activeIndex = 0
        this.setState({userSelectedIndex: index}, () => {
          this.showSlider.update(true)
        })
      } else {
        this.state.userSelectedIndex = index;
        this.fetchUserShowImg(true)
      }

    } else if (target = getParentByClass(e.target, 'like-myself')) {
      // if (this.state.isFetchingLike) {
      //   return
      // }
      //this.state.isFetchingLike = true

      let islike = target.getAttribute('data-like')
      let img  = this.state.userList[this.state.userSelectedIndex]
       .images[this.showSlider.activeIndex]
      if (islike == 0) {
        fetchAuth(`${POST_LIKE_USER_SHOW_IMG}/${img.id}`)
          .then( (data) => {
            if (data.rea == FETCH_SUCCESS) {
              img.like_count = data.like_count
              img.is_liked = 1
              this.forceUpdate()
            }
            //this.state.isFetchingLike = false
          })
      } else {
        fetchAuth(`${DELET_LIKE_USER_SHOW_IMG}/${img.id}`)
          .then( (data) => {
            if (data.rea == FETCH_SUCCESS) {
              img.like_count = data.like_count
              img.is_liked = 0
              this.forceUpdate()
            }
            //this.state.isFetchingLike = false
          })
      }
    } else if (target = getParentByClass(e.target, 'show-me')) {
    //  alert('cookie-' + getMiDouToken())
      // if (!getMiDouToken()) {
      //
      //   getUserInfoFromApp()
      //   return
      // }
      let  getNativeMediaMethod = calloutNativeMorePhoto
      if (compareVersion(getAppVerison(), '1.3.0') > 0) {
        getNativeMediaMethod = calloutNativeCameraAndPhoto
      }
      getUserInfoFromApp()
        .then((data) => {//.loginToken
          //alert(data.loginToken)
          getNativeMediaMethod()
            .then((data) => {//data.img
            //  alert(data.img)

              let url = `${POST_SHOW_IMG}/${this.context.productId}`
              fetchAuth(url, {method: 'post', body: JSON.stringify({img: data.img})})
                .then((resp) => {
                  if (resp.rea == FETCH_SUCCESS) {
                    //this.setState({promptMsg: '图片正在审核中'})
                    //this.refs['prompt'].show()
                      if (!this.uploadimages) {
                        this.uploadimages = []
                      }
                      Array.prototype.unshift.apply(this.uploadimages, resp.images)
                      this.state.userSelectedIndex = 0
                      if (this.state.userList.length == 0) {
                        this.state.isZeroUser = false
                        this.state.userList.push(resp.user)
                      }
                      delete this.state.userList[0].imgPageIndex
                      this.state.userList[0].images = this.uploadimages
                      this.fetchUserShowImg(true)

                    //this.forceUpdate();
                  } else {
                    alert(errors[resp.rea])
                  }
                })
            })
            .catch(() => {
              this.setState({promptMsg: '图片上传失败'})
              this.refs['prompt'].show()
            })
        })

    }
  };
  // getLoadingAvatarsNum = () => {
  //   let index = slider.activeIndex
  // };
  componentDidMount = () => {
    /********init avatar slider***********/
    this.avatarSlider = new Swiper(document.querySelector('.avatars'), {
        width: document.querySelector('.avatars .swiper-wrapper').offsetWidth,
        spaceBetween: 0
    });
    this.avatarSlider.on('slideNextStart',  (slider) => {
      if (slider.slides.length - slider.activeIndex < this.state.reloadNumUtilEnd &&
          this.state.isHaveUserInfo) {
        this.state.userPageIndex++
        this.fetchUser()
      }
    });


    this.state.userSelectedIndex = 0;
    this.fetchUser()
      .then((data) => {
        if (this.state.isZeroUser) {
          return
        }
        this.state.userSelectedIndex = 0;
        this.fetchUserShowImg()
      })

    /********init show slider***********/
    let squareNode = document.querySelector('#square')
    squareNode.style.height = squareNode.offsetWidth + 'px'
    this.showSlider = new Swiper('#show-img-window', {
        //paginationClickable: true,
        spaceBetween: 0
    });
    this.showSlider.on('slideNextStart', (slider) => {

      if (slider.slides.length - slider.activeIndex < this.state.reloadNumUtilEnd &&
        this.state.userList[this.state.userSelectedIndex].isHaveShowImg) {

         this.fetchUserShowImg()
      }
    })
    this.showSlider.on('slideChangeStart', (slider) => {
      this.forceUpdate()
    })

    // setTimeout(() => {
    //   let resp = {
    //     user: {"id":"85","headimg":"http://mielseno.com/view/photo/head/72df795a1889a5d742db34d2639ca0ee22732.jpeg"},
    //     images: [{"id":"253","img":"http://www.mielseno.com/view/photo/show//c551dba9904cfe23529a6e3312f05f3098424.jpeg","username":"test","ts":"1464863769","like":"0","is_liked":"0"}]
    //   }
    //   if (!this.uploadimages) {
    //     this.uploadimages = []
    //   }
    //   Array.prototype.unshift.apply(this.uploadimages, resp.images)
    //   this.state.userSelectedIndex = 0
    //   if (this.state.userList.length == 0) {
    //     this.state.isZeroUser = false
    //     this.state.userList.push(resp.user)
    //   }
    //   delete this.state.userList[0].imgPageIndex
    //   this.state.userList[0].images = this.uploadimages
    //   this.fetchUserShowImg()
    //
    //
    // }, 6000)

    // this.showSlider.on('transitionStart', (slider) => {
    //
    // })
    // this.showSlider.on('sliderMove', (slider) => {
    //   if (this.state.isTriggerNewAlbum) {
    //     return
    //   }
    //
    //
    //   if (slider.isBeginning && slider.translate > 10) {
    //     this.state.isTriggerNewAlbum = true
    //     this.setState({userSelectedIndex: --this.state.userSelectedIndex})
    //     try {
    //       if (!this.state.userList[this.state.userSelectedIndex].images) {
    //         this.fetchUserShowImg()
    //           .then(() => {
    //             this.state.isTriggerNewAlbum = false
    //             this.showSlider.updateProgress()
    //           })
    //       }
    //     } catch (e) {
    //
    //     }
    //
    //
    //   } else if (slider.isEnd && slider.translate < slider.activeIndex * slider.size) {
    //     this.state.isTriggerNewAlbum = true
    //     this.setState({userSelectedIndex: ++this.state.userSelectedIndex})
    //     try {
    //       if (!this.state.userList[this.state.userSelectedIndex].images) {
    //         this.fetchUserShowImg()
    //           .then(() => {
    //             this.state.isTriggerNewAlbum = false
    //             this.showSlider.updateProgress()
    //           })
    //       }
    //     } catch (e) {
    //
    //     }
    //   }
    // })

  };
  render() {
    //let product = this.context.productId
    let avatars = []
    let elGroup = []
    let liGroup = []
    let len = this.state.userList.length

    this.state.userList.forEach((item, index, users) => {
      let tempIndex = index + 1
      let el = (
        <div
          key= {index}
          className = {index == this.state.userSelectedIndex?
            'avatar-wraper on' : 'avatar-wraper'}
          style = {{backgroundImage: `url(${item.headimg})`}}
          data-index = {index}
          data-id = {item.id}
        >
        </div>
      )
      elGroup.push(el)

      if (tempIndex % 6 == 0 || tempIndex == len) {
        let liEl = (<li key={Math.ceil(tempIndex / 6)}>{elGroup}</li>)
        liGroup.push(liEl)
        elGroup = []
      }

      if (tempIndex % 12 == 0 || tempIndex == len) {
        let ulEl = (<ul key={Math.ceil(tempIndex / 12)} className="swiper-slide">{liGroup}</ul>)
        avatars.push(ulEl)
        liGroup = []
      }
    })

    let numNav
    try {
      numNav = `${(this.showSlider.activeIndex + 1)}` +
        ` / ${this.state.userList[this.state.userSelectedIndex].imagesTotalCount}`
    } catch (e) {
      numNav = '0 / 0'
    }


    let showEls = []
    if (this.state.userSelectedIndex > -1) {
      try {
        showEls = this.state.userList[this.state.userSelectedIndex]
            .images.map((item, index, imgs) => {
             let bg = `url(${item.img})`
              return (
                <div
                  className="swiper-slide"
                  key={item.id}
                  style={{backgroundImage: bg}}>
                </div>
              )
            })
      } catch (e) {

      }

    }

    let imgInfo
    try {
      imgInfo = this.state.userList[this.state.userSelectedIndex]
       .images[this.showSlider.activeIndex]
    } catch (e) {
      imgInfo = {}
    }

    let showWraperStyle
    if (this.state.isZeroUser) {
      showWraperStyle = {display: 'none'}
    }


    return (
      <div className="user-show-container" onClick={this.thisHandler}>
				<h2>Show me</h2>
				<div className="decoration-bra">
					<i className="iconfont icon-bra" />
					<i className="iconfont icon-bra" />
					<i className="iconfont icon-bra" />
					<i className="iconfont icon-bra" />
				</div>
        <div className="show-wraper" style={showWraperStyle}>
  				<div className="show-img-window" id="show-img-window">
            <div className="num-nav">{numNav}</div>
            <div className="swiper-wrapper" id="square">
              {showEls}
            </div>
          </div>
  				<dl className="meta-info">
  					<dt>{imgInfo.username}</dt>
  					<dd>&bull;</dd>
  					<dd>{this.formatTime(imgInfo.ts)}</dd>
  				</dl>
  				<dl
            className={imgInfo.is_liked == '1'? 'like-myself on' : 'like-myself'}
            data-like={imgInfo.is_liked}
          >
  					<dt className="iconfont icon-love"></dt>
  					<dd>{imgInfo.like_count}</dd>
  				</dl>
          <div className="avatars">
            <div className="swiper-wrapper">
              {avatars}
            </div>
          </div>
        </div>
        <dl className="show-me">
          <dt className="iconfont icon-camera"></dt>
          <dd>show me</dd>
        </dl>
        <Prompt msg={this.state.promptMsg} ref='prompt' />
			</div>
    )
  }
}
UserShow.contextTypes = {
  productId: React.PropTypes.string.isRequired
}
export default UserShow