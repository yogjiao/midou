import React from 'react'
import PageSpin from 'PageSpin/PageSpin.js'
import HomeListItem from 'HomeListItem.js'
import Prompt from 'Prompt/Prompt.js'
import ScrollingSpin from 'ScrollingSpin/ScrollingSpin.js'
import {
  FETCH_INDEX_DATA,
  FETCH_STATUS_NO_MORE_PRODUCT,
  FETCH_SUCCESS,
  BASE_STATIC_DIR,
  BASE_PAGE_DIR
} from 'macros.js'
import {fetchable} from 'fetch.js'
import errors from  'errors.js'
import HomeNoResult from 'HomeNoResult.js'
import uaParser from 'uaParser.js'
let update = require('react-addons-update')
import Nav from 'Nav/Nav.js'
import {getUserInfoFromApp} from 'webviewInterface.js'
import './Home.less'
class Home extends React.Component {
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
  handleScroll = (e) => {
    let target = e.target
    let scrollTop =  target.scrollTop || window.pageYOffset ;
    let sHeight = this.scroller.offsetHeight;//可视窗大小
    var pageHeight = this.scroller.scrollHeight;
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

    this.scroller = document.querySelector('.scroll-wrapper')
    this.scroller.addEventListener('scroll', this.handleScroll);
  };
  componentWillUnmount = () => {
    this.scroller.removeEventListener('scroll', this.handleScroll);
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
        <div className="home-container">
          <div className="scroll-container">
            <div className="scroll-wrapper">
              {
                this.state.isExpect?
                (<HomeNoResult />):
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
            {
              uaParser.isApp() ? '' : <Nav />
            }

          </div>
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
module.exports = Home
