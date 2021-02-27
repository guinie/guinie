const DEFAULT_FIND_OPTIONS = {
  timeout: 10000
}

const findElement = async (driverState, testId, options) => {
  const element = await driverState.driver.findByTestId(testId, {}, Object.assign({}, DEFAULT_FIND_OPTIONS, options))
  return element
}

module.exports = {
  findElement,
}
