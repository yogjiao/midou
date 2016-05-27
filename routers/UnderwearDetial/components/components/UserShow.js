import React from 'react'
import ReactDOM from 'react-dom'
import {
  BASE_PAGE_DIR,
  BASE_STATIC_DIR,
  FETCH_USER_SHOW_USER,
  FETCH_USER_SHOW_IMG,
  DELETE_USER_SHOW_IMG,
  POST_LIKE_USER_SHOW_IMG,
  DELET_LIKE_USER_SHOW_IMG,
  POST_SHOW_IMG
} from 'macros.js'
import {fetchAuth, fetchable} from 'fetch.js'
import {getUserInfoFromApp} from 'webviewInterface.js'
import {getMiDouToken} from 'commonApp.js'
import {FETCH_SUCCESS} from 'macros.js'
import ua from 'uaParser.js'
import Swiper from 'Swiper'
let update = require('react-addons-update')

//http://humyang.github.io/2015/cimgh4xfl004ky9jd4h31xa0u/   //getChildContext
import 'UserShow.less'
class UserShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPageIndex: 0,
      userNumPerPage: 12 * 2,
      userList: [],
      isHaveUserInfo: true,
      userSelected: 0,//保存各个用户的图片是否加载完

      imgNumPerPage: 5,
      imagesCached: {},//缓存所有加载过的图片  {imgs: [], isComplete: false, pageIndex: 0}
    }
  }
  fetchUserShowUser = () => {
    let url = `${FETCH_USER_SHOW_USER}/${this.context.productId}/` +
      `${this.state.userPageIndex}/${this.state.userNumPerPage}`
    fetchable(url)
      .then((data) => {
        if (data.rea == FETCH_SUCCESS) {
          let nextState = update(this.state, {userList: {$push: data.users}})
          this.setState(nextState, () => {
            this.avatarSlider.updateSlidesSize()
          });
        }
      })
  };
  fetchUserShowImg = (userId) => {
    let url = `${FETCH_USER_SHOW_IMG}/${userId}/${this.context.productId}/` +
      `${this.state.imagesCached[userId]}/${this.state.imgNumPerPage}`
    fetchable(url)
      .then((data) => {
        if (data.rea == FETCH_SUCCESS) {
          let schema = {}
          if (this.state.images[userId]) {
            schema.userId = {$set: data.images}
          } else {
            schema.userId = {$push: data.images}
          }
          let nextState = update(this.state, {images: {$push: data.users}})
          this.setState(nextState, () => {
            this.avatarSlider.updateSlidesSize()
          });
        }
      })
  };
  thisHandler = () => {
    let token = getMiDouToken()

    if (token) {
      return
    } else {
      getUserInfoFromApp()
        .then(() => {
          window.location.reload()
        })
    }
  };
  componentDidMount = () => {
    // let token = getMiDouToken()
    // if (token) {
    //   this.fetchDate()
    // }
    this.fetchUserShowUser()

    let avatarSlider = document.querySelector('.avatars')
    this.avatarSlider = new Swiper(avatarSlider, {
        //paginationClickable: true,
        width: avatarSlider.offsetWidth,
        spaceBetween: 0
    });


  };
  render() {
    //let product = this.context.productId
    let avatars = []
    let elGroup = []
    let liGroup = []
    let len = this.state.userList.length

    this.state.userList.forEach((item, index, users) => {
      index = index + 1
      let el = (
        <div
          className={item.id == this.state.selectedUser?
            'avatar-wraper on' : 'avatar-wraper'}
          style={{backgroundImage: `url(${item.headimg})`}}
        >
        </div>
      )
      elGroup.push(el)

      if (index % 6 == 0 || index == len) {
        let liEl = (<li>{elGroup}</li>)
        liGroup.push(liEl)
        elGroup = []
      }

      if (index % 12 == 0 || index == len) {
        let ulEl = (<ul className="swiper-slide">{liGroup}</ul>)
        avatars.push(ulEl)
        liGroup = []
      }
    })

    return (
      <div className="user-show-container">
				<h2>Show me</h2>
				<div className="decoration-bra">
					<i className="iconfont icon-bra" />
					<i className="iconfont icon-bra" />
					<i className="iconfont icon-bra" />
					<i className="iconfont icon-bra" />
				</div>
				<div className="show-img-window" id="show-img-window"></div>
				<dl className="meta-info">
					<dt>Asher Book</dt>
					<dd>&bull;</dd>
					<dd>2016/4/18</dd>
				</dl>
				<dl className="like-myself">
					<dt className="iconfont icon-love"></dt>
					<dd>13</dd>
				</dl>
        <div className="avatars">
          <div className="swiper-wrapper">
            {avatars}
          </div>
        </div>
        <dl className="show-me">
          <dt className="iconfont icon-camera"></dt>
          <dd>show me</dd>
        </dl>
			</div>
    )
  }
}
UserShow.contextTypes = {
  productId: React.PropTypes.string.isRequired
}
export default UserShow
