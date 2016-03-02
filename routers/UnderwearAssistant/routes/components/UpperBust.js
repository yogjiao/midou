import React from 'react'
import { Link } from 'react-router'
import {BASE_STATIC_DIR} from 'macros.js'

import './Age.less'
class UpperBust extends React.Component {
  render() {
    return (
      <div className="age-container">
         <h2>你的上胸围</h2>
         <div className="img-wrap">
            <img src={`${BASE_STATIC_DIR}/img/upper-bust.png`} />
        </div>
         <div className="select-wrap" data-feature-name="upper_bust">
           <span>{this.props.source.text}</span>
           <i className="iconfont">&#xe60a;</i>
         </div>
      </div>
    )
  }
}

//module.exports = Home
export default UpperBust
