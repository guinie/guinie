const { describe, expect, it } = require('@jest/globals')
const { test: compositionLibraryTest } = require('./interface__composition-libs')
const { test: testidLibraryTest } = require('./interface__testid-libs')

const appiumLibrary = require('../packages/guinie-appium')
const seleniumLibrary = require('../packages/guinie-selenium')
const reactLibrary = require('../packages/guinie-react')
const reactNativeLibrary = require('../packages/guinie-react-native')

const reactTestidLibrary = require('../packages/guinie-react-testid')
const reactNativeTestidLibrary = require('../packages/guinie-react-native-testid')


const compositionLibraries = [
  ['@guinie/appium', appiumLibrary],
  ['@guinie/selenium', seleniumLibrary],
  ['@guinie/react', reactLibrary],
  ['@guinie/react-native', reactNativeLibrary],
]

const testidLibraries = [
  ['@guinie/react-testid', reactTestidLibrary],
  ['@guinie/react-native-testid', reactNativeTestidLibrary]
]

describe(`Common composition library interface`, () => {
  compositionLibraries.forEach(library => {
    compositionLibraryTest({ describe, expect, it })(...library)
  })
})

describe(`Common test ID library interface`, () => {
  testidLibraries.forEach(library => {
    testidLibraryTest({ describe, expect, it })(...library)
  })
})
