# @guinie/example

<blockquote>
  <p>
    The Journeyman stumbled upon a simple, even trivial App. It's functions were clear, but it's immaturity evident as it was untested.
  </p>
  <p>
    Drawing from what he had learned from Guinie, the Journeyman wrote down the App's functions as sequences and watched as drivers exercised the App through and through in different contexts.
  </p>
  <p>
    The App was happy as it had a well established ground for growth. The Journeyman was delighted by his new abilities.
  </p>
</blockquote>

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
npm run start &
```

Run unit tests:

```
npm run test
```

Run browser tests:

```
npm run test:gui
```

Test related files:
- src/tests/e2e.test.gui.js
- src/views/Login/Login.test.js
- src/views/Login/Login.test-actions.js
- src/views/TodoMain/TodoMain.test.js
- src/views/TodoMain/TodoMain.test-actions.js

## Maintainer

- [Joel Luukka](https://github.com/jluukka-ge)

## Contributing

For questions, bug reports etc., please open an issue.

Pull requests welcome.

## License

[ISC](LICENSE) 2021
