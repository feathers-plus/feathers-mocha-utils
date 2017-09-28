const assert = require('assert')

module.exports = function assertCanPatch (service, itemId, data, done) {
  const id = typeof itemId === 'number' ? itemId : itemId.toString()
  return service.patch(id, data)
    .then(response => {
      assert.deepEqual(response[attributeToPatch], newValue, `can patch ${attributeToPatch} attribute`)
      done()
    })
    .catch(done)
}
