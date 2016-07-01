import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import {
	BASE_PAGE_DIR,
	FETCH_CART_UNDERPANTS_RECOMMEND,
} from 'macros.js'

import {fetchable, fetchAuth} from 'fetch.js'

import Swiper from 'Swiper'

let update = require('react-addons-update');

import './UnderpantsRecommendation.less'
class UnderpantsRecommendation extends React.Component {
	constructor(props) {// actionModel: scal edit
    super(props)
    this.state = {
			recommends: [],
			pageIndex: 0,
			countPerPage: 20,
    }
  };
	fetchRecommendData = () => {
		let url = `${FETCH_CART_UNDERPANTS_RECOMMEND}/${this.state.pageIndex}/${this.state.countPerPage}`
		fetchAuth(url)
			.then((data) => {
				if (data.rea == 0) {
					let schema = update(this.state, {recommends: {$push: data.goods}})
					this.setState(schema, () => {
						this.swiper = new Swiper('.underpants-recommendation .swiper-container', {
							width: 	document.querySelector('.underpants-recommendation .swiper-container .swiper-slide').offsetWidth,
				      freeMode: true,
				    });

						//this.swiper.update()
					})
				}
			})
	};
	componentDidMount = () => {


		this.fetchRecommendData()
	};
  render() {
    return (
      <div className="underpants-recommendation">
				{
					this.state.recommends.length ?
					(
						<div className="swiper-container">
							<div className="swiper-wrapper">
								{
									this.state.recommends.map((item, index) => {
										return (
											<div className="ur-card swiper-slide" data-index={index}>
												<div className="img-wrapper" >
													<div className="bg-wrapper" style={{backgroundImage: `url(${item.main_img})`}}/>
												</div>
												<p>&yen;{item.price} 元</p>
											</div>
										)
									})
								}
								<div className="ur-card swiper-slide">
									<div className="img-wrapper">
										<div className="bg-wrapper">
											<div className="more-wrapper">
												<a href={`${BASE_PAGE_DIR}/search/0/2/0`}>查看全部</a>
												<span>See All</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					) : ''
				}

      </div>
    )
  }
}

export default UnderpantsRecommendation
