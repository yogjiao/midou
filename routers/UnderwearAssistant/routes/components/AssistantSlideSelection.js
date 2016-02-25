import React from 'react'
import { Link } from 'react-router'
import PageHeader from 'PageHeader/PageHeader.js'
import PageSpin from 'PageSpin/PageSpin.js'
import ScrollingSpin from 'ScrollingSpin/ScrollingSpin.js'
import {FETCH_INDEX_DATA, BASE_DIR, CHEST_FEATRUES_1} from 'macros.js'
import {fetchable} from 'fetch.js'
let update = require('react-addons-update')

import './AssistantSlideSelection.less'
class AssistantSlideSelection extends React.Component {
  componentDidMount = () => {

  };
  componentWillUnmount = () => {
  };
  render() {
    return (
      <div className="as-container">
        <div className="as-justify-wrap">
          <div className="as-line"></div>
          <ul className="as-item-wrap">
            {
              this.props.source.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={this.props.selectedIndex == index?
                      'as-item on' :
                      "as-item"}
                   >
                    <p>{item.name}</p>
                    <i className="iconfont">&#xe60b;</i>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

//module.exports = Home
module.exports = AssistantSlideSelection
