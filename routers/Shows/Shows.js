import React from 'react'
import PageSpin from 'PageSpin/PageSpin.js'
import ShowItem from 'ShowItem/ShowItem.js'
import ScrollingSpin from 'ScrollingSpin/ScrollingSpin.js'
import {
  FETCH_NICE_SHOWS,
  FETCH_STATUS_NO_MORE_PRODUCT,
  FETCH_SUCCESS,
  BASE_STATIC_DIR,
  BASE_PAGE_DIR,
  PAGE_TO_PAGE_SIGNAL
} from 'macros.js'
import {fetchable, fetchOption} from 'fetch.js'
import errors from  'errors.js'
let update = require('react-addons-update')
import {getParentByClass} from 'util.js'
import {receiveNotificationsFromApp, recievePageToPageSignal} from 'webviewInterface.js'

import './Shows.less'
class Shows extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      pageIndex: 0,
      pageSize: 10,
      isHiddenPageSpin: false,
      isHiddenScrollingSpin: true,
      isFetching: false,
      isHaveShowImg: true,
      showList: [],
      isExpect: false,

      isHiddenConfirm: true,
    };

  }
  fetchListData = (isScrollLoading) => {
    this.state.isFetching = true
    let url = `${FETCH_NICE_SHOWS}/${this.state.pageIndex}/${this.state.pageSize}`
    let nextState = {}
    if (isScrollLoading) {
      nextState.isHiddenScrollingSpin = false
    } else {
      nextState.isHiddenPageSpin = false
    }
    this.setState(nextState)
      fetchOption(url)
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
            showList: {$push: data.shows}
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
      alert(json.stringify(data))
      if (data.type == '15') {// refresh nices
        window.location.reload()
      }
    })

    recievePageToPageSignal((data) => {
      if (data.signal == PAGE_TO_PAGE_SIGNAL.UPDATE_SHOWS) {
        window.location.reload()
      }
    })

  };
  componentWillUnmount = () => {
    document.removeEventListener('scroll', this.handleScroll);
  };

  render() {
    return (
        <div className="shows-container" onClick={this.thisHandler}>
            {
              this.state.isExpect ?
              (
                <div className="null-shows"></div>
              ) :
              (
                <div className="list-wrap">
                  <div className="pro-list clearfix">
                    {
                      this.state.showList.map((item, index) => {
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
module.exports = Shows
