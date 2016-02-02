import React from 'react'
import { Link } from 'react-router'


import './UnderwearList.less'
import PageHeader from '../../components/PageHeader/PageHeader.js'
import UnderwearSearchPanel from 'UnderwearSearchPanel.js'

// import fetch from '../../components/fetch.js'



class UnderwearListItem extends React.Component {
  render() {
    return (
      <div className="list-item" >
        <div className="img-wrap"><a href={this.props.href}><img src={this.props.img} alt="" /></a></div>
        <div className="info-wrap">
          <Link to={this.props.href} className="pro-name">{this.props.name}</Link>
          <div className="price">&yen;99</div>
        </div>
      </div>
    )
  }
};

class UnderwearList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prolist: [
          {id: "1", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "/media/test.png"},
          {id: "2", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "/media/test.png"},
          {id: "3", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "/media/test.png"},
        ]
    };

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
      <div className="uw-list-container">
        <PageHeader headerName="所有单品">
          <div className="menu-search">筛选</div>
        </PageHeader>
        <div className="list-wrap">
          <div className="adjuxt-wrap clearfix">
              {
                this.state.prolist.map(function(pro) {
                  return <UnderwearListItem key={pro.id} {...pro}/>;
                })
              }
            </div>
          <div className="tips-loading" ref="loading-tips" >数据加载中...</div>
        </div>
        <UnderwearSearchPanel />
      </div>
    )
  }
}

module.exports = UnderwearList
