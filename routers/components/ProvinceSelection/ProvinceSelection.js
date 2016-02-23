import React from 'react'
import ReactDOM from 'react-dom'

import Selection from 'Selection/Selection.js'
import {getParentByClass} from 'util.js'
import './ProvinceSelection.less'

import PageSpin from 'PageSpin/PageSpin.js'

class ProvinceSelection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isHiddenSpin: true,
      title: '选择省',
      province: 1,
      city: 1,
      //area: 1,
      textType: 1, // 1 province 2 city 3 area
      selectedIndex: 0,
      //cachedCity: {}
    }
  }
  getItemById = (list, id) => {
    let target;
    list.forEach((item, index) => {
      if (item.id == id) {
        target = item
        return
      }
    })
    return target
  };
  popSelectionHandler = (e) => {
    let target
    let params

    if (target = getParentByClass(e.target, 'province-item-wrap')) {
      this.state.textType = target.getAttribute('data-text-type')
      this.refs['selection'].show();
    }
  };
  selectionHandler = (e) => {
    let target
    let params

    if (target = getParentByClass(e.target, 'select-item-wrap')) {
      params = JSON.parse(target.getAttribute('data-source'))
      this.refs['text-' + params.textType].value = params.text
      this.refs['selection'].hide();
      this.state.selectedIndex = target.getAttribute('data-index')
      this.setState({});
    } else if (target = getParentByClass(e.target, 'select-bg-layout')) {
      this.refs['selection'].hide();
    }
  };
  fetchCities = (provinceId) => {
    fetch('/app/get_cart')
      .then(data => {
        data = {
          city: [
            {
                "id": 1,
                "name": "广州市"
            },
            {
                "id": 2,
                "name": "深圳市"
            }
          ]
        }
        this.setState({source: data.city});
      })
      .catch(error => this.props.getPageSpin().hide())
  };
  componentDidMount = (e) => {
    //this.refs['selection'].show();
    if (this.state.textType == '2') {
      this.fetchCities()
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
        source = this.state.source;
        break;
      default:

    }
    source = source.map((item, index) => {
      return {
        value: item.id,
        text: item.name,
        textType: this.state.textType
      }
    })

    return (
      <div className="province-selection-container" onClick={this.popSelectionHandler}>
        <div className="province-item-wrap" data-text-type="1">
          <span>省：</span><input ref="text-1" disabled type="text" />
          <i className="iconfont">&#xe601;</i>
        </div>
        <div className="province-item-wrap" data-text-type="2">
          <span>市：</span><input disabled ref="text-2" type="text" />
          <i className="iconfont">&#xe601;</i>
        </div>

        <Selection
          source={source}
          selectionHandler={this.selectionHandler}
          itemType="2"
          title={this.state.title}
          selectedIndex={this.state.selectedIndex}
          ref="selection"
        />
        <PageSpin isHidden={this.state.isHiddenSpin} />
      </div>
    )
  }
}

export default ProvinceSelection
