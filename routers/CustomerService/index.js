module.exports = {
  path: 'customer-service',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./CustomerService.js'))
    })
  }
}
