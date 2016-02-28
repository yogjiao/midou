module.exports = {
  path: 'receivers',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./Receivers.js'))
    })
  }
}
