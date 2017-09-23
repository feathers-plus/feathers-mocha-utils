const assert = require('assert')

module.exports = function (className) {
  return function (service, method, done) {
    const args = {
      find: [{}],
      get: [1],
      create: [{ test: true }],
      update: [1, { test: true }],
      patch: [1, { test: true }],
      remove: [1]
    }

    assert(typeof service[method] === 'function', `the service should have a ${method} method`)

    return service[method](...args[method])
      .then(res => {
        done(`method should have returned an error with className of ${className}`)
      })
      .catch(error => {
        assert(error.className === className, `expected error class was ${className}, but actual was ${error.className}`)
        done()
      })
      .catch(done)
  }
}
