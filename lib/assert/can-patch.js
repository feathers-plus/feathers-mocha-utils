const assert = require('assert')

module.exports = function assertCanPatch (service, recordToPatch, attributeToPatch, newValue, done) {
  const { id } = service
  const itemId = typeof recordToPatch[id] === 'number' ? recordToPatch[id] : recordToPatch[id].toString()

  return service.patch(itemId, { [attributeToPatch]: newValue })
    .then(response => {
      assert(response[attributeToPatch] === newValue, `can patch ${attributeToPatch} attribute`)
      done()
    })
    .catch(done)
}
