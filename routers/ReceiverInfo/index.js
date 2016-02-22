module.exports = {
  path: 'receiver-info/:actionModel',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('ReceiverInfo.js'))
    })
  }
}
