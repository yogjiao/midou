import React from 'react'
import { Link } from 'react-router'
import PageHeader from 'PageHeader/PageHeader.js'
import PageSpin from 'PageSpin/PageSpin.js'
import ScrollingSpin from 'ScrollingSpin/ScrollingSpin.js'
import {FETCH_INDEX_DATA, BASE_DIR, CHEST_FEATRUES_1} from 'macros.js'
import {fetchable} from 'fetch.js'
let update = require('react-addons-update')

import AssistantSlideSelection from 'AssistantSlideSelection.js'


import './Step_1.less'
class Step extends React.Component {
  componentDidMount = () => {

  };
  componentWillUnmount = () => {
  };
  render() {
    return (
      <div className="Step-1-container">
        <img src="/media/test.png" />
        <AssistantSlideSelection
          selectedIndex={this.props.selectedId}
          source={CHEST_FEATRUES_1}
        />
      </div>
    )
  }
}

//module.exports = Home
module.exports = Step
