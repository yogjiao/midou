import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import {
  BASE_PAGE_DIR,
  BASE_STATIC_DIR
} from 'macros.js'
import {fetchable, fetchAuth} from 'fetch.js'
import {backToNativePage} from 'webviewInterface.js'
// import fetch from '../../components/fetch.js'
import Swiper from 'Swiper'

import './BusinessModel.less'
class BusinessModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerName: '单品'
    }
    //this.state.tagsIndex[0] = 0
  }
  backHandler = () => {
    backToNativePage()
    this.props.history.goBack()
  };
  componentDidMount = () => {
    var swiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      paginationClickable: true
    });
  };
  render() {
    return (
      <div className="business-model-container ">
        <div className="iconfont icon-arrow-left" onClick={this.backHandler}/>
        <div className="swiper-container bg-neixin" >
          <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div
                  className="img-wrap"
                  href={`${BASE_PAGE_DIR}/box-service`}
                  style={{backgroundImage: `url(${BASE_STATIC_DIR}/img/C2M-1.png)`}}>
                </div>
                <div className="text-wrap">
                  <h6 className="clearfix">让每个女生都有轻松获得高品质内衣的权利</h6>
                  <div className="text-content">
                    Nice in是内衣界首家C2M直供平台，<br />
去除所有中间环节，<br />
直接连接用户和顶级制造商生产线，<br />
让国际品质、安全健康的内衣产品具有亲民价格。
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div
                  className="img-wrap"
                  href={`${BASE_PAGE_DIR}/box-service`}
                  style={{backgroundImage: `url(${BASE_STATIC_DIR}/img/C2M-2.png)`}}>
                </div>
              </div>
              <div className="swiper-slide">
                <div
                  className="img-wrap"
                  href={`${BASE_PAGE_DIR}/box-service`}
                  style={{backgroundImage: `url(${BASE_STATIC_DIR}/img/C2M-3.png)`}}>
                </div>
                <div className="text-wrap">
                  <h6 className="clearfix">品质和实力</h6>
                  <div className="text-content">
                    目前已有一家世界顶级内衣制造商入驻Nice in，<br />
它曾经为众多国际高端内衣品牌提供研发和生产。<br />
该制造商已有30年的研发经验，<br />
公司总投资达1亿美元，生产基地占地10万平方米，<br />
在全球多个国家设有办事处。
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div
                  className="img-wrap"
                  href={`${BASE_PAGE_DIR}/box-service`}
                  style={{backgroundImage: `url(${BASE_STATIC_DIR}/img/C2M-4.png)`}}>
                </div>
                <div className="text-wrap">
                  <h6 className="clearfix">消除中间价</h6>
                  <div className="text-content">
                    Nice in从工厂的源头开始，直接控制出品成本，<br />
去除各类“二手”“三手”渠道和经销费用，<br />
才有接地气的好价格。
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div
                  className="img-wrap"
                  href={`${BASE_PAGE_DIR}/box-service`}
                  style={{backgroundImage: `url(${BASE_STATIC_DIR}/img/C2M-5.png)`}}>
                </div>
                <div className="text-wrap">
                  <h6 className="clearfix">一价体系</h6>
                  <div className="text-content">
                    平台所有内衣品类统一定价<span className="arial">¥128</span>单件，<br />
对应商场<span className="arial">¥400＋</span>品质的内衣。
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div
                  className="img-wrap"
                  href={`${BASE_PAGE_DIR}/box-service`}
                  style={{backgroundImage: `url(${BASE_STATIC_DIR}/img/C2M-6.png)`}}>
                </div>
                <div className="text-wrap">
                  <h6 className="clearfix">Nice 团队</h6>
                  <div className="text-content">
                    Nice in是一个女性创业者团队，<br />
有从业超过10年的资深互联网人，<br />
和更多90后参与平台运营，<br />
期待为女生谋些真切的福利，<br />
即用平价的方式，让女生尝试更多高品质内衣。
                  </div>
                </div>
              </div>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    )
  }
}

module.exports = BusinessModel
