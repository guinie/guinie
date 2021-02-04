const chrome = require('selenium-webdriver/chrome')
const { Builder, By, until } = require('selenium-webdriver')

const DEFAULT_ALIAS = '__current'
const DEFAULT_FIND_OPTIONS = {
  timeout: 10000
}
const DEFAULT_CHROME_DRIVER_OPTIONS = {
  headless: true,
}

const wrapDriver = driver => ({ driver })

const _getElement = (driverState, testId, options = {}) => {
  const _options = Object.assign({}, DEFAULT_FIND_OPTIONS, options)
  return driverState.driver.findElement(By.xpath(`//*[@data-testid="${testId}"]`))
}

const getElement = (testId, options) => driverState => {
  return _getElement(driverState, testId, options)
}

const _findElement = (driverState, testId, options = {}) => {
  const _options = Object.assign({}, DEFAULT_FIND_OPTIONS, options)
  return driverState.driver.wait(until.elementLocated(By.xpath(`//*[@data-testid="${testId}"]`)), _options.timeout)
}

const findElement = (testId, options) => driverState => {
  return _findElement(driverState, testId, options)
}

const type = (testId, text, options) => async driverState => {
  const element = _findElement(driverState, testId, options)
  await element.sendKeys(text)
  return driverState
}

const click = (testId, options) => async driverState => {
  const element = _findElement(driverState, testId, options)
  await element.click()
  return driverState
}

const getChromeDriver = params => {
  const _params = Object.assign({}, DEFAULT_CHROME_DRIVER_OPTIONS, params)
  const headless = !!_params.headless

  const options = new chrome.Options()
  options.addArguments('--disable-dev-shm-usage')
  options.addArguments('--no-sandbox')

  if (headless === true) {
    options.addArguments('--headless')
  }

  const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build()

  return driver
}

const closeDriver = driver => driver.quit()

module.exports = {
  wrapDriver,
  _getElement,
  getElement,
  _findElement,
  findElement,
  type,
  click,
  getChromeDriver,
  closeDriver,
}
