const assert = require('assert')

module.exports = function assertCannotPatch (service, recordToPatch, attributeToPatch, newValue, errorClassName, errorMessage, done) {
  const { id } = service
  const itemId = typeof recordToPatch[id] === 'number' ? recordToPatch[id] : recordToPatch[id].toString()

  return service.patch(itemId, { [attributeToPatch]: newValue })
    .then(response => {
      done(`should not have been able to patch ${attributeToPatch} attribute`)
    })
    .catch(error => {
      assert.equal(error.className, errorClassName, 'className should match')
      assert(error.message.includes(errorMessage), 'error message should match')
      done()
    })
    .catch(done)
}
