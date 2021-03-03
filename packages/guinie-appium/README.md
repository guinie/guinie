# @guinie/selenium

A library of utilities for running defined sequences of interaction on mobile devices using Appium.

## Table of Contents

- [Install](#Install)
- [Usage](#Usage)
- [API](#API)
  - [CAPABILITIES](#CAPABILITIES)
  - [SERVERS](#SERVERS)
  - [utils](#utils)
  - [utils.getAndroidApkPath](#utils.getAndroidApkPath)
  - [configure](#configure)
    - [getDriver](#getDriver)
    - [closeDriver](#closeDriver)
    - [wrapDriver](#wrapDriver)
    - [context](#context)
- [Maintainer](#Maintainer)
- [Contributing](#Contributing)
- [License](#License)

## Install

```
npm install -D @guinie/appium
```

## Usage

To run sequences in Appium context, a deviceDriver is required. A deviceDriver can be created using `getDriver`. This driver can be used for basic setup of the tests.

Some helpers and presets are exposed by `@guinie/appium` to help set up the driver:

```
const { configure, utils, CAPABILITIES } = require('@guinie/appium')
const { context, getDriver } = configure()

const appPath = utils.getAndroidApkPath()
const { android19 } = CAPABILITIES

const deviceDriver = await getDriver({
  device: android19,
  app: appPath,
})
```

Be sure to close the device driver session when the tests are done using `closeDriver`:

```
const { configure } = require('@guinie/appium')
const { closeDriver } = configure()

await closeDriver(deviceDriver)
```

---

A device driver can be wrapped into a driverState, which is needed for guinie sequences:

```
const { configure } = require('@guinie/appium')
const { wrapDriver } = configure()

const deviceDriverState = wrapDriver(deviceDriver)
```

---

Appium context is passed to raw sequences:

```
const { applyContext } = require('@guinie/common')
const { configure } = require('@guinie/appium')
const frontpageActions = require('./front-page.unit.test.js')

const { context } = configure()

// This...
const login = frontpageActions.login(context)
const createTodo = frontpageActions.createTodo(context)
const loginAndCreateTodo = frontpageActions.loginAndCreateTodo(context)

// ...is equivalent to this
const [
  login2,
  createTodo2,
  loginAndCreateTodo2
] = applyContext(
  frontpageActions.login,
  frontpageActions.createTodo,
  frontpageActions.loginAndCreateTodo
)(context)
```

---

Now that we have sequences with driver context applied, we can pass in parameters for the test:

```
// Pass final details in for the test function
const loginAsCarlAndCreateShoppingTodo = loginAndCreateTodo({
  username: 'Carl',
  password: 'secret',
  title: 'Do shopping'
})
```

---

Finally, execute the sequence by passing in the deviceDriverState:

```
// Execute sequence
const finalDriverState = await loginAsCarlAndCreateShoppingTodo(deviceDriverState)
```

---

The driver can start from a fresh app session via it's `resetApp` -funciton. It is a good idea to call this between each test case:

beforeEach(async function() {
  return driver.resetApp()
});


## API

### CAPABILITIES

An Object containing presets for different devices.

### SERVERS

An object containing a preset for running tests locally

### utils

Contain helpers for setting up the driver.

#### utils.getAndroidApkPath

Returns a relative path to debug APK created by ReactNative. Pass `release` as a parameter to get a path for the release APK.

### configure

`config => ({ wrapDriver, context, getDriver, closeDriver })`

Returns an object containing a Appium context and other utility functions.

#### getDriver

`({ device, app, server }) => deviceDriver`

Returns a deviceDriver for the defined device.

device: an object defining the capabilities of the desired device
app: string representing the path to the application
server: and object defining the `host` and `port` of the appium server

#### closeDriver

`deviceDriver => deviceDriver`

Closes the session for the given deviceDriver.

#### wrapDriver

`deviceDriver => deviceDriverState`

Returns a driverState for the specified device test driver.

#### context

`Object` - the entire module exported by `@guinie/appium`

Contains necessary functions to run guinie sequences in appium testing context.

## Maintainer

- [Joel Luukka](https://github.com/jluukka-ge)

## Contributing

For questions, bug reports etc., please open an issue.

Pull requests welcome.

## License

[ISC](LICENSE) 2021
