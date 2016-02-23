import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import PageHeader from 'PageHeader/PageHeader.js'
import {ROUTER_RECIEVER_INFO_SCAN, ROUTER_RECIEVER_INFO_EDIT, FETCH_RECEIVER_INFO} from 'macros.js'
import {getParentByClass} from 'util.js'
import Confirm from 'Confirm/Confirm.js'
import Prompt from 'Prompt/Prompt.js'
import ProvinceSelection from 'ProvinceSelection/ProvinceSelection.js'
import provinces from 'provinces.js'
import PageSpin from 'PageSpin/PageSpin.js'
import fetchable from 'fetch.js'

let update = require('react-addons-update')

import './ReceiverInfo.less'
class ReceiverInfo extends React.Component {
  constructor(props) {// actionModel: scal edit
    super(props);
    this.state = {
      isHiddenSpin: false,
      title: '添加收货人信息',
      /*
      "name": "测试姓名",
      "phone": "18588886666",
      "province": "1",
      "city": "1",
      "detail": "南山区白石洲1"
      */
    }

  }
  fetchReceiverInfo = (callback) => {
    fetchable(`${FETCH_RECEIVER_INFO}/${this.props.params.receiverInfoId}`)
      .then((data) => {
        callback(data.address)
      })
      .catch((e) => {
        this.setState({isHiddenSpin: true});
      })

  };
  componentWillMount = () => {
    if (this.props.params.actionModel == ROUTER_RECIEVER_INFO_SCAN) {
      this.state.title = '添加收货人信息'
    } else {
      this.state.title = '编辑收货人信息'
    }
  };
  componentDidMount = () => {
    if (this.props.params.actionModel == ROUTER_RECIEVER_INFO_SCAN) {
      this.fetchReceiverInfo( data => {
        data.isHiddenSpin = true
        this.setState(data)
      })
    }

  };
  componentWillReceiveProps = (props) => {
  };
  componentWillUpdate = (nextProps, nextState) => {

  };
  render() {
    return (
      <div className="reciever-info-container" onClick={this.editHandler}>
        <PageHeader headerName={this.state.headerName}>
          <i className="iconfont">&#xe601;</i>
          <div>保存</div>
        </PageHeader>
        <div className="receiver-item">
          <input placeholder="收货人姓名" value={this.state.name} />
        </div>
        <div className="receiver-item">
          <input placeholder="手机号码" value={this.state.phone}/>
        </div>
        <div className="receiver-item">
          <ProvinceSelection source={provinces} provinceId={this.state.province} cityId={this.state.city}/>
        </div>
        <div className="receiver-item">
          <textarea placeholder="详细地址" value={this.state.detail} />
        </div>
        <PageSpin isHidden={this.state.isHiddenSpin} />
      </div>

    )
  }
}

module.exports = ReceiverInfo
