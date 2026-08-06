export const Routes = {
  MAIN_TABS: 'MainTabs',
  HOME_DRAWER: 'HomeDrawer',
  // HOME_TAB: 'HomeTab',
  // CART_TAB: 'CartTab',

  HOME: 'home',
  CART: 'cart',
  WISHLIST: 'wishlist',
  PAYMENT: 'payment',
  PROFILE: 'profile',

  PRODUCT: 'product',
  PRODUCT_STACK: 'productstack',
  REVIEWS: 'reviews',
  ADD_REVIEW: 'addreview',
  ADDRESS: 'address',
  ADD_CARD: 'addcard',
  Track: 'tracklist',

  ORDER_DONE: 'orderdone',
  ORDER: 'order',

  FIRST: 'first',
  SCREEN1: 'screen1',
  SCREEN2: 'screen2',

  FORGET: 'forget1',
  OTP: 'otp',
  NEW_PASSWORD: 'newpassword',

  SIGNUP: 'signup',
  LOGIN: 'login',
} as const;

export type RouteName = (typeof Routes)[keyof typeof Routes];

// export const Routes = {
//   MAIN_TABS: 'MainTabs',
//   HOME_DRAWER: 'HomeDrawer',
//   HOME_TAB: 'HomeTab',
//   CART_TAB: 'CartTab',
// b',

//   HOME: 'home',
//   CART: 'Cart',
//   WISHLIST: 'wishlist',
//   PAYMENT: 'payment',
//   PROFILE: 'profile',
// uct',
//   PRODUCT_STACK: 'productstack',
//   REVIEWS: 'reviews',
//   ADD_REVIEW: 'addreview',
//   ADDRESS: 'address',
//   ADD_CARD: 'addcard',
//   OR  OR  ORDER_DONE: 'orderdone',
//   ORDER: 'order',
// : 'first',
//   SCREEN1: 'screen1',
//   SCREEN2: 'screen2',
//   FORGET: 'forget1',
//   OTP: 'otp',
//   NEW_PASSWORD: 'newpassword',
//   SIGNUP: 'signup',
//   LOGIN: 'login',

// }
// s c
// nst;

// export type RouteName = (typeof Routes)[keyof typeof Routes];
