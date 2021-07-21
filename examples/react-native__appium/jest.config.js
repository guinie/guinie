module.exports = {
  preset: 'react-native',
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native-community|@react-navigation)',
  ],
  moduleNameMapper: {
    '^@guinie/react-native$': '<rootDir>/../../packages/guinie-react-native/src/index.js',
    '^@guinie/react-native-testid$': '<rootDir>/../../packages/guinie-react-native-testid/src/index.js',
    '^react$': '<rootDir>/node_modules/react',
    '^react-native$': '<rootDir>/node_modules/react-native',
  }
};
