import React from 'react'

import PageSpin from 'PageSpin/PageSpin.js'
import HomeListItem from 'HomeListItem.js'
import ScrollingSpin from 'ScrollingSpin/ScrollingSpin.js'
import {FETCH_INDEX_DATA, TEST_TOKEN} from 'macros.js'
import fetchable from 'fetch.js'
import './Home.less'
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0,
      numberPerPage: 5,
      isHiddenPageSpin: false,
      isHiddenScrollingSpin: true,
      prolist: []
    };

  }
  fetchListData = () => {
    let url = `${FETCH_INDEX_DATA}/${this.state.pageIndex}/${this.state.numberPerPage}`
    fetchable(url, {
        credentials: 'include',
        headers:{Cookie: TEST_TOKEN, 'Accept': 'application/json'}})
      .then((data) => {
        debugger;
      })
      .catch((error) => {
        this.setState({isHiddenPageSpin: true})
      })
  };
  handleScroll = () => {
    let scrollTop =  document.documentElement.scrollTop || window.pageYOffset ;
    let sHeight = window.innerHeight;//可视窗大小
    var pageHeight = document.documentElement.scrollHeight;
    if (scrollTop + sHeight > pageHeight - 30) {
      this.fetchListData();
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
