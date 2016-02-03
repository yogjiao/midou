import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'


import './Underweardetail.less'
import PageHeader from '../../components/PageHeader/PageHeader.js'
import UnderweardetailBanner from 'components/UnderweardetailBanner.js'
import UnderweardetailInfo from 'components/UnderweardetailInfo.js'
import UnderweardetailFooter from 'components/UnderweardetailFooter.js'
import UnderwearDetailSelectModel from 'components/UnderwearDetailSelectModel.js'
// import fetch from '../../components/fetch.js'





class Underweardetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageInfo: {
        pageIndex: 0,
        pageSize: 10,
      },
      prolist: [
          {id: "1", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "/media/test.png"}
        ]
    };

  }
  getUrl() {
    let url = '/test?'
    let searchState = this.refs['serach-panel'].state;
    let tags = searchState.searchParams.tags.map(val => searchState.allTags[parseInt(val)])


    let params = Object.assign({}, this.state.pageInfo, searchState.searchParams, {tags: tags.join('|')})

    Object.keys(params).forEach(function(key, index){
      let value = params[key]
      url += `${key}=${value}&`
    })

    return url;
  }
  panelSearch() {
    let tipsWrap = this.refs["loading-tips"]
    tipsWrap.style.display="block";
    this.state.pageInfo.pageIndex = 0

    let url = this.getUrl()

    fetch(url)
      .then(function(data){
        data = {
          list: [
            {id: "1", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "/media/test.png"},
            {id: "2", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "/media/test.png"}
          ]
        }
        let list = data.list;
        this.setState({prolist: list});
        ReactDOM.findDOMNode(this.refs['serach-panel']).style.display = 'none'
      }.bind(this))
      .catch(function(error){
        ReactDOM.findDOMNode(this.refs['serach-panel']).style.display = 'none'

      })
  }
  scrollSearch() {
    let tipsWrap = this.refs["loading-tips"]
    tipsWrap.style.display="block";

    let url = this.getUrl()
    fetch(url)
      .then(function(data){
        data = {
          list: [
            {id: "1", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "/media/test.png"},
            {id: "2", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "/media/test.png"},
            {id: "3", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "/media/test.png"},
            {id: "4", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "/media/test.png"},
            {id: "5", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "/media/test.png"},
            {id: "6", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "/media/test.png"}
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
  handleScroll() {
    let scrollTop =  document.documentElement.scrollTop || window.pageYOffset ;
    let sHeight = window.innerHeight;//可视窗大小
    var pageHeight = document.documentElement.scrollHeight;
    if (scrollTop + sHeight > pageHeight - 30) {


      this.scrollSearch();
    }
  }
  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll.bind(this));
  }
  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll.bind(this));
  }
  popSearchPanel(e) {
    ReactDOM.findDOMNode(this.refs['serach-panel']).style.display = 'block'
  }
  render() {
    return (
      <div className="uw-detail-container">
        <PageHeader headerName="产品详情">
          <div className="menu-search" onClick={this.popSearchPanel.bind(this)}>分享</div>
        </PageHeader>
        <UnderweardetailBanner img="/media/test.png"/>
        <UnderweardetailInfo />
        <UnderweardetailFooter />
        <UnderwearDetailSelectModel />
      </div>
    )
  }
}

module.exports = Underweardetail
