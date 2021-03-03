const common = require('@guinie/common')
const appium = require('./appium')
const utils = require('./utils')
const CAPABILITIES = require('./driver/capabilities')
const SERVERS = require('./driver/servers')

module.exports = {
  CAPABILITIES,
  SERVERS,
  utils,
  ...common,
  ...appium,
}
