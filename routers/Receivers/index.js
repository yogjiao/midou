module.exports = {
  path: 'receivers(/:actionModel)',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./Receivers.js'))
    })
  }
}
