const React = require('react')
const { render } = require('@testing-library/react')
const { default: userEvent } = require('@testing-library/user-event')

const DEFAULT_FIND_OPTIONS = {
  timeout: 10000
}

const DEFAULT_TEST_ID_OPTIONS = {
  // React & browser , Android , Android , iOS
  testIdProps: ['data-testid', 'accessibilityLabel', 'content-desc', 'testID'],
}

const makeTestIdProps = (testId, options) => {
  const _options = Object.assign({}, DEFAULT_TEST_ID_OPTIONS, options)
  const testIdProps = _options.testIdProps.reduce((acc, prop) => ({ ...acc, [prop]: testId }), {})
  return testIdProps
}

const withTestId = (testId, options) => WrappedComponent => {
  const testIdProps = makeTestIdProps(testId, options)
  return React.cloneElement(WrappedComponent, testIdProps)
}

const wrapDriver = component => {
  const renderedComponent = render(component)
  return { driver: renderedComponent }
}

const _getElement = async (driverState, testId, options) => {
  const element = await driverState.driver.getByTestId(testId, {}, Object.assign({}, DEFAULT_FIND_OPTIONS, options))
  return element
}

const getElement = (testId, options) => async driverState => {
  return _getElement(driverState, testId, options)
}

const _findElement = async (driverState, testId, options) => {
  const element = await driverState.driver.findByTestId(testId, {}, Object.assign({}, DEFAULT_FIND_OPTIONS, options))
  return element
}

const findElement = (testId, options) => async driverState => {
  return _findElement(driverState, testId, options)
}

const type = (testId, text, options) => async driverState => {
  const element = await _findElement(driverState, testId, options)
  userEvent.type(
    element,
    text,
  )
  return driverState
}

const click = (testId, options) => async driverState => {
  const element = await _findElement(driverState, testId, options)
  userEvent.click(element)
  return driverState
}

module.exports = {
  makeTestIdProps,
  withTestId,
  wrapDriver,
  _getElement,
  getElement,
  _findElement,
  findElement,
  type,
  click,
}
