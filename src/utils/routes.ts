export const Routes = {
  MAIN_TABS: 'MainTabs',
  HOME_DRAWER: 'HomeDrawer',
  HOME_TAB: 'HomeTab',
  CART_TAB: 'CartTab',

  HOME: 'home',
  CART: 'Cart',
  WISHLIST: 'wishlist',
  PAYMENT: 'payment',
  PROFILE: 'profile',
  PRODUCT: 'product',
  PRODUCT_STACK: 'productstack',
  REVIEWS: 'reviews',
  ADD_REVIEW: 'addreview',
  ADDRESS: 'address',
  ADD_CARD: 'addcard',
  ORDER_DONE: 'orderdone',

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
