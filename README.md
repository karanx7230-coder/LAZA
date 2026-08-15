# LAZA

LAZA is a mobile e-commerce app built with **React Native** (0.85) and **TypeScript**. It includes user authentication, an offline-capable product catalog, cart / wishlist / orders / addresses / payment-cards, a live tracking map, push notifications and deep linking.

## Tech Stack

- **React Native 0.85.2** · **React 19** · **TypeScript 5.8**
- **State**: Redux Toolkit 2.x + `redux-persist` (AsyncStorage)
- **Navigation**: react-navigation v7 (native-stack + drawer + bottom-tabs)
- **Backend/API**: Firebase (Auth + Cloud Messaging), `dummyjson.com` product API
- **Other**: notifee (local notifications), react-native-maps + geolocation-service (tracking), NetInfo (offline detection)

## Prerequisites

- Node.js >= 22.11.0
- React Native environment set up ([guide](https://reactnative.dev/docs/set-up-your-environment))
- Firebase project with a `google-services.json` placed in `android/app/` (used by auth & messaging)
- For the map/tracking features: a device or emulator with location enabled and the fine-location permission

> The product catalog is loaded from the public `dummyjson.com` API — no backend setup is required to run the core shopping flow.

## Getting Started

```sh
yarn          # install dependencies
yarn start    # start Metro
```

Then, in a second terminal:

```sh
yarn android  # build & run on Android
# or
yarn ios      # build & run on iOS (requires CocoaPods: bundle exec pod install first)
```

## Scripts

| Script        | Description                       |
| ------------- | --------------------------------- |
| `yarn start`  | Start Metro dev server            |
| `yarn android`| Run on Android                    |
| `yarn ios`    | Run on iOS                        |
| `yarn lint`   | Run ESLint                        |
| `yarn test`   | Run Jest tests                    |

## Project Structure

```
src/
├── api/                 # HTTP clients (axios + RTK Query slice)
├── components/          # Reusable UI (ProductCard, QuantityStepper, …)
├── constants/           # Routes, Colors
├── context/             # ThemeContext (dark/light mode)
├── hooks/               # useAppDispatch / useAppSelector
├── navigation/          # Stack, Drawer, Tab navigators + navigation service
├── screens/             # All screens
├── service/             # Notifications (FCM/notifee), deep linking
├── store/
│   ├── redux/slice/     # user, cart, wishlist, orders, address, card, products
│   └── redux/store/     # Redux store + persist config
├── types/               # Shared TypeScript types
└── utils/               # Barrel: routes, colors, formatters
```

### Key folders explained

- `src/navigation/StackNavigator.tsx` — root stack. Swaps between the **logged-in** group (tabs + detail screens) and the **logged-out** group (onboarding, login, signup, reset password) based on the Firebase auth state.
- `src/navigation/DrawerNavigator.tsx` — drawer whose content is the **Profile** screen.
- `src/navigation/TabNavigator.tsx` — bottom tabs: Home, Wishlist, Cart, Payment.
- `src/store/redux/store/store.ts` — `configureStore` + `redux-persist`. Whitelisted state survives restarts: `userreducer`, `cart`, `wishlist`, `address`, `orders`, `products`, `card`.
- `src/store/redux/slice/productSlice.tsx` — offline cache-first product loading: if online it fetches all products from the API, if offline it uses the persisted cache.
- `src/service/notification.js` — FCM token, foreground/background notification handling (notifee).
- `src/service/link.js` — deep links into product detail.

## Navigation Map

```
StackNavigator
├── Logged in:
│   ├── MAIN_TABS ── DrawerNavigator ── TabNavigator
│   │                                 ├── Home
│   │                                 ├── Wishlist
│   │                                 ├── Cart
│   │                                 └── Payment
│   ├── Product / ProductStack / Reviews / AddReview
│   ├── Address / Track (tracking map)
│   ├── AddCard / Orders / OrderDone / NewPassword
└── Logged out:
    ├── FirstScreen → Screen1 → Screen2 → Login / Signup
    └── Forget → OTP → NewPassword
```

Cross-navigator navigation (e.g. Cart screen from a stack screen) uses the nested form:
`navigate(MAIN_TABS → HOME_DRAWER → <tab>)`.

## State & Data Flow

- **Auth**: `App.tsx` listens to `auth().onAuthStateChanged`, stores the user in the Redux `userreducer`, and re-renders the navigator with the matching screen group.
- **Catalog**: `Home` dispatches `loadProducts` (productSlice). Data is persisted, so the app works offline after the first load. Search + category filtering is done client-side.
- **Cart / Wishlist / Orders**: synchronous Redux slices; the cart and wishlist persist across sessions. Checkout builds an order and clears the cart.

## Known Issues / Pending Work

- ~~**RTK Query slice is not connected to the store.**~~ **Fixed.** `src/api/api.ts` defines an `api2` RTK Query slice (`getProducts`, `getProduct`); it is now registered in `store.ts` via `[api2.reducerPath]: api2.reducer` (root reducer) and `.concat(api2.middleware)` (middleware). The api reducer is intentionally **not** in the redux-persist whitelist.
- ~~**`Product.id` type mismatch.**~~ **Fixed.** The `Product` interface in `src/types/index.ts` now declares `id: number`, matching the dummyjson API. Cart/wishlist reducers and their action payloads were updated to `number` accordingly.
- ~~**`Product` type is missing `availabilityStatus`**~~ **Fixed.** Added `availabilityStatus?: string` to the `Product` type.
- ~~**RTK Query endpoints are untyped**~~ **Fixed.** `getProducts: builder.query<Product[], void>` and `getProduct: builder.query<Product, string>` are typed against the shared `Product` interface.
- ~~**Unused imports / dead error check in ProductStack**~~ **Fixed.** `useEffect` import removed; the hook now destructures `isError` instead of `error`, and the unreachable `|| !productData` condition was removed.
- `formatCardNumber` (previously in `src/utils/format.ts`) was removed; payment screens format card numbers inline.

## Troubleshooting

- **Clearing stale persisted state**: the app persists Redux state; if you change persisted shapes during development you may need to clear app data (`adb shell pm clear com.laza` or reinstall) so the old cache doesn't conflict.
- **Notifications**: request permission on first launch; the FCM token is logged via `getFCMToken`.
