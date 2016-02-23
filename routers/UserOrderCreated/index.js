module.exports = {
  path: 'order',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('UserOrderCreated.js'))
    })
  }
}
