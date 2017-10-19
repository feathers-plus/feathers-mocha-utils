const assert = require('assert')
const path = require('path')
const fs = require('fs')

module.exports = function ({ app, seeder, servicePath }) {
  const serviceJsonPath = `services/${servicePath}/${servicePath}.seed.json`
  const filePath = path.join(app.get('applicationRoot'), serviceJsonPath)

  describe(`${servicePath} Service`, function () {
    describe(`Seeder`, function () {
      before(function () {
        try {
          fs.unlinkSync(filePath)
        } catch (error) {
          console.log(`${filePath} doesn't exist`)
        }
      })

      beforeEach(function () {
        return app.service(servicePath).remove(null, {})
      })

      it('creates a seed file', function (done) {
        seeder.loadFromSeed(app)
          .then(records => {
            assert(fs.existsSync(filePath), 'the seed file was created')
            done()
          })
          .catch(done)
      })
    })
  })
}
