import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Routes } from '../utils';

import DrawerNavigator from './DrawerNavigator';
import FirstScreen from '../screens/FirstScreen';
import Screen1 from '../screens/Screen1';
import Signup from '../screens/Signup';
import Forget1 from '../screens/Forget1';
import Signin from '../screens/Signin';
import Otp from '../screens/Otp';
import NewPassword from '../screens/NewPassword';
import Product from '../screens/Product';
import Reviews from '../screens/Reviews';
import AddReview from '../screens/AddReview';
import Address from '../screens/Address';
import AddCard from '../screens/AddCard';
import OrderDone from '../screens/OrderDone';
import ProductStack from '../screens/ProductStack';
import Orders from '../screens/orders';
import TrackingScreen from '../screens/tracklist';
import Payment from '../screens/Payment';

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
