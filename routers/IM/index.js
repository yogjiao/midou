module.exports = {
  path: 'im(/:userId)',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./IM.js'))
    })
  }
}
