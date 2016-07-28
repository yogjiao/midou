import React from 'react'
import ReactDOM from 'react-dom'
import {
  BASE_PAGE_DIR,
  BASE_STATIC_DIR
} from 'macros.js'
import {backToNativePage} from 'webviewInterface.js'

import './Patent.less'
class Patent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerName: '蜜豆专利'
    }
    //this.state.tagsIndex[0] = 0
  }
  backHandler = () => {
    backToNativePage()
    this.props.history.goBack()
  };
  componentDidMount = () => {
  };
  render() {
    return (
      <div className="patent-model-container">

        <div className="patent-container" >
          <img src={`${BASE_STATIC_DIR}/img/patent.png`} />
        </div>
      </div>
    )
  }
}

module.exports = Patent
