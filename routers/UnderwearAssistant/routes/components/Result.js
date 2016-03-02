import React from 'react'
import { Link } from 'react-router'
import {BASE_PAGE_DIR} from 'macros.js'


import './Result.less'
class Result extends React.Component {
  render() {
    return (
      <div className="assistant-result-container">
         <h2>推荐尺寸</h2>
         <div className="liear-circle">
            <div className="size-info-wrap">
              <div className="size-info arial">{`${this.props.recommend_bottom_bust}${this.props.recommend_cup}`}</div>
              <i className="iconfont">&#xe60b;</i>
            </div>
         </div>
         <div className="tips-wrap">
            <h6>个人身材数据添加成功！</h6>
            <p>你可以在个人中心里修改你的身材数据</p>
         </div>
         <Link to={`${BASE_PAGE_DIR}/scene/0`} className="btn-deal">确认</Link>
      </div>
    )
  }
}

//module.exports = Home
export default Result
