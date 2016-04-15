import React from 'react'
import ReactDOM from 'react-dom'

import Selection from 'Selection/Selection.js'
import {getParentByClass, pick} from 'util.js'
import PageSpin from 'PageSpin/PageSpin.js'
import {FETCH_CITIES, FETCH_SUCCESS} from 'macros.js'
import {fetchable} from 'fetch.js'

import './ProvinceSelection.less'
class ProvinceSelection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isHiddenPageSpin: true,
      isHiddenSelection: true,
      title: '选择省',
      provinceId: '',
      provinceName: '',
      provinceIndex: 0,
      cityId: '',
      cityName: '',
      citySource: [],
      cityIndex: 0,
      //area: 1,
      selectionType: 1, // 1 province 2 city 3 area
      //selectedIndex: 0,
      //cachedCity: {}
    }
  }
  getItemById = (list, id) => {
    let target
    list.forEach((item, index) => {
      if (item.id == id) {
        target = item
        target.index = index
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
  callOutSlectionHandler = (e) => {
    let target
    let params

    if (target = getParentByClass(e.target, 'province-item-wrap')) {
      let selectionType = target.getAttribute('data-text-type')
      this.setState({selectionType: selectionType, isHiddenSelection: false})
    }
  };
  selectionHandler = (e) => {
    let target
    let params
    let nextState

    if (target = getParentByClass(e.target, 'select-item-wrap')) {

      params = JSON.parse(target.getAttribute('data-source'))

      switch ('' + this.state.selectionType) {
        case '1':
          if (params.value != this.state.provinceId) {
            this.fetchCities(params.value)
          }
          break;
        case '2':
          nextState = {}
          nextState.cityId = params.value
          nextState.cityName = params.text
          nextState.cityIndex = target.getAttribute('data-index')
          nextState.isHiddenSelection = true
          this.setState(nextState)
          let changedData = {
            cityId: nextState.cityId,
            cityName: nextState.cityName,
            provinceId: this.state.provinceId,
            provinceName: this.state.provinceName,
          }
          this.props.onAddressChange(changedData)
          break;
      }
    } else if (target = getParentByClass(e.target, 'select-bg-layout')) {
      this.setState({isHiddenSelection: true})
    }

  };
  // /**
  //  * fresh component when the provinceId changed
  //  * @param {number} [provinceId=this.props.provinceId]
  //  * @param {number} [cityId=this.props.cityId]
  //  */
  // freshWhenProvinceIdChanged = () => {
  //   this.setState({isHiddenPageSpin: false, isHiddenSelection: true})
  //
  // };
  fetchCities = (provinceId = this.state.provinceId, cityId) => {
    this.setState({isHiddenPageSpin: false})
    fetchable(`${FETCH_CITIES}/${provinceId}`)
      .then(data => {
        if (data.rea == FETCH_SUCCESS) {
          let pItem
          let cItem

          if (cityId) {
            cItem =this.getItemById(data.city, cityId)
          }
          if (!cItem) {
            cityId = data.city[0].id
            cItem = this.getItemById(data.city, cityId)
          }
           pItem = this.getItemById(this.props.source, provinceId)
          let nextState = {
              provinceId: pItem.id,
              provinceName: pItem.name,
              provinceIndex: pItem.index,
              cityId: cItem.id,
              cityName: cItem.name,
              citySource: data.city,
              cityIndex: cItem.index
            }
           nextState.isHiddenSelection = true
           nextState.isHiddenPageSpin = true

           this.setState(nextState)
           let changedData = pick(nextState, 'provinceId','provinceName','cityId','cityName')
           this.props.onAddressChange(changedData)

         }
      })
      .catch(error => {

      })
      .then( () => {
        //this.setState({isHiddenPageSpin: true})
      })
  };
  componentDidMount = () => {
    if (this.props.provinceId) {
      this.fetchCities(this.props.provinceId, this.props.cityId)
    }
  };
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.provinceId && nextProps.provinceId != this.state.provinceId) {
      this.fetchCities(nextProps.provinceId, nextProps.cityId)
    }
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    if ( nextProps.provinceId == this.state.provinceId &&
      nextProps.cityId == this.state.cityId &&
      nextState.isHiddenSelection == this.state.isHiddenSelection){
      return false
    } else {
      return true
    }

  };
  render() {
    let source, selectedIndex
    switch ('' + this.state.selectionType) {
      case '1':
        source = this.props.source;
        selectedIndex = this.state.provinceIndex;
        break;
      case '2':
        source = this.state.citySource;
        selectedIndex = this.state.cityIndex;
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
      <div className="province-selection-container" onClick={this.callOutSlectionHandler}>
        <div className="province-item-wrap" data-text-type="1">
          <span>省：</span>
          <input
            disabled
            ref="text-1"
            type="text"
            data-id={this.state.provinceId}
            value={this.state.provinceName}
          />
          <i className="iconfont">&#xe60a;</i>
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
          <i className="iconfont">&#xe60a;</i>
        </div>

        <Selection
          source={source}
          selectionHandler={this.selectionHandler}
          itemType="2"
          title={this.state.title}
          selectedIndex={selectedIndex}
          isHidden={this.state.isHiddenSelection}
          ref="selection"
        />
      </div>
    )
  }
}

export default ProvinceSelection
