const APPIUM_VERSION = '1.20'

const PLATFORM = {
  IOS: 'iOS',
  ANDROID: 'Android',
}

const DEVICE = {
  IPHONE_5S: 'iPhone 5s',
  IPHONE_12: 'iPhone 12',
  IPHONE: 'iPhone Simulator',
  ANDROID: 'Android Emulator',
}

const EMPTY_TEMPLATE = {
  browserName: 'string',
  'appium-version': 'version-string',
  platformName: '{PLATFORM}',
  platformVersion: 'version-string',
  automationName: 'string',
  deviceName: '{DEVICE}',
  app: 'path-string',
}

const ios92 = {
  'appium-version': APPIUM_VERSION,
  platformName: PLATFORM.IOS,
  platformVersion: '14.4',
  deviceName: DEVICE.IPHONE_12,
};

const ios81 = {
  'appium-version': APPIUM_VERSION,
  platformName: PLATFORM.IOS,
  platformVersion: '14.4',
  deviceName: DEVICE.IPHONE,
};

const android18 = {
  'appium-version': APPIUM_VERSION,
  platformName: PLATFORM.ANDROID,
  platformVersion: '5.1',
  deviceName: DEVICE.ANDROID,
};

const android19 = {
  'appium-version': APPIUM_VERSION,
  platformName: PLATFORM.ANDROID,
  //platformVersion: '5.1',
  deviceName: DEVICE.ANDROID,
};

const selendroid16 = {
  'appium-version': APPIUM_VERSION,
  platformName: PLATFORM.ANDROID,
  platformVersion: '5.1',
  automationName: 'selendroid',
  deviceName: DEVICE.ANDROID,
};

module.exports = {
  APPIUM_VERSION,
  PLATFORM,
  DEVICE,
  EMPTY_TEMPLATE,
  ios92,
  ios81,
  android18,
  android19,
  selendroid16,
}
