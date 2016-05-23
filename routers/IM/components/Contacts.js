import React from 'react'
import ContactsItem from 'ContactsItem.js'
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
