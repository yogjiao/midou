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
import ContactsItem from 'ContactsItem.js'
import {getUserInfoFromApp} from 'webviewInterface.js'

import IScroll from 'IScroll/build/iscroll-infinite.js'

import './Contacts.less'
class Contacts extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  updateContacts = () => {

  };
  componentDidMount = () => {

  };
  render() {
    return (
			<div
        className="contacts-container"
        style={{left: this.props.isHidden? '100%' : '0'}}
      >
        <div className="contact-header">
          <h2>联系人</h2>
          <i className="iconfont icon-close close-contacts" />
        </div>
				<div className="contacts-list" >
          <div className="contacts-scroller" id="contacts-scroller">
            <div>
              {
                 this.props.source.map((item, index, contacts) => {
                  item.index = index
                  return <ContactsItem
                    key={item.id}
                    source={item}
                  />
                })
              }
            </div>
          </div>
				</div>
			</div>
    )
  }
}

export default Contacts
