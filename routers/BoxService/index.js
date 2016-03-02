module.exports = {
  path: 'box-service',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./BoxService.js'))
    })
  }
}
