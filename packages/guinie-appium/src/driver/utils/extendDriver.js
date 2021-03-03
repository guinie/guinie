import { defineCommand } from './defineCommand'

const CUSTOM_COMMANDS = [
  { name: 'resetApp', method: 'POST', path: 'appium/app/reset' },
]

const extend = driver => {
  return CUSTOM_COMMANDS.reduce(
    (d, params) => defineCommand({ driver: d, ...params }),
    driver
  )
}

module.exports = {
  extend,
}
