# @guinie/react-native

A library of utilities for running defined sequences of interaction on React Native components in a unit testing context.

## Table of Contents

- [Install](#Install)
- [Usage](#Usage)
- [API](#API)
  - [configure](#configure)
    - [wrapDriver](#wrapDriver)
    - [context](#context)
- [Maintainer](#Maintainer)
- [Contributing](#Contributing)
- [License](#License)

## Install

```
npm install -D @guinie/react-native
```

## Usage

`@guinie/react-native` provides:
1. A unit testing context for React Native components
1. A function for producing a driver state for React Native unit testing context

The context for React Native unit tests is created using the `configure` function exported by the module. This context should be passed in to interaction sequences first in test files. This can be done as a simple function call or by using the `applyContext` helper function:

```
const { applyContext } = require('@guinie/common')
const { configure } = require('@guinie/react-native')
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

Finally, produce a driver state with the `wrapDriver` -function and pass the driver state in to the parameterized test to execute the sequence:

```
const { wrapDriver } = reactContext

// Create a new driver state for `AppWithFakeApi` component
const driverState = wrapDriver(<AppWithFakeApi />)

// Execute sequence
const finalDriverState = await loginAsCarlAndCreateShoppingTodo(driverState)
```

---

The functions in `reactContext` can be used to find elements or manipulate the driver state further. You can also get the object returned by `@testing-library/react-native` `render` function from the driver state:

```
const {
  findElement,
  click,
} = reactContext

// Find elements
const element = findElement('my-component--2')(finalDriverState)

// Run interactions
const click('my-button--1')(finalDriverState)

// Get the object returned by `@testing-library/react-native` `render` -function
const rendered = finalDriverState.driver

```

## API

### configure

`config => ({ wrapDriver, context })`

Returns an object containing a React Native unit testing context and other utility functions.

#### wrapDriver

`ReactComponentInstance => ReactDriverState`

Returns a driverState for React Native unit test context.

#### context

`Object` - the entire module exported by `@guinie/react-native`

Contains necessary functions to run guinie sequences in React Native unit testing context.

## Maintainer

- [Joel Luukka](https://github.com/jluukka-ge)

## Contributing

For questions, bug reports etc., please open an issue.

Pull requests welcome.

## License

[ISC](LICENSE) 2021
