# @guinie/react-testid

<blockquote>
  <p>

  </p>
</blockquote>

A library of utilities for producing test IDs for React components.

## Table of Contents

- [Install](#Install)
- [API](#API)
  - [makeTestIdProps](#makeTestIdProps)
  - [withTestId](#withTestId)
- [Maintainer](#Maintainer)
- [Contributing](#Contributing)
- [License](#License)

## Install

```
npm install @guinie/react-testid
```

## API

### makeTestIdProps

`testId => Object`

A utility function for producing test ID props.

Example:

```
const { makeTestIdProps } = require('@guinie/react')

const MyButton = props => { ... }

const MyParentComponent = props => {
  return (
    <div>
      <MyButton {...makeTestIdProps('my-submit-button')} />
    </div>
  )
}
```

### withTestId

`testId => ReactComponentInstance => ReactComponentInstance`

A utility function for applying test IDs to React component instances.

Example:

```
const { withTestId } = require('@guinie/react-testid')

const MyButton = props => { ... }
const MySubmitButton = withTestId('my--submit-button')(<MyButton />)

const MyParentComponent = props => {
  return (
    <div>
      <MySubmitButton />
    </div>
  )
}
```

## Maintainer

- [Joel Luukka](https://github.com/jluukka-ge)

## Contributing

For questions, bug reports etc., please open an issue.

Pull requests welcome.

## License

[ISC](LICENSE) 2021
