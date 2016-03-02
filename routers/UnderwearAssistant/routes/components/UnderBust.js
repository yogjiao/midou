import React from 'react'
import { Link } from 'react-router'
import {BASE_STATIC_DIR} from 'macros.js'

import './Age.less'
class UnderBust extends React.Component {
  render() {
    return (
      <div className="age-container">
         <h2>你的下胸围</h2>
         <div className="img-wrap"><img src={`${BASE_STATIC_DIR}/img/under-bust.png`} /></div>
         <div className="select-wrap" data-feature-name="under_bust">
           <span>{this.props.source.text}</span>
           <i className="iconfont">&#xe60a;</i>
         </div>
      </div>
    )
  }
}

//module.exports = Home
export default UnderBust
