const { By, until } = require('selenium-webdriver')

const DEFAULT_FIND_OPTIONS = {
  timeout: 10000
}

const byAccessibilityId = id => new By('accessibility id', id)

const findElement = (driverState, testId, options = {}) => {
  const _options = Object.assign({}, DEFAULT_FIND_OPTIONS, options)
  return driverState.driver.wait(until.elementLocated(byAccessibilityId(testId)), _options.timeout)
}

module.exports = {
  findElement,
}
