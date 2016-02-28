module.exports.add = {
  path: 'receiver/:actionModel',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('ReceiverInfo.js'))
    })
  }
}
module.exports.edit = {
  path: 'receiver/:receiverInfoId/:actionModel',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('ReceiverInfo.js'))
    })
  }
}
