import React from 'react'
import fetch from 'whatwg-fetch'

import './home.less'

class HomeListItem extends React.Component {
  render() {
    return (
      <li className="list-item" >
        <div className="img-wrap"><a href={this.props.href}><img src={this.props.img} alt="" /></a></div>
        <a href={this.props.href} className="pro-name">
          <p>{this.props.name}{this.props.id}</p>
          <i className="iconfont">&#xe601;</i>
        </a>
      </li>
    )
  }
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {prolist: [
      {id: "1", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "media/test.png"},
      {id: "2", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "media/test.png"},
      {id: "3", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "media/test.png"}
    ]};

    setTimeout(function(){
      this.setState({prolist: [
        {id: "1", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "media/test.png"},
        {id: "2", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "media/test.png"},
        {id: "3", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "media/test.png"},
        {id: "4", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "media/test.png"},
        {id: "5", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "media/test.png"}
      ]});
    }.bind(this), 2000)
  }
  handleScroll() {
    fetch('http://baidu.com')
      .then(function(){
        debugger;
      })
      .catch(function(){

      })
  }
  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }
  render() {


    return (
      <div className="home-container">
        <div className="list-wrap">
          <ul className="pro-list">
            {
              this.state.prolist.map(function(pro) {
                return <HomeListItem key={pro.id} {...pro}/>;
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

module.exports = Home
