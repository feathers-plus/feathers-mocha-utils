const assert = require('assert')

module.exports = function assertCanPatch (service, itemId, data, done) {
  const id = typeof itemId === 'number' ? itemId : itemId.toString()
  return service.patch(id, data)
    .then(response => {
      Object.keys(data).forEach(item => {
        assert.deepEqual(response[item], data[item], `can patch ${item} attribute`)
      })
      done()
    })
    .catch(done)
}
