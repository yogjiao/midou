
module.exports = {
  path: 'underwear/:productId',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./Underwear.js'))
    })
  },
  onEnter: (nextState, replace) => {
    // let data = {url: nextState.location.pathname}
    // notifyAppUrlChanged(data)
    //   .then((data)=>{
    //
    //   })
  }
}
