# feathers-mocha-utils

[![Build Status](https://travis-ci.org/feathersjs/feathers-mocha-utils.png?branch=master)](https://travis-ci.org/feathersjs/feathers-mocha-utils)
[![Dependency Status](https://img.shields.io/david/feathersjs/feathers-mocha-utils.svg?style=flat-square)](https://david-dm.org/feathersjs/feathers-mocha-utils)
[![Download Status](https://img.shields.io/npm/dm/feathers-mocha-utils.svg?style=flat-square)](https://www.npmjs.com/package/feathers-mocha-utils)

> Utilities for testing a FeathersJS app with Mocha

## Installation

```
npm install feathers-mocha-utils
```

## Setting Up Your Project for Testing
Before every test, the Feathers server needs to be running.  After all tests are complete, the server should close for the Node process to terminate.  You can create a setup utility in your local project to easily accomplish this with Mocha's `before` and `after` functions:

**setup.js**
```js
const app = require('../../src/app')

let server

before(done => {
  const port = app.get('port')
  server = app.listen(port)
  server.once('listening', () => {
    setTimeout(done, 500)
  })
})

after(done => {
  server.close()
  done()
})
```

Require this file at the top of every test, and it will take care of making sure the server starts and stops when it's time.

## Assertion Utilties
Several assertion utilities are included:
- [`methodNotAllowed`](https://github.com/feathers-plus/feathers-mocha-utils/blob/master/test/index.test.js#L16)
- [`requiresAuth`](https://github.com/feathers-plus/feathers-mocha-utils/blob/master/test/index.test.js#L32)
- [`disableMultiItemChange`](https://github.com/feathers-plus/feathers-mocha-utils/blob/master/test/index.test.js#L48)
- [`notImplemented`](https://github.com/feathers-plus/feathers-mocha-utils/blob/master/test/index.test.js#L65)
- [`forbidden`](https://github.com/feathers-plus/feathers-mocha-utils/blob/master/test/index.test.js#L81)
- [`canPatch`](https://github.com/feathers-plus/feathers-mocha-utils/blob/master/test/index.test.js#L105)
- [`cannotPatch`](https://github.com/feathers-plus/feathers-mocha-utils/blob/master/test/index.test.js#L118)

All of the assertion utilities are in the `assert` attribute of the default export. Here's an example of how to use the `assert.requiresAuth` util.  The example assumes you have a `/todos` service that requires authentication for every method.

```js
require('../setup') // Start the server before tests run and close on finish
const utils = require('feathers-mocha-utils')
const app = require('path/to/app') // path to app.js
const feathersClient = require('path/to/feathers-client') // path to feathers-client.js

const todoServiceOnClient = feathersClient.service('todos')

describe('Todo Service - Unauthenticated Client', function () {
  // These are the methods we want to test
  const methods = ['find', 'get', 'create', 'update', 'patch', 'remove']

  // For each method, run the assertion
  methods.forEach(method => {
    it(`requires auth for ${method}`, function (done) {
      return utils.assert.requiresAuth(todoServiceOnClient, method, done)
    })
  })
})
```

## License

Copyright (c) 2017

Licensed under the [MIT license](LICENSE).
