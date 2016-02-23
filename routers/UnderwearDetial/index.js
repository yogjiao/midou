module.exports = {
  path: 'underwear/:productId',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('UnderwearDetail.js'))
    })
  }
}
