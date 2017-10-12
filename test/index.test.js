const assert = require('assert')
const utils = require('../lib/index')
const app = require('./app')

describe('feathers-mocha-utils', () => {
  it('has everything in place', function () {
    assert(utils.assert, 'assertion utils are in place')

    const methods = [
      'methodNotAllowed',
      'requiresAuth',
      'disableMultiItemChange',
      'notImplemented',
      'forbidden',
      'notFound',
      'canPatch',
      'cannotPatch'
    ]

    // Make sure all methods are explicitly intended
    Object.keys(utils.assert).forEach(method => {
      assert(methods.includes(method))
    })

    methods.forEach(method => {
      assert(typeof utils.assert[method] === 'function', 'the method was in place')
    })
  })

  describe('Setup', function () {

  })

  describe('Assertions', function () {
    describe('methodNotAllowed', function () {
      it('properly passes with method-not-allowed response', function (done) {
        const service = app.service('method-not-allowed')

        service.create({})
          .then(done)
          .catch(error => {
            assert(error.className === 'method-not-allowed', 'should get method-not-allowed error')
            assert(error.code === 405, 'should get 405 error')

            return utils.assert.methodNotAllowed(service, 'create', done)
          })
          .catch(done)
      })
    })

    describe('requiresAuth', function () {
      it('properly passes with not-authenticated response', function (done) {
        const service = app.service('requires-auth')

        service.create({})
          .then(done)
          .catch(error => {
            assert(error.className === 'not-authenticated', 'should get not-authenticated error')
            assert(error.code === 401, 'should get 401 error')

            return utils.assert.requiresAuth(service, 'create', done)
          })
          .catch(done)
      })
    })

    describe('disableMultiItemChange', function () {
      it('properly passes with bad-request response', function (done) {
        const service = app.service('disable-multi-item-change')

        service.remove(null, {})
          .then(done)
          .catch(error => {
            assert(error.className === 'bad-request', 'should get bad-request error')
            assert(error.code === 400, 'should get 400 error')
            assert(error.message === `Multi-record changes not allowed for disable-multi-item-change remove. (disableMultiItemChange)`)

            return utils.assert.disableMultiItemChange(service, 'remove', done)
          })
          .catch(done)
      })
    })

    describe('notImplemented', function () {
      it('properly passes with not-implemented response', function (done) {
        const service = app.service('not-implemented')

        service.create({})
          .then(done)
          .catch(error => {
            assert(error.className === 'not-implemented', 'should get not-implemented error')
            assert(error.code === 501, 'should get 501 error')

            return utils.assert.notImplemented(service, 'create', done)
          })
          .catch(done)
      })
    })

    describe('notFound', function () {
      it('properly passes with not-found response', function (done) {
        const service = app.service('not-found')

        service.create({})
          .then(done)
          .catch(error => {
            assert(error.className === 'not-found', 'should get not-found error')
            assert(error.code === 404, 'should get 404 error')

            return utils.assert.notFound(service, 'create', done)
          })
          .catch(done)
      })
    })

    describe('forbidden', function () {
      it('properly passes with forbidden response', function (done) {
        const service = app.service('forbidden')

        service.create({})
          .then(done)
          .catch(error => {
            assert(error.className === 'forbidden', 'should get forbidden error')
            assert(error.code === 403, 'should get 403 error')

            return utils.assert.forbidden(service, 'create', done)
          })
          .catch(done)
      })
    })

    describe('canPatch & cannotPatch', function () {
      before(function () {
        return app.service('patch-service').create({ test: true, test1: false, testDeep: {} })
          .then(response => {
            this.item = response
          })
      })

      it('properly passes when the user can patch', function (done) {
        const item = this.item
        const service = app.service('patch-service')

        service.patch(item.id, { test: false })
          .then(response => {
            assert(response.test === false, 'should have patched properly')

            return utils.assert.canPatch(service, response.id, { test1: true }, done)
          })
          .catch(done)
      })

      it('properly passes deep check when the user can patch', function (done) {
        const item = this.item
        const service = app.service('patch-service')
        const deepData = {
          turtles: ['all the way down'],
          frequency: {
            nature: '432 Hz',
            love: '528 Hz'
          }
        }

        service.get(item.id)
          .then(response => {
            assert(response, 'should have gotten record')
            return utils.assert.canPatch(service, response.id, { testDeep: deepData }, done)
          })
          .catch(done)
      })

      it('properly passes when the user cannot patch', function (done) {
        const item = this.item
        const service = app.service('patch-service')

        service.patch(item.id, { test: false })
          .then(response => {
            assert(response.test === false, 'should have patched properly')

            return utils.assert.cannotPatch(service, response.id, { noTouchy: true }, 'bad-request', 'you cannot patch noTouchy', done)
          })
          .catch(done)
      })
    })
  })
})
