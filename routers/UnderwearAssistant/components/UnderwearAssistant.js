import React from 'react'
import { Link } from 'react-router'
import PageHeader from 'PageHeader/PageHeader.js'
import PageSpin from 'PageSpin/PageSpin.js'
import ScrollingSpin from 'ScrollingSpin/ScrollingSpin.js'
import {FETCH_INDEX_DATA, BASE_PAGE_DIR} from 'macros.js'
import {fetchable} from 'fetch.js'
let update = require('react-addons-update')

import './UnderwearAssistant.less'
class UnderwearAssistant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }
  backHandler = () => {
    this.props.history.goBack();
  };
  componentDidMount = () => {

  };
  componentWillUnmount = () => {
  };
  render() {
    let {children, params } = this.props
    let content
    if (children) {
      content = children
    } else {
      content = (<Link to={`${BASE_PAGE_DIR}/assistant/step/1`} className="lets-go">让我们开始吧</Link>)
    }
    return (
      <div className="assistant-container">
         <div className="iconfont" onClick={this.backHandler}>&#xe609;</div>
         {content}
      </div>
    )
  }
}

//module.exports = Home
module.exports = UnderwearAssistant
