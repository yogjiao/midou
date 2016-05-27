import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import PageHeader from 'PageHeader/PageHeader.js'
import {
    CREATE,
    UPDATE,
    FETCH_RECEIVER_INFO,
    PUT_RECEIVER_INFO,
    FETCH_SUCCESS,
    PAGE_TO_PAGE_SIGNAL
  } from 'macros.js'
import {getParentByClass, pick} from 'util.js'
import Confirm from 'Confirm/Confirm.js'
import Prompt from 'Prompt/Prompt.js'
import ProvinceSelection from 'ProvinceSelection/ProvinceSelection.js'
import provinces from 'provinces.js'
import PageSpin from 'PageSpin/PageSpin.js'
import {fetchAuth} from 'fetch.js'
import {
  backToNativePage,
  receiveNotificationsFromApp,
  sendSignalToOtherPagesByOc
} from 'webviewInterface.js'
let update = require('react-addons-update')
import ua from 'uaParser.js'

import './ReceiverInfo.less'
class ReceiverInfo extends React.Component {
  constructor(props) {// actionModel: scal edit
    super(props);
    this.state = {
      isHiddenPageSpin: false,
      promptMsg: '',
      id: 0,
      name: '',
      phone:'',
      province: '',

      city: '',
      detail: ''
    }

    if (this.props.params.actionModel == CREATE) {
      this.state.province = 1
      this.state.provinceName = '北京'
    }
  }
  fetchReceiverInfo = () => {
    let url = `${FETCH_RECEIVER_INFO}/${this.props.params.receiverInfoId}`
    fetchAuth(url)
      .then((data) => {
        if (data.rea == FETCH_SUCCESS) {
          this.setState(data.address)
        }
      })
      .catch((e) => {

      })
      .then(() => {
        this.setState({isHiddenPageSpin: true});
      })

  };
  nameChangeHanler = (event) => {
    this.setState({name: event.target.value.substr(0, 50)});
  };
  phoneChangeHanler = (event) => {
    this.setState({phone: event.target.value.replace(/\D/g, '').substr(0, 11)});
  };
  detailChangeHanler = (event) => {
    this.setState({detail: event.target.value.substr(0, 100)});
  };
  backHandler = () => {
    if (ua.isApp()) {
      backToNativePage()
    } else {
      this.props.history.goBack()
    }
  };
  addressChangeHandler = (data) => {
    this.state.province = data.provinceId
    this.state.provinceName = data.provinceName
    this.state.city = data.cityId
    this.state.cityName = data.cityName
  };

  saveHanler = () => {
    let url = `${PUT_RECEIVER_INFO}/${this.state.id}`
    let data = pick(this.state, 'id','name','phone','province','city','detail')
    fetchAuth(url, {method: 'post', body: JSON.stringify(data)})
      .then((data) => {
        if (data.rea == FETCH_SUCCESS) {
          let nextState = {}
          if (this.props.params.actionModel == CREATE) {
            nextState = {promptMsg: '收货人信息添加成功'}
            let signal = {
              signal: PAGE_TO_PAGE_SIGNAL.ADD_ADDRESS
            }
            sendSignalToOtherPagesByOc(signal)
          } else {
             nextState = {promptMsg: '收货人信息修改成功'}
            let cacheData = {
              id: this.state.id,
              name: this.state.name,
              phone: this.state.phone,
              province: this.state.province,
              provinceName: this.state.provinceName,
              city: this.state.city,
              cityName: this.state.cityName,
              detail: this.state.detail
            }
            cacheData.signal = PAGE_TO_PAGE_SIGNAL.UPDATE_ADDRESS
            sendSignalToOtherPagesByOc(cacheData)
          }


          this.setState(nextState)
          this.refs['prompt'].show()

          setTimeout(()=>{
            this.backHandler()
          }, 1500)

        } else {
          this.setState({promptMsg: '请填写完整信息'})
          this.refs['prompt'].show();
        }
      })
      .catch(() => {

      })
      .then(() => {


      })
  };
  componentWillMount = () => {
    if (this.props.params.actionModel == CREATE) {
      this.state.isHiddenPageSpin = true
      this.state.headerName = '收货人信息'
    } else {
      this.state.headerName = '收货人信息'
      this.state.id = this.props.params.receiverInfoId
    }
  };
  componentDidMount = () => {
    if (this.props.params.actionModel == UPDATE) {
      this.fetchReceiverInfo()
    }

    receiveNotificationsFromApp((data, callback) => {
      if (data.type == '8') {
        this.saveHanler()
      }
    })
  };
  componentWillReceiveProps = (props) => {
  };
  componentWillUpdate = (nextProps, nextState) => {
  };

  render() {
    return (
      <div className="reciever-info-container" onClick={this.editHandler}>
      {
        ua.isApp()?
        '':
        (
          <PageHeader headerName={this.state.headerName}>
            <i className="iconfont icon-arrow-left" onClick={this.backHandler}></i>
            <div className="btn-save" onClick={this.saveHanler}>保存</div>
          </PageHeader>
        )
      }

        <div className="receiver-item">
          <input placeholder="收货人姓名" value={this.state.name} onChange={this.nameChangeHanler}/>
        </div>
        <div className="receiver-item">
          <input placeholder="手机号码" value={this.state.phone} onChange={this.phoneChangeHanler}/>
        </div>
        <div className="receiver-item">
          <ProvinceSelection source={provinces} provinceId={this.state.province} cityId={this.state.city} onAddressChange={this.addressChangeHandler}/>
        </div>
        <div className="receiver-item">
          <textarea placeholder="详细地址"  value={this.state.detail} onChange={this.detailChangeHanler}/>
        </div>
        <PageSpin isHidden={this.state.isHiddenPageSpin} />
        <Prompt isHidden={this.state.isHiddenPrompt} msg={this.state.promptMsg} ref="prompt" />
      </div>

    )
  }
}

module.exports = ReceiverInfo
