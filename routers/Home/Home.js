import React from 'react'

import './Home.less'

// import fetch from '../../components/fetch.js'

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
      {id: "1", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "/media/test.png"},
      {id: "2", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "/media/test.png"}
    ]};

  }
  handleScroll() {
    let scrollTop =  document.documentElement.scrollTop || window.pageYOffset ;
    let sHeight = window.innerHeight;//可视窗大小
    var pageHeight = document.documentElement.scrollHeight;
    if (scrollTop + sHeight > pageHeight - 30) {
      let tipsWrap = this.refs["loading-tips"]
      tipsWrap.style.display="block";

      fetch('/test')
        .then(function(data){
          data = {
            list: [
              {id: "1", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "/media/test.png"},
              {id: "2", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "/media/test.png"},
              {id: "3", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "/media/test.png"},
              {id: "4", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "/media/test.png"},
              {id: "5", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "/media/test.png"}
            ]
          }
          let list = data.list;
          this.setState({prolist: list});
          tipsWrap.style.display="none";
        }.bind(this))
        .catch(function(error){
          alert(error);
          tipsWrap.style.display="none";
        })
    }
  }
  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll.bind(this));
  }
  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll.bind(this));
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
          <div className="tips-loading" ref="loading-tips" >数据加载中...</div>
        </div>
      </div>
    )
  }
}

//module.exports = Home
export default Home
