import React from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'

import {BASE_PAGE_DIR} from 'macros.js'
import AdditionalTips from 'AdditionalTips.js'
import 'UnderweardetailInfo.less'
class UnderweardetailInfo extends React.Component {
  render() {
    return (
      <div className="info-wrap">
        <div className="pro-name">{this.props.name}</div>
        <div className="pro-price">&yen; {this.props.price}</div>
        <div className="detail-item-list">
        {
          /*
          <div className="detail-item-wrap">
            <h6 className="item-title"><i className="iconfont icon-triangle-left-top" />商品介绍</h6>
            <div className="detail-content" dangerouslySetInnerHTML={{__html: this.props.match_intro}}></div>
          </div>
          */
        }

          <div className="detail-item-wrap">
            <h6 className="item-title"><i className="iconfont icon-triangle-left-top" />盒子服务</h6>
            <div className="detail-content box-service-info">
                <a className="img-wrap" href={`${BASE_PAGE_DIR}/box-service`}><img src="/app-static/img/box-detail.png" /></a>
                {/*
                  <h5>担心内衣不合身？</h5>
                  <h6>打开盒子，把试衣间带回家</h6>
                  */
                }

            </div>
          </div>
          <div className="detail-item-wrap">
            <h6 className="item-title"><i className="iconfont icon-triangle-left-top" />商品详情</h6>
            <div className="detail-content">
              <div
                className="goods-details"
                dangerouslySetInnerHTML={{__html: this.props.detail}}
              ></div>
            </div>
          </div>
          {
            (this.props.goods_recommend || []).length?
            (
              <div className="detail-item-wrap">
                <h6 className="item-title"><i className="iconfont icon-triangle-left-top" />相关产品</h6>
                {
                  this.props.goods_recommend.map((item, index) => {

                    return (
                      <div className="recommend-wrap" key={index}>
                        <div className="detail-content">
                          <a href={`${BASE_PAGE_DIR}/underwear/${item.id}`}>
                            <div className="img-wrap"><img src={item.thumb_img} /></div>
                            <div className="pro-name">{item.name}</div>
                            <div className="seperate-line" />
                          </a>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            ):
            ''
          }
        </div>
        <AdditionalTips />
      </div>
    )
  }
}

export default UnderweardetailInfo
