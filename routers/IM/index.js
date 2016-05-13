module.exports = {
  path: 'im(/:friendId)',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./IM.js'))
    })
  }
}
