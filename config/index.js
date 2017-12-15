/**
 * generate configuration according to environment
 */
const url = require('url')
const base = require('./config-base.js')

let devOrProd
if (process.env.NODE_ENV === 'production') {
  devOrProd = require('./config-prod.js')
} else {
  devOrProd = require('./config-dev.js')
}

// the dev or prod will cover base
const config = Object.assign(base, devOrProd)
config.origin = url.format(config)
console.log(config)
module.exports = config
