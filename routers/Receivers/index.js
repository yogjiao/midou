module.exports.scan={
  path: 'receivers',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./Receivers.js'))
    })
  }
}
module.exports.edit={
  path: 'receivers/:receiversModel',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./Receivers.js'))
    })
  }
}
