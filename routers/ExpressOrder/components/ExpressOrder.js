import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import PageHeader from 'PageHeader/PageHeader.js'
import {
    PUT_EXPRESS_ORDER,
    FETCH_SUCCESS,
    BASE_PAGE_DIR
  } from 'macros.js'
import {getParentByClass, pick} from 'util.js'
import Confirm from 'Confirm/Confirm.js'
import Prompt from 'Prompt/Prompt.js'
import PageSpin from 'PageSpin/PageSpin.js'
import {fetchAuth} from 'fetch.js'
import {backToNativePage} from 'webviewInterface.js'

let update = require('react-addons-update')

import './ExpressOrder.less'
class ExpressOrder extends React.Component {
  constructor(props) {// actionModel: scal edit
    super(props);
    this.state = {
      headerName: '填写物流信息',
      isHiddenPageSpin: true,
      isHiddenServiceLayer: true,
      promptMsg: '',
      waybill_number: '',
      phone: '',
      remark: ''
    }

  }
  expressOrderChangeHandler = (event) => {
    this.setState({waybill_number: event.target.value.substr(0, 100)});
  };
  phoneChangeHandler = (event) => {
    this.setState({phone: event.target.value.replace(/\D/g, '').substr(0, 11)});
  };
  remarkChangeHandler = (event) => {
    this.setState({remark: event.target.value.substr(0, 200)});
  };
  backHandler = () => {
    backToNativePage()
      .then((data)=>{

      })
    this.props.history.goBack()
  };
  saveHanler = () => {
    let url = `${PUT_EXPRESS_ORDER}/${this.props.params.orderId}`
    let data = pick(this.state, 'waybill_number','phone','remark')
    data.id = this.props.params.orderId
    this.setState({isHiddenPageSpin: false})
    fetchAuth(url, {method: 'post', body: JSON.stringify(data)})
      .then((data) => {
        if (data.rea == FETCH_SUCCESS) {
          let nextState = {}
          nextState = {promptMsg: '运单添加成功'}
          this.setState(nextState)
          this.refs['prompt'].show();
        } else {
          let nextState = {}
          nextState = {promptMsg: '请填写完整信息'}
          this.setState(nextState)
          this.refs['prompt'].show();
        }
      })
      .catch(() => {

      })
      .then(() => {
        this.setState({isHiddenPageSpin: true})
      })
  };
  componentWillMount = () => {

  };
  componentDidMount = () => {
    if (this.props.params.isTry == '0') {
      this.setState({isHiddenServiceLayer: false})
    }
  };

  render() {
    return (
      <div className="express-order-container" onClick={this.editHandler}>
        <PageHeader headerName={this.state.headerName}>
          <i className="iconfont" onClick={this.backHandler}>&#xe609;</i>
          <div className="btn-save" onClick={this.saveHanler}>保存</div>
        </PageHeader>
        <div className="tips-wrap">
            收到货物后<br />我们将会在两个工作日内处理您的订单
            <img src="/app-static/img/car.png" />
        </div>
        <div className="receiver-item">
          <input placeholder="运单号" value={this.state.waybill_number} onChange={this.expressOrderChangeHandler}/>
        </div>
        <div className="receiver-item">
          <input placeholder="手机号码" value={this.state.phone} onChange={this.phoneChangeHandler}/>
        </div>
        <div className="receiver-item">
          <textarea placeholder="备注"  value={this.state.remark} onChange={this.remarkChangeHandler}/>
        </div>
        <PageSpin isHidden={this.state.isHiddenPageSpin} />
        <Prompt isHidden={this.state.isHiddenPrompt} msg={this.state.promptMsg} ref="prompt" />
        <div className="service-layer" style={{display: this.state.isHiddenServiceLayer? 'none' : 'block'}}>
          <div className="service-wrap">
            进行申请退换货操作时<br />请先联系客服
            <Link to={`${BASE_PAGE_DIR}/customer-service`} className="btn-sure">确定</Link>
          </div>
        </div>
      </div>

    )
  }
}

module.exports = ExpressOrder
