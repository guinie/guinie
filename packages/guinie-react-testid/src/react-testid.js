const React = require('react')

const DEFAULT_TEST_ID_OPTIONS = {
  testIdProps: ['data-testid'],
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

module.exports = {
  makeTestIdProps,
  withTestId,
}
