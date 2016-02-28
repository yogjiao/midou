import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'

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
    path: '/app-page',
    //component: require('../routers/Home'),
    //component: require('./App/App.js'),
    indexRoute: { component: Home },//require('./Home/Home.js')
    childRoutes: [
      require('./UnderwearList'),
      require('./UnderwearDetial'),
      require('./ShoppingCart'),
      require('./UserOrderCreated'),
      require('./UserOrderDetail'),
      require('./UserOrderList'),
      require('./ReceiverInfo').add,
      require('./ReceiverInfo').edit,
      require('./Receivers'),
      require('./UnderwearAssistant')
    ]
  } ]
}

render(
  <Router history={browserHistory} routes={rootRoute} />,
  document.getElementById('app-container')
)
