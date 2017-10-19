const makeAssertion = require('./base')
const disableMultiItemChange = require('./disable-multi-item-change')
const canPatch = require('./can-patch')
const cannotPatch = require('./cannot-patch')
const delay = require('./delay')

module.exports = {
  methodNotAllowed: makeAssertion('method-not-allowed'),
  requiresAuth: makeAssertion('not-authenticated'),
  disableMultiItemChange,
  notImplemented: makeAssertion('not-implemented'),
  forbidden: makeAssertion('forbidden'),
  notFound: makeAssertion('not-found'),
  canPatch,
  cannotPatch,
  delay
}
