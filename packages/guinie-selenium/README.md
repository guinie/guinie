# @guinie/selenium

<blockquote>
  <p>
    Guinie's pyramid turned more sophisticated toward the top. The vast base formed a level ground onto which the blocks were arranged in more elaborate patterns.
  </p>
  <p>
    The bigger the base grew, the more pointed the pyramid became. Eventually, the patterns formed what looked more of an obelisk than a pyramid.
  </p>
</blockquote>

A library of utilities for running defined sequences of interaction on a live web page using Selenium.

## Table of Contents

- [Install](#Install)
- [Usage](#Usage)
- [API](#API)
  - [seleniumContext](#seleniumContext)
  - [wrapDriver](#wrapDriver)
  - [getChromeDriver](#getChromeDriver)
  - [closeDriver](#closeDriver)
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
const seleniumContext = require('@guinie/selenium')
const { getChromeDriver } = seleniumContext

const chromeDriver = getChromeDriver()
await chromeDriver.get('http://localhost:3000')
```

Be sure to close the browser driver session when the tests are done using `closeDriver`:

```
const seleniumContext = require('@guinie/selenium')
const { closeDriver } = seleniumContext

await closeDriver(chromeDriver)
```

---

A browser driver can be wrapped into a driverState, which is needed for guinie sequences:

```
const seleniumContext = require('@guinie/selenium')
const { wrapDriver } = seleniumContext

const seleniumDriverState = wrapDriver(chromeDriver)
```

---

Selenium context is passed to raw sequences:

```
const { applyContext } = require('@guinie/common')
const seleniumContext = require('@guinie/selenium')
const frontpageActions = require('./front-page.unit.test.js')

// This...
const login = frontpageActions.login(seleniumContext)
const createTodo = frontpageActions.createTodo(seleniumContext)
const loginAndCreateTodo = frontpageActions.loginAndCreateTodo(seleniumContext)

// ...is equivalent to this
const [
  login2,
  createTodo2,
  loginAndCreateTodo2
] = applyContext(
  frontpageActions.login,
  frontpageActions.createTodo,
  frontpageActions.loginAndCreateTodo
)(seleniumContext)
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

### seleniumContext

`Object` - the entire module exported by `@guinie/selenium`

Contains necessary functions to run guinie sequences in selenium testing context.

### wrapDriver

`browserDriver => seleniumDriverState`

Returns a driverState for the specified browser test driver.

### getChromeDriver

`() => chromeBrowserDriver`

Returns a browserDriver for chrome browser.

### closeDriver

`browserDriver => browserDriver`

Closes the session for the given browserDriver.

## Maintainer

- [Joel Luukka](https://github.com/jluukka-ge)

## Contributing

For questions, bug reports etc., please open an issue.

Pull requests welcome.

## License

[ISC](LICENSE) 2021
