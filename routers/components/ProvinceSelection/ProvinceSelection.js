import React from 'react'
import ReactDOM from 'react-dom'

import Selection from 'Selection/Selection.js'
import {getParentByClass} from 'util.js'
import PageSpin from 'PageSpin/PageSpin.js'
import {FETCH_CITIES} from 'macros.js'
import fetchable from 'fetch.js'

import './ProvinceSelection.less'
class ProvinceSelection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isHiddenSpin: true,
      isHiddenSelection: true,
      title: '选择省',
      provinceId: 1,
      provinceName: '',
      cityId: 1,
      cityName: '',
      cityData: [],
      //area: 1,
      textType: 1, // 1 province 2 city 3 area
      selectedIndex: 0,
      //cachedCity: {}
    }
  }
  getItemById = (list, id) => {
    let target
    list.forEach((item, index) => {
      if (item.id == id) {
        target = item
        return
      }
    })
    return target
  };
  getSelectedIndexById = (list, id) => {
    let tempIndex = -1
    list.forEach((item, index) => {
      if (item.id == id) {
        tempIndex = index
        return
      }
    })
    return tempIndex
  };
  popSelectionHandler = (e) => {
    let target
    let params

    if (target = getParentByClass(e.target, 'province-item-wrap')) {
      let textType = target.getAttribute('data-text-type')
      this.setState({textType: textType, isHiddenSelection: false})
    }
  };
  selectionHandler = (e) => {
    let target
    let params
    let nextState

    if (target = getParentByClass(e.target, 'select-item-wrap')) {
      nextState = {}
      params = JSON.parse(target.getAttribute('data-source'))

      switch ('' + this.state.textType) {
        case '1':
          nextState.provinceId = params.value
          nextState.provinceName = params.text
          nextState.isHiddenSpin = false
          nextState.isHiddenSelection = true
          this.setState(nextState)
          this.fetchCities(params.value, (data) => {
            nextState = {}
            nextState.cityData = data
            nextState.cityId = data[0].id
            nextState.cityName = data[0].name
            nextState.isHiddenSpin = true
            this.setState(nextState)
          })
          break;
        case '2':
          nextState = {}
          nextState.cityId = params.value
          nextState.cityName = params.text
          nextState.isHiddenSelection = true
          break;
        default:

      }
    } else if (target = getParentByClass(e.target, 'select-bg-layout')) {
      nextState = {isHiddenSelection: true}
    }

    nextState && this.setState(nextState)
  };
  fetchCities = (provinceId, callback) => {
    callback = callback || function(){}
    fetchable(`${FETCH_CITIES}/${provinceId}`, {method: 'get'})
      .then(data => {
        callback(data.city)
      })
      .catch(error => {
        debugger;
        this.setState({isHiddenSpin: true})
      })
  };
  componentDidMount = (e) => {
    //this.refs['selection'].show();
    if (this.props.provinceId) {
      this.setState({isHiddenSpin: false})
      this.fetchCities(this.props.provinceId, (data) => {
        let pItem = this.getItemById(this.props.source, this.props.provinceId)
        let cItem = this.getItemById(data, this.props.cityId)
        this.setState({
            provinceId: pItem.id,
            provinceName: pItem.name,
            cityId: cItem.id,
            cityName: cItem.name,
            cityData: data,
            isHiddenSpin: true
          });
      })
    }
  };
  componentWillUpdate = (nextProps, nextState) => {

  };
  render() {
    let source
    switch ('' + this.state.textType) {
      case '1':
        source = this.props.source;
        break;
      case '2':
        source = this.state.cityData;
        break;
      default:

    }
    source = source.map((item, index) => {
      return {
        value: item.id,
        text: item.name
      }
    })

    return (
      <div className="province-selection-container" onClick={this.popSelectionHandler}>
        <div className="province-item-wrap" data-text-type="1">
          <span>省：</span>
          <input
            disabled
            ref="text-1"
            type="text"
            data-id={this.state.provinceId}
            value={this.state.provinceName}
          />
          <i className="iconfont">&#xe601;</i>
        </div>
        <div className="province-item-wrap" data-text-type="2">
          <span>市：</span>
          <input
            disabled
            ref="text-2"
            type="text"
            data-id={this.state.cityId}
            value={this.state.cityName}
          />
          <i className="iconfont">&#xe601;</i>
        </div>

        <Selection
          source={source}
          selectionHandler={this.selectionHandler}
          itemType="2"
          title={this.state.title}
          selectedIndex={this.state.selectedIndex}
          isHidden={this.state.isHiddenSelection}
          ref="selection"
        />
        <PageSpin isHidden={this.state.isHiddenSpin} />
      </div>
    )
  }
}

export default ProvinceSelection
