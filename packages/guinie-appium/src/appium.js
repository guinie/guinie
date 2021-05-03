const { getDriver } = require('./driver')
const defaultConfig = require('./defaultConfig')

const {
  scroll: _scroll,
  scrollUp: _scrollUp,
  scrollDown: _scrollDown,
  scrollLeft: _scrollLeft,
  scrollRight: _scrollRight,
} = require('./interactions')

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

const scroll = config => (start, end, options) => async driverState => {
  await _scroll(driverState.driver, start, end)
  return driverState
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
      scroll: scroll(_config),
      scrollUp: scrollUp(_config),
      scrollDown: scrollDown(_config),
      scrollLeft: scrollLeft(_config),
      scrollRight: scrollRight(_config),
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
