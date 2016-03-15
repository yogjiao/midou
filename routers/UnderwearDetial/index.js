import {notifyAppUrlChanged} from 'webviewInterface.js'
module.exports = {
  path: 'underwear/:productId',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('UnderwearDetail.js'))
    })
  },
  onEnter: (nextState, replace) => {
    // let data = {url: nextState.location.pathname}
    // notifyAppUrlChanged(data)
    //   .then((data)=>{
    //
    //   })
  },
}
