import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import {BASE_PAGE_DIR} from 'macros.js'

//React.initializeTouchEvents(true);
//import ocBridge from './components/WebViewJavascriptBridge.js'

//pollyfill
import 'es6-promise'
import 'whatwg-fetch'

//enhance
import fastclick  from 'fastclick'

//init
fastclick(document.body);


import '../app-page/index.less'
import App from './App/App.js'
import Home from './Home/Home.js'


const rootRoute = {
  component: App,
  childRoutes: [ {
    path: `${BASE_PAGE_DIR}`,//`${BASE_PAGE_DIR}/scene/:sceneId`,
    //component: require('../routers/Home'),
    //component: require('./App/App.js'),
    //indexRoute: { component: Home },//require('./Home/Home.js')
    childRoutes: [
      require('./Home'),
      require('./UnderwearList'),
      require('./UnderwearDetial'),
      require('./ShoppingCart'),
      require('./UserOrderCreated'),
      require('./UserOrderDetail'),
      require('./UserOrderList'),
      require('./ReceiverInfo').add,
      require('./ReceiverInfo').edit,
      require('./Receivers').scan,
      require('./Receivers').edit,
      require('./ExpressOrder'),
      require('./UnderwearAssistant')
    ]
  } ]
}

render(
  <Router history={browserHistory} routes={rootRoute} />,
  document.getElementById('app-container')
)
