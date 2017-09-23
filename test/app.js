const feathers = require('feathers')
const bodyParser = require('body-parser')
const hooks = require('feathers-hooks')
const rest = require('feathers-rest')
const socketio = require('feathers-socketio')
const memory = require('feathers-memory')

const errors = require('feathers-errors')
const { disableMultiItemChange } = require('feathers-hooks-common')

const app = feathers()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))

  // Set up Plugins and providers
  .configure(hooks())
  .configure(rest())
  .configure(socketio(function (io) {}, { timeout: 999999 }))

  // Setup test services
  .use('method-not-allowed', memory())
  .use('requires-auth', memory())
  .use('disable-multi-item-change', memory())
  .use('not-implemented', memory())
  .use('forbidden', memory())
  .use('patch-service', memory())

app.service('method-not-allowed').hooks({
  before: {
    create: [
      context => {
        return Promise.reject(new errors.MethodNotAllowed())
      }
    ]
  }
})

app.service('requires-auth').hooks({
  before: {
    create: [
      context => {
        return Promise.reject(new errors.NotAuthenticated())
      }
    ]
  }
})

app.service('disable-multi-item-change').name = 'disable-multi-item-change'

app.service('disable-multi-item-change').hooks({
  before: {
    remove: [
      disableMultiItemChange()
    ]
  }
})

app.service('not-implemented').hooks({
  before: {
    create: [
      context => {
        return Promise.reject(new errors.NotImplemented())
      }
    ]
  }
})

app.service('forbidden').hooks({
  before: {
    create: [
      context => {
        return Promise.reject(new errors.Forbidden())
      }
    ]
  }
})

app.service('patch-service').hooks({
  before: {
    patch: [
      context => {
        const { data } = context

        if (data.noTouchy) {
          return Promise.reject(new errors.BadRequest('you cannot patch noTouchy'))
        }
      }
    ]
  }
})

module.exports = app
