module.exports = {
  path: 'order-created',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('UserOrderCreated.js'))
    })
  }
}
