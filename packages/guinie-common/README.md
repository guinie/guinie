# @guinie/common

<blockquote>
  <p>
    The Journeyman recalled two words drawn by Guinie – "sequence", "compose". Those words were not magical, but they felt like it. They were significant words.
  </p>
  <p>
    But the more the Journeyman thought about the words and the more she tried to learn their meaning, the more distant and vague the words became. They were incomplete – only part of Guinie's wisdom.
  </p>
</blockquote>

A library of common higher-order functions for defining sequences of UI interactions and composing sequences into more complex behavior.

## Table of Contents

- [Install](#Install)
- [Usage](#Usage)
- [API](#API)
  - [sequence](#sequence)
  - [applyContext](#applyContext)
  - [compose](#compose)
- [Maintainer](#Maintainer)
- [Contributing](#Contributing)
- [License](#License)

## Install

```
npm install -D @guinie/common
```

## Usage

Definitions of UI interaction are defined with 3-tier higher-order functions. First, a driver context is passed in, which includes concrete methods for interacting with the UI. Second, parameters defining the values entered to the UI components is passed in. The result is a function, which accepts a driver state object which is used to manipulate the UI.

UI interaction sequences are defined separately from the drivers and contexts which are passed to the interaction sequences later in the test files. This allows the interaction sequences to remain context-agnostic and thus reusable in many GUI testing contexts.

To define simple sequences, use the `sequence` function:

```
// front-page.guinie.actions.js
const { sequence } = require('@guinie/common')

const login = context => params => {
  const { type, click } = context
  const { username, password } = params
  return sequence(
    type('login--username', username),
    type('login--password', password),
    click('login--submit')
  )
}

const createTodo = context => params => {
  const { type, click } = context
  const { title } = params
  return sequence(
    click('frontpage--create-todo'),
    type('create-todo-modal--title-input', title),
    click('create-todo-modal--submit')
  )
}

module.exports = {
  login,
  createTodo
}
```

More complex behavior can be composed from sequences or composed sequences:

```
// front-page.guinie.actions.js
const { sequence, compose } = require('@guinie/common')

const login = context => params => {
  ...
}

const createTodo = context => params => {
  ...
}

const loginAndCreateTodo = compose(
  login,
  createTodo
)

module.exports = {
  login,
  createTodo,
  loginAndCreateTodo
}
```

A helper function is exported to help apply driver contexts to a number of sequences at once in test files:

```
const { applyContext } = require('@guinie/common')
const frontpageActions = require('./front-page.unit.test.js')

const [
  login,
  createTodo,
  loginAndCreateTodo
] = applyContext(
  frontpageActions.login,
  frontpageActions.createTodo,
  frontpageActions.loginAndCreateTodo
)(context)

// Actions are parameterized with a context, ready to take in parameters
const loginAsCarlAndCreateShoppingTodo = loginAndCreateTodo({
  username: 'Carl',
  password: 'secret',
  title: 'Do shopping'
})

```

## API

### sequence

`(action1, ..., actionN) => driverState => driverState'`

Chains UI actions into a sequence, which can be executed later by passing in a driverState object.

### applyContext

`(sequence1, ..., sequenceN) => context => [boundAction1, ..., boundActionN]`

Binds all given sequences with a given context, resulting in an array of bound actions.

### compose

`(sequences1, ..., sequenceN) => aggregateSequence`

Combines all given sequences into a new sequence which executes all input sequences in order.

## Maintainer

- [Joel Luukka](https://github.com/jluukka-ge)

## Contributing

For questions, bug reports etc., please open an issue.

Pull requests welcome.

## License

[ISC](LICENSE) 2021
