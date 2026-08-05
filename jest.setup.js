jest.mock('@react-native-firebase/app', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => {
  let store = {};
  return {
    __esModule: true,
    default: {
      setItem: jest.fn((key, value) => {
        store[key] = value;
        return Promise.resolve();
      }),
      getItem: jest.fn(key => Promise.resolve(store[key] ?? null)),
      removeItem: jest.fn(key => {
        delete store[key];
        return Promise.resolve();
      }),
      clear: jest.fn(() => {
        store = {};
        return Promise.resolve();
      }),
    },
  };
});

jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    onAuthStateChanged: jest.fn(() => jest.fn()),
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
  })),
  GoogleAuthProvider: { credential: jest.fn() },
}));

jest.mock('@react-native-firebase/messaging', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    requestPermission: jest.fn(() => Promise.resolve()),
    getToken: jest.fn(() => Promise.resolve('mock-token')),
    onMessage: jest.fn(() => jest.fn()),
    onNotificationOpenedApp: jest.fn(() => jest.fn()),
    getInitialNotification: jest.fn(() => Promise.resolve(null)),
    setBackgroundMessageHandler: jest.fn(),
  })),
}));

jest.mock('@notifee/react-native', () => ({
  __esModule: true,
  default: {
    createChannel: jest.fn(() => Promise.resolve('default')),
    displayNotification: jest.fn(() => Promise.resolve()),
    onForegroundEvent: jest.fn(() => jest.fn()),
  },
  EventType: { DISMISSED: 0, PRESS: 1 },
  AndroidImportance: { NONE: 0, MIN: 1, LOW: 2, DEFAULT: 3, HIGH: 4, MAX: 5 },
}));

jest.mock('@react-native-community/slider', () => {
  const { View } = require('react-native');
  const MockSlider = (props: any) => <View {...props} />;
  return { __esModule: true, default: MockSlider };
});

jest.mock('@react-native-google-signin/google-signin', () => ({
  __esModule: true,
  GoogleSignin: {
    configure: jest.fn(),
    signIn: jest.fn(),
    signOut: jest.fn(),
    hasPlayServices: jest.fn(() => Promise.resolve(true)),
  },
}));

jest.mock('react-native-worklets', () => {
  const noop = () => {};
  const identity = (obj) => obj;
  return {
    __esModule: true,
    default: { initialize: noop },
    init: noop,
    callMicrotasks: noop,
    runOnJS: (fn) => fn,
    runOnUI: (fn) => fn,
    runOnUIAsync: (fn) => fn,
    runOnUISync: (fn) => fn,
    createRunOnJS: (fn) => fn,
    createRunOnUI: (fn) => fn,
    makeShareable: identity,
    makeShareableCloneRecursive: identity,
    makeShareableCloneOnUIRecursive: identity,
    isShareableRef: () => false,
    createSerializable: identity,
    isSerializableRef: () => false,
    registerCustomSerializable: noop,
    createShareable: identity,
    createSynchronizable: identity,
    isShareable: () => false,
    isSynchronizable: () => false,
    serializableMappingCache: new Map(),
    shareableMappingCache: new Map(),
    scheduleOnUI: noop,
    scheduleOnRN: noop,
    scheduleOnRuntime: noop,
    scheduleOnRuntimeWithId: noop,
    runOnRuntime: (fn) => fn,
    runOnRuntimeAsync: (fn) => fn,
    runOnRuntimeSync: (fn) => fn,
    runOnRuntimeSyncWithId: (fn) => fn,
    executeOnUIRuntimeSync: (fn) => fn,
    createWorkletRuntime: () => ({}),
    getUIRuntimeHolder: () => ({}),
    getUISchedulerHolder: () => ({}),
    getRuntimeKind: () => 'unknown',
    isRNRuntime: () => false,
    isUIRuntime: () => false,
    isWorkerRuntime: () => false,
    isWorkletRuntime: () => false,
    isWorkletFunction: () => false,
    WorkletsModule: {
      initialize: noop,
      makeShareableClone: identity,
      scheduleOnUI: noop,
      registerWorklet: noop,
      unregisterWorklet: noop,
    },
  };
});

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('react-native-linear-gradient', () => {
  const { View } = require('react-native');
  const MockLinearGradient = (props: any) => <View {...props} />;
  return { __esModule: true, default: MockLinearGradient };
});
