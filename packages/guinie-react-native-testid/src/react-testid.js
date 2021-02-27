const React = require('react')
const { Platform } = require('react-native')

const DEFAULT_TEST_ID_OPTIONS__ANDROID = {
  testIdProps: ['accessibilityLabel', 'content-desc'],
}

const DEFAULT_TEST_ID_OPTIONS__IOS = {
  testIdProps: ['testID'],
}

const makeTestIdProps = (testId, options) => {
  const defaultOptions = Platform.OS === 'android' ? DEFAULT_TEST_ID_OPTIONS__ANDROID : DEFAULT_TEST_ID_OPTIONS__IOS
  const _options = Object.assign({}, defaultOptions, options)
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
