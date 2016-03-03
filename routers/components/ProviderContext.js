import React, { Component, PropTypes, Children } from 'react'
import PageSpin from 'PageSpin/PageSpin.js'
import Prompt from 'Prompt/Prompt.js'

class ProviderContext extends Component {

    render() {
        let { children } = this.props;
        return Children.only(children);
    }
}


// App.childContextTypes = {
//   pageSpin: React.PropTypes.element.isRequired
// }
// App.childContext = {
//   pageSpin: pageSpin
// }
ProviderContext.childContext = {
  name: 'Moussawi7'
}

export default ProviderContext
