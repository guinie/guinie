const chrome = require('selenium-webdriver/chrome')
const { Builder } = require('selenium-webdriver')
const defaultConfig = require('./defaultConfig')

const {
  scrollUp: _scrollUp,
  scrollDown: _scrollDown,
  scrollLeft: _scrollLeft,
  scrollRight: _scrollRight,
} = require('./interactions')

const DEFAULT_CHROME_DRIVER_OPTIONS = {
  headless: true,
}

const wrapDriver = driver => ({ driver })

const _findElement = (config, driverState, testId, options) => {
  const element = config.findElement(driverState, testId, options)
  return element
}

const findElement = config => (testId, options) => driverState => {
  return _findElement(config, driverState, testId, options)
}

const type = config => (testId, text, options) => async driverState => {
  const element = _findElement(config, driverState, testId, options)
  await element.sendKeys(text)
  return driverState
}

const click = config => (testId, options) => async driverState => {
  const element = _findElement(config, driverState, testId, options)
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

const scrollUp = config => (testId, options) => async driverState => {
  const element = await _findElement(config, driverState, testId, options)
  await _scrollUp(driverState.driver, element)
  return driverState
}

const scrollDown = config => (testId, options) => async driverState => {
  const element = await _findElement(config, driverState, testId, options)
  await _scrollDown(driverState.driver, element)
  return driverState
}

const scrollLeft = config => (testId, options) => async driverState => {
  const element = await _findElement(config, driverState, testId, options)
  await _scrollLeft(driverState.driver, element)
  return driverState
}

const scrollRight = config => (testId, options) => async driverState => {
  const element = await _findElement(config, driverState, testId, options)
  await _scrollRight(driverState.driver, element)
  return driverState
}

const closeDriver = driver => driver.quit()

const configure = config => {
  const _config = Object.assign({}, defaultConfig, config)
  return {
    context: {
      findElement: findElement(_config),
      type: type(_config),
      click: click(_config),
      scrollUp: scrollUp(_config),
      scrollDown: scrollDown(_config),
      scrollLeft: scrollLeft(_config),
      scrollRight: scrollRight(_config),
    },
    wrapDriver,
    _findElement,
    getChromeDriver,
    closeDriver,
  }
}

module.exports = {
  configure,
}
