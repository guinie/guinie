# @guinie/react

<blockquote>
  <p>
    Everything Guinie inscribed in the aether revolved around the base of a testing pyramid. The base was vast, but made up of simple building blocks.
  </p>
  <p>
    The Journeyman understood the base was what made Guinie's wisdom possible and concrete. Without it, everything would be nothing more than a dream.
  </p>
</blockquote>

A library of utilities for running defined sequences of interaction on React components in a unit testing context.

## Table of Contents

- [Install](#Install)
- [Usage](#Usage)
- [API](#API)
  - [makeTestIdProps](#makeTestIdProps)
  - [withTestId](#withTestId)
  - [configure](#configure)
    - [wrapDriver](#wrapDriver)
    - [context](#context)
- [Maintainer](#Maintainer)
- [Contributing](#Contributing)
- [License](#License)

## Install

```
npm install @guinie/react
```

## Usage

`@guinie/react` fulfills three tasks:
1. It provides a method for applying test identifiers to React components
1. It provides a unit testing context for React components
1. It provides a function for producing a driver state for React unit testing context

In order for guinie test runners to operate on UI components, the components must be marked with test IDs. These IDs are necessary for any components that are read or interacted with in the by a guinie driver. To apply test IDs, the `withTestId` helper function can be used to wrap the components:

```
const { withTestId } = require('@guinie/react')

const MyButton = props => { ... }

const MyParentComponent = props => {
  return (
    <div>
      {
        withTestId('my-button--1')(<MyButton />)
      }
    </div>
  )
}
```

Alternatively, test ID props can be created with the `makeTestIdProps` function and then spread to a component instance:

```
const { makeTestIdProps } = require('@guinie/react')

const MyButton = props => { ... }

const MyParentComponent = props => {
  return (
    <div>
      <MyButton {...makeTestIdProps('my-button--1')} />
    </div>
  )
}
```

---

The object exported by the module is in itself the unit testing context for React unit tests. This context should be passed in to interaction sequences first in test files. This can be done as a simple function call or by using the `applyContext` helper function:

```
const { applyContext } = require('@guinie/common')
const { configure } = require('@guinie/react')
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

The functions in `reactContext` can be used to find elements or manipulate the driver state further. You can also get the object returned by `@testing-library/react` `render` function from the driver state:

```
const {
  findElement,
  click,
} = reactContext

// Find elements
const element = findElement('my-component--2')(finalDriverState)

// Run interactions
const click('my-button--1')(finalDriverState)

// Get the object returned by `@testing-library/react` `render` -function
const rendered = finalDriverState.driver

```

## API

### makeTestIdProps

`testId => Object`

A utility function for producing test ID props.

### withTestId

`testId => ReactComponentInstance => ReactComponentInstance`

A utility function for applying test IDs to React component instances.

### configure

`config => ({ wrapDriver, context })`

Returns an object containing a React unit testing context and other utility functions.

#### wrapDriver

`ReactComponentInstance => ReactDriverState`

Returns a driverState for React unit test context.

#### context

`Object` - the entire module exported by `@guinie/react`

Contains necessary functions to run guinie sequences in React unit testing context.

## Maintainer

- [Joel Luukka](https://github.com/jluukka-ge)

## Contributing

For questions, bug reports etc., please open an issue.

Pull requests welcome.

## License

[ISC](LICENSE) 2021
