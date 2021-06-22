# @guinie/example_react-native--appium

An example web-app for demonstrating Guinie usage.

## Setup

Install dependencies

```
npm install
```

To install Selenium dependencies, see [https://www.npmjs.com/package/selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver) for instructions.

## Run tests

Start the React app:

```
npm run start
```

Run unit tests:

```
npm run test
```

Run device tests:

```
# Start metro server
react-native start

# Start Appium server
npx appium

# Run device tests
npm run test:gui
```

Test related files:
- App/tests/e2e.test.gui.js
- App/views/Login/Login.test.js
- App/views/Login/Login.test-actions.js
- App/views/TodoMain/TodoMain.test.js
- App/views/TodoMain/TodoMain.test-actions.js

## Maintainer

- [Joel Luukka](https://github.com/jluukka-ge)

## Contributing

For questions, bug reports etc., please open an issue.

Pull requests welcome.

## License

[ISC](LICENSE) 2021
