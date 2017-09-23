# feathers-mocha-utils

[![Build Status](https://travis-ci.org/feathersjs/feathers-mocha-utils.png?branch=master)](https://travis-ci.org/feathersjs/feathers-mocha-utils)
[![Code Climate](https://codeclimate.com/github/feathersjs/feathers-mocha-utils/badges/gpa.svg)](https://codeclimate.com/github/feathersjs/feathers-mocha-utils)
[![Test Coverage](https://codeclimate.com/github/feathersjs/feathers-mocha-utils/badges/coverage.svg)](https://codeclimate.com/github/feathersjs/feathers-mocha-utils/coverage)
[![Dependency Status](https://img.shields.io/david/feathersjs/feathers-mocha-utils.svg?style=flat-square)](https://david-dm.org/feathersjs/feathers-mocha-utils)
[![Download Status](https://img.shields.io/npm/dm/feathers-mocha-utils.svg?style=flat-square)](https://www.npmjs.com/package/feathers-mocha-utils)

> Utilities for testing a FeathersJS app with Mocha

## Installation

```
npm install feathers-mocha-utils --save
```

## Documentation

Please refer to the [feathers-mocha-utils documentation](http://docs.feathersjs.com/) for more details.

## Complete Example

Here's an example of a Feathers server that uses `feathers-mocha-utils`. 

```js
const feathers = require('feathers');
const rest = require('feathers-rest');
const hooks = require('feathers-hooks');
const bodyParser = require('body-parser');
const errorHandler = require('feathers-errors/handler');
const plugin = require('feathers-mocha-utils');

// Initialize the application
const app = feathers()
  .configure(rest())
  .configure(hooks())
  // Needed for parsing bodies (login)
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  // Initialize your feathers plugin
  .use('/plugin', plugin())
  .use(errorHandler());

app.listen(3030);

console.log('Feathers app started on 127.0.0.1:3030');
```

## License

Copyright (c) 2017

Licensed under the [MIT license](LICENSE).
