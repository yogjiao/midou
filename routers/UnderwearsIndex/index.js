module.exports = {
  path: 'underwears/index',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('UnderwearsIndex.js'))
    })
  }
}
