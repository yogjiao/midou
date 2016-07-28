import React from 'react'
import ReactDOM from 'react-dom'

import './AdditionalTips.less'
import {
  BASE_PAGE_DIR,
  BASE_STATIC_DIR,
  FETCH_CARTS_STATE
} from 'macros.js'
import {fetchAuth} from 'fetch.js'
import {getUserInfoFromApp} from 'webviewInterface.js'
import {getMiDouToken} from 'commonApp.js'
import {FETCH_SUCCESS} from 'macros.js'
import {getParentByClass} from 'util.js'
class AdditionalTips extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedindex: 0
    }
  }
	thisHandler = (e) => {
		let target
		if (target = getParentByClass(e.target, 'tab')) {
			let sibling = target
			let index = 0;
			while (sibling = sibling.previousElementSibling) {
				index++
			}
			this.setState({selectedindex: index})
		}
	};
	getClassName = (index, tabOrNot) => {
		return tabOrNot?
			(index == this.state.selectedindex? 'tab on' : 'tab') :
			(index == this.state.selectedindex? 'tips-contant on' : 'tips-contant')
	};
  componentDidMount = () => {

  };
  render() {
    return (
      <div className="add-tips-container">
				<div className="tips-header" onClick={this.thisHandler}>
					<ul>
						<li className={this.getClassName(0, 1)}>
							<i className="iconfont icon-vendor"></i>
							<div>制造商介绍</div>
						</li>
						<li className={this.getClassName(1, 1)}>
							<i className="iconfont icon-return"></i>
							<div>退换货须知</div>
						</li>
					</ul>
				</div>
				<ul className="tips-content">
					<li className={this.getClassName(0, 0)}>
					Mielseno蜜豆由中国顶级内衣制造商出品，与Calvin Klein、Triumph（黛安芬）、Victoria’s Secret等国际高端内衣品牌产自同一工艺及生产线。
该制造商拥有30年内衣研发织造经验，已获得欧盟最高标准的信心纺织品认证和美国服装业负责任纺织品供应商认证，具有出口级质量保证。
					</li>
					<li className={this.getClassName(1, 0)}>
					Nice in将在下单后48小时内为您发货，常规商品支持7天无理由退换（内裤、贴身情趣类以及赠品不接受退换）。
如需退换货，请在签收后72小时内联系客服，如商品有明显使用痕迹，或影响二次销售将不予退换。
如您选择了免费试穿服务，请在签收商品后七天内退回平台，或进行补差价操作。退回试穿商品前请联系客服。
					</li>
				</ul>
			</div>
    )
  }
}

export default AdditionalTips
