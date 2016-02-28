module.exports = {
  path: 'order/:goodsIds',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('UserOrderCreated.js'))
    })
  }
}
