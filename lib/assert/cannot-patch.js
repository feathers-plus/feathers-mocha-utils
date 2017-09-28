const assert = require('assert')

module.exports = function assertCannotPatch (service, itemId, data, errorClassName, errorMessage, done) {
  const id = typeof itemId === 'number' ? itemId : itemId.toString()
  return service.patch(id, data)
    .then(response => {
      const attributeToPatch = Object.keys(data)
      done(`should not have been able to patch ${attributeToPatch} attribute`)
    })
    .catch(error => {
      assert.equal(error.className, errorClassName, 'className should match')
      assert(error.message.includes(errorMessage), 'error message should match')
      done()
    })
    .catch(done)
}
