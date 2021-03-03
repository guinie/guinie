const { Command } = require('selenium-webdriver/lib/command')

const defineCommand = ({
  driver,
  name,
  method,
  path,
}) => {
  const executor = driver.getExecutor()
  executor.defineCommand(name, method, `/session/:session/${path}`)
  driver[name] = async params => {
    const command = new Command('resetApp')

    const session = await driver.getSession()
    command.setParameter('session', session.getId())

    Object.entries((key, value) => {
      command.setParameter(key, value)
    })

    return driver.execute(command)
  }
  return driver
}

module.exports = {
  defineCommand,
}
