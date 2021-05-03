# @guinie/selenium-interactions
## Currently in progress – when done, remove "private: true" from package.json

A library of interactions for Selenium based Guinie drivers.

## Table of Contents

- [Install](#Install)
- [Usage](#Usage)
- [API](#API)
- [Maintainer](#Maintainer)
- [Contributing](#Contributing)
- [License](#License)

## Install

```
npm install @guinie/selenium-interactions
```

## Usage

Although not strictly enforced, the functions exposed by this library should try to produce a uniform API for all interactions in order to maintain easy client implementations. Therefore, the functions should have the following shape:

```
(webDriver[, element[, ...params]]) => element

or

(webDriver[, ...params]) => webDriver
```

Following these function shapes, the functions may be used by the client as follows, for example:

```
const scrollableContainer = await driver.findElement(By.id('list-container'))
await seleniumActions.scrollDown(driver, scrollableContainer)
```

## API

### click

```
(webDriver, element) => element
```

Click on the element

### type

```
(webDriver, element, text) => any
```

Type text into the element

### scroll

```
(webDriver, start, end) => any
```

Scroll



### scrollUp
### scrollDown
### scrollLeft
### scrollRight


## Maintainer

- [Joel Luukka](https://github.com/jluukka-ge)

## Contributing

For questions, bug reports etc., please open an issue.

Pull requests welcome.

## License

[ISC](LICENSE) 2021
