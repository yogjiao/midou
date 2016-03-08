import {BASE_PAGE_DIR} from 'macros.js'

module.exports = {
  path: 'assistant',
  indexRoute: { onEnter: (nextState, replace) => replace(`${BASE_PAGE_DIR}/assistant/step/1`) },
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes')
      ])
    })
  },

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('UnderwearAssistant.js'))
    })
  }
}
