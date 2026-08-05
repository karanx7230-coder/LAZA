module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: [
    './jest.setup.js',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-native-firebase|@react-navigation|react-native-drawer-layout|react-native-reanimated|react-native-worklets|react-redux|redux|redux-persist|@reduxjs/toolkit|immer)/)',
  ],
};
