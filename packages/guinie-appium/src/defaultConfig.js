const { By, until } = require('selenium-webdriver')

const { PLATFORM } = require('./driver/capabilities')

const DEFAULT_FIND_OPTIONS = {
  timeout: 10000
}

const findElementAndroid = (driverState, testId, options = {}) => {
  const _options = Object.assign({}, DEFAULT_FIND_OPTIONS, options)
  return driverState.driver.wait(until.elementLocated(By.xpath(`//*[@content-desc="${testId}"]`)), _options.timeout)
}

const findElementIOS = (driverState, testId, options = {}) => {
  const _options = Object.assign({}, DEFAULT_FIND_OPTIONS, options)
  return driverState.driver.wait(until.elementLocated(By.xpath(`//*[@testID="${testId}"]`)), _options.timeout)
}

const selectFinder = (() => {
  let platformSpecificFinder
  const _selectFinder = async driverState => {
    if (platformSpecificFinder) {
      return platformSpecificFinder
    }
    const caps = await driverState.driver.getCapabilities()
    platformSpecificFinder = caps.get('platformName') === PLATFORM.ANDROID ? findElementAndroid : findElementIOS
    return platformSpecificFinder
  }
  return _selectFinder
})()

const findElement = async (driverState, testId, options = {}) => {
  const finderFunction = await selectFinder(driverState)
  return finderFunction(driverState, testId, options)
}

module.exports = {
  findElement,
}
