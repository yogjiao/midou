module.exports = {
  path: 'underwear-detail',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/UnderwearDetail.js'))
    })
  }
}
