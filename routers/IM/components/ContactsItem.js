import React from 'react'
import PageSpin from 'PageSpin/PageSpin.js'
import Prompt from 'Prompt/Prompt.js'
import ScrollingSpin from 'ScrollingSpin/ScrollingSpin.js'
import {
  FETCH_INDEX_DATA,
  FETCH_STATUS_NO_MORE_PRODUCT,
  FETCH_SUCCESS,
  BASE_STATIC_DIR
} from 'macros.js'
import {fetchable} from 'fetch.js'
import errors from  'errors.js'
let update = require('react-addons-update')

import {getUserInfoFromApp} from 'webviewInterface.js'

import './ContactsItem.less'
class ContactsItem extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
			<div className="contacts-wraper">
				<div
					className="avater"
					style={{backgroundImage: `url(${BASE_STATIC_DIR}/img/share-4.png)`}}
				>
				</div>
				<div className="other-wraper">
					<div className="user-name">科学空间交流圈</div>
					<div className="date-wraper">星期五</div>
					<div className="newest-msg">
						<p>我要退货！我要退货！我要退货！我要退货！我要退货！</p>
						<div className="unread-num">24</div>
					</div>
				</div>
			</div>
    )
  }
}

export default ContactsItem
