module.exports = {
  path: 'order/:orderId',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('UserOrderDetail.js'))
    })
  }
}
