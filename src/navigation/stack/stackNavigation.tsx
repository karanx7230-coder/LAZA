import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Routes } from '../../utils';

import DrawerNavigator from '../drawer/drawerNavigator';
import FirstScreen from '../../containers/auth/FirstScreen';
import Screen1 from '../../containers/auth/Screen1';
import Signup from '../../containers/auth/Signup';
import Forget1 from '../../containers/auth/Forget1';
import Signin from '../../containers/auth/Signin';
import Otp from '../../containers/auth/Otp';
import NewPassword from '../../containers/auth/NewPassword';
import Product from '../../containers/product/Product';
import Reviews from '../../containers/product/Reviews';
import AddReview from '../../containers/product/AddReview';
import Address from '../../containers/address/Address';
import AddCard from '../../containers/address/AddCard';
import OrderDone from '../../containers/orders/OrderDone';
import ProductStack from '../../containers/product/ProductStack';
import Orders from '../../containers/orders/orders';
import TrackingScreen from '../../containers/orders/tracklist';
import Payment from '../../containers/payment/Payment';

const Stack = createNativeStackNavigator();
export default function StackNavigator({ user }: { user: any }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <Stack.Group>
          <Stack.Screen name={Routes.MAIN_TABS} component={DrawerNavigator} />
          <Stack.Screen name={Routes.NEW_PASSWORD} component={NewPassword} />
          <Stack.Screen name={Routes.PRODUCT} component={Product} />
          <Stack.Screen name={Routes.Track} component={TrackingScreen} />
          <Stack.Screen name={Routes.PRODUCT_STACK} component={ProductStack} />
          <Stack.Screen name={Routes.REVIEWS} component={Reviews} />
          <Stack.Screen name={Routes.ADD_REVIEW} component={AddReview} />
          <Stack.Screen name={Routes.ADDRESS} component={Address} />
          <Stack.Screen name={Routes.ADD_CARD} component={AddCard} />
          <Stack.Screen name={Routes.PAYMENT} component={Payment} />
          <Stack.Screen name={Routes.ORDER_DONE} component={OrderDone} />
          <Stack.Screen name={Routes.ORDER} component={Orders} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name={Routes.FIRST} component={FirstScreen} />
          <Stack.Screen name={Routes.SCREEN1} component={Screen1} />
          <Stack.Screen name={Routes.FORGET} component={Forget1} />
          <Stack.Screen name={Routes.OTP} component={Otp} />
          <Stack.Screen name={Routes.NEW_PASSWORD} component={NewPassword} />
          <Stack.Screen name={Routes.SIGNUP} component={Signup} />
          <Stack.Screen name={Routes.LOGIN} component={Signin} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}
