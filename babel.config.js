module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
  env: {
    production: {
      plugins: ['transform-remove-console', 'ignite-ignore-reactotron'], //removing consoles.log from app during release (production) versions
    },
  },
};
