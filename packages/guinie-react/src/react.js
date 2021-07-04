const { render } = require('@testing-library/react')
const { default: userEvent } = require('@testing-library/user-event')
const defaultConfig = require('./defaultConfig')

const wrapDriver = component => {
  const renderedComponent = render(component)
  return { driver: renderedComponent }
}

const _findElement = async (config, driverState, testId, options) => {
  const element = await config.findElement(driverState, testId, options)
  return element
}

const findElement = config => (testId, options) => async driverState => {
  return _findElement(config, driverState, testId, options)
}

const type = config => (testId, text, options) => async driverState => {
  const element = await _findElement(config, driverState, testId, options)
  userEvent.type(
    element,
    text,
  )
  return driverState
}

const click = config => (testId, options) => async driverState => {
  const element = await _findElement(config, driverState, testId, options)
  userEvent.click(element)
  return driverState
}

const scroll = config => params => async driverState => driverState
const scrollUp = config => params => async driverState => driverState
const scrollDown = config => params => async driverState => driverState
const scrollLeft = config => params => async driverState => driverState
const scrollRight = config => params => async driverState => driverState

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
  }
}

module.exports = {
  configure,
}
