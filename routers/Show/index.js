module.exports = {
  path: 'show/:showId',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./Show.js'))
    })
  }
}
