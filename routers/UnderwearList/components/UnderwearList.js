import React from 'react'
import ReactDOM from 'react-dom'
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
      pageInfo: {
        pageIndex: 0,
        pageSize: 10,
      },
      prolist: [
        //  {id: "1", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "/media/test.png"}
        ]
    };

  }
  /**
   * generate complete url include query string
   */
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
  /**
   *  fetch data when parmas changed except pageIndex
   */
  panelSearch = () => {
  //  this.props.getPageSpin().show()
    this.state.pageInfo.pageIndex = 0

    fetch(this.getUrl())
      .then(function(data){
        data = {
          list: [
            {id: "1", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "/media/test.png"},
            {id: "2", name: "写作欲侧漏时 偏偏偶遇阅读三行不能", href: "http://baidu.com", img: "/media/test.png"}
          ]
        }
        let list = data.list
        this.setState({prolist: list})
        //this.props.pageSpin.hide();
      }.bind(this))
      .catch(function(error){
        //this.props.pageSpin.hide();
      }.bind(this))
  };
  /**
   *  fetch data when only pageIndex changed
   */
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
  /**
   * check the page whether changed or not when scrolling
   */
  handleScroll() {
    let scrollTop =  document.documentElement.scrollTop || window.pageYOffset ;
    let sHeight = window.innerHeight;//可视窗大小
    var pageHeight = document.documentElement.scrollHeight;
    if (scrollTop + sHeight > pageHeight - 30) {
      this.scrollSearch();
    }
  }
  componentDidMount() {
    alert(' componentDidMount list')
    this.panelSearch();
    document.addEventListener('scroll', this.handleScroll.bind(this));

  }
  componentWillUnmount() {
    alert(' componentWillUnmount list')
    document.removeEventListener('scroll', this.handleScroll.bind(this));
  }
  popSearchPanel(e) {
    ReactDOM.findDOMNode(this.refs['serach-panel']).style.display = 'block'
  }
  render() {
    return (
      <div className="uw-list-container">
        <PageHeader headerName="所有单品">
          <div className="menu-search" onClick={this.popSearchPanel.bind(this)}>筛选</div>
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
        <UnderwearSearchPanel ref='serach-panel' panelSearch={this.panelSearch.bind(this)}/>
      </div>
    )
  }
}

module.exports = UnderwearList
