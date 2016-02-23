module.exports = {
  path: 'receiver-info/:receiverInfoId/:actionModel',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('ReceiverInfo.js'))
    })
  }
}
