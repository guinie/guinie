module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [".js", ".jsx", ".ios.js", ".android.js"],
        alias: {
          "^@guinie/react-native$": require.resolve("../../packages/guinie-react-native"),
          "^@guinie/react-native-testid$": require.resolve("../../packages/guinie-react-native-testid"),
        }
      }
    ]
  ]
};
