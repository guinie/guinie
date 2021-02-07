# @guinie/selenium

A library of utilities for running defined sequences of interaction on a live web page using Selenium.

## Table of Contents

- [Install](#Install)
- [Usage](#Usage)
- [API](#API)
  - [configure](#configure)
    - [getChromeDriver](#getChromeDriver)
    - [closeDriver](#closeDriver)
    - [wrapDriver](#wrapDriver)
    - [context](#context)
- [Maintainer](#Maintainer)
- [Contributing](#Contributing)
- [License](#License)

## Install

```
npm install -D @guinie/selenium
```

`@guinie/selenium` is depends on `selenium-webdriver`, which requires additional executables to be available. See [https://www.npmjs.com/package/selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver) for instructions.

## Usage

To run sequences in Selenium context, a browserDriver is required. A Chrome browserDriver can be created using `getChromeDriver`. This driver can be used for basic setup of the tests:

```
const { configure } = require('@guinie/selenium')
const { context, getChromeDriver } = configure()

const chromeDriver = getChromeDriver()
await chromeDriver.get('http://localhost:3000')
```

Be sure to close the browser driver session when the tests are done using `closeDriver`:

```
const { configure } = require('@guinie/selenium')
const { closeDriver } = configure()

await closeDriver(chromeDriver)
```

---

A browser driver can be wrapped into a driverState, which is needed for guinie sequences:

```
const { configure } = require('@guinie/selenium')
const { wrapDriver } = configure()

const seleniumDriverState = wrapDriver(chromeDriver)
```

---

Selenium context is passed to raw sequences:

```
const { applyContext } = require('@guinie/common')
const { configure } = require('@guinie/selenium')
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

Finally, execute the sequence by passing in the seleniumDriverState:

```
// Execute sequence
const finalDriverState = await loginAsCarlAndCreateShoppingTodo(seleniumDriverState)
```

## API

### configure

`config => ({ wrapDriver, context, getChromeDriver, closeDriver })`

Returns an object containing a Selenium context and other utility functions.

#### getChromeDriver

`() => chromeBrowserDriver`

Returns a browserDriver for chrome browser.

#### closeDriver

`browserDriver => browserDriver`

Closes the session for the given browserDriver.

#### wrapDriver

`browserDriver => seleniumDriverState`

Returns a driverState for the specified browser test driver.

#### context

`Object` - the entire module exported by `@guinie/selenium`

Contains necessary functions to run guinie sequences in selenium testing context.

## Maintainer

- [Joel Luukka](https://github.com/jluukka-ge)

## Contributing

For questions, bug reports etc., please open an issue.

Pull requests welcome.

## License

[ISC](LICENSE) 2021
