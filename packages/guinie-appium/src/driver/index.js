const wd = require('selenium-webdriver')
const { local } = require('./servers')
const { extend } = require('./utils/extendDriver')

const getDriver = async ({
  device,
  app,
  server = local,
}) => {
  const desired = {
    ...device,
    app: app || device.app,
    browserName: '',
  }

  const driver = await new wd.Builder()
    .usingServer(`${server.host}:${server.port}/wd/hub`)
    .withCapabilities(desired)
    .build()

  return extend(driver)
};

module.exports = { getDriver }
