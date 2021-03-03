const { getDriver } = require('./driver')
const defaultConfig = require('./defaultConfig')

const wrapDriver = driver => ({ driver })

const _findElement = (config, driverState, testId, options) => {
  const element = config.findElement(driverState, testId, options)
  return element
}

const findElement = config => (testId, options) => driverState => {
  return _findElement(config, driverState, testId, options)
}

const type = config => (testId, text, options) => async driverState => {
  const element = await _findElement(config, driverState, testId, options)
  await element.sendKeys(text)
  return driverState
}

const click = config => (testId, options) => async driverState => {
  const element = await _findElement(config, driverState, testId, options)
  await element.click()
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
    },
    wrapDriver,
    _findElement,
    getDriver,
    closeDriver,
  }
}

module.exports = {
  configure,
}
