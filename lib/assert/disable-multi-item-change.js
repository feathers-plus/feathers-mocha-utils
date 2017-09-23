const assert = require('assert')
const args = {
  create: [{ test: true }],
  patch: [null, { test: true }, { query: {} }],
  remove: [null, {}]
}

module.exports = function (service, method, done) {
  assert(typeof service[method] === 'function', `the service has a ${method} method`)

  return service[method](...args[method])
    .then(response => {
      done('should have errored')
    })
    .catch(error => {
      const serviceName = service.path || service.name
      assert(error.className === 'bad-request', 'got correct error message')
      assert(error.message === `Multi-record changes not allowed for ${serviceName} ${method}. (disableMultiItemChange)`, 'the error message should have matched')
      done()
    })
    .catch(done)
}
