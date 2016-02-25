import React from 'react'
import PageSpin from 'PageSpin/PageSpin.js'
import HomeListItem from 'HomeListItem.js'
import ScrollingSpin from 'ScrollingSpin/ScrollingSpin.js'
import {FETCH_INDEX_DATA} from 'macros.js'
import {fetchable} from 'fetch.js'
let update = require('react-addons-update')

import './Home.less'
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0,
      numberPerPage: 2,
      isHiddenPageSpin: false,
      isHiddenScrollingSpin: true,
      isFetching: false,
      isHaveGoods: true,
      prolist: []
    };

  }
  fetchListData = () => {
    this.state.isFetching = true
    let url = `${FETCH_INDEX_DATA}/${this.state.pageIndex}/${this.state.numberPerPage}`
    this.setState({isHiddenPageSpin: false})
    fetchable(url)
      .then((data) => {
        if (data.rea == 2) {
          this.state.isHaveGoods = false
        }
        let nextState = update(this.state, {
          prolist: {$push: data.goods},
          isFetching:{$set: false},
          isHiddenPageSpin: {$set: true},
          isHiddenScrollingSpin: {$set: true}
        })
        this.setState(nextState)
      })
      .catch((error) => {
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
    if (scrollTop + sHeight > pageHeight - 30) {
      if (this.state.isFetching || !this.state.isHaveGoods) return

      this.setState({isHiddenScrollingSpin: false})
      this.state.pageIndex++
      this.fetchListData()
    }
  };
  componentDidMount = () => {
    this.fetchListData()
    document.addEventListener('scroll', this.handleScroll.bind(this));
  };
  componentWillUnmount = () => {

    document.removeEventListener('scroll', this.handleScroll.bind(this));
  };
  render() {
    return (
      <div className="home-container">
        <div className="bg-wrap">
        </div>
        <div className="list-wrap">
          <ul className="pro-list">
            {
              this.state.prolist.map(function(pro) {
                return <HomeListItem key={pro.id} {...pro}/>;
              })
            }
          </ul>
          <ScrollingSpin isHidden={this.state.isHiddenScrollingSpin}/>
        </div>
        <PageSpin isHidden={this.state.isHiddenPageSpin}/>
      </div>
    )
  }
}

//module.exports = Home
export default Home
