module.exports = {
  path: 'underwear-detail/:productId',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/UnderwearDetail.js'))
    })
  }
}
