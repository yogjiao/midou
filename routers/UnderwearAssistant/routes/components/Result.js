import React from 'react'
import { Link } from 'react-router'
import {BASE_PAGE_DIR, BASE_STATIC_DIR} from 'macros.js'
import {backToHomeNativePage} from 'webviewInterface.js'

import ua from 'uaParser.js'

import './Result.less'
class Result extends React.Component {
  backToHome = () => {
    backToHomeNativePage();
  };
  render() {
    let className = ua.isApp()?
      'assistant-result-container':
      'assistant-result-container assistant-result-container-weixin'

    let img = `url(${BASE_STATIC_DIR}/img/as-radius.png)`
    return (
      <div className={className}>
         <h2>推荐尺寸</h2>
         <div className="liear-circle" style={{backgroundImage: img}}>
            <div className="size-info-wrap">
              <div className="size-info arial">{`${this.props.recommend_bottom_bust}${this.props.recommend_cup}`}</div>
              <i className="iconfont">&#xe60b;</i>
            </div>
         </div>
         <div className="switch-wrap">
           <div className="tips-wrap">
              <h6>个人身材数据添加成功！</h6>
              <p>你可以在个人中心里修改你的身材数据</p>
           </div>
           <div className="btn-deal" onClick={this.backToHome}>确认</div>
         </div>
      </div>
    )
  }
}

//module.exports = Home
export default Result
