import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Routes } from '../utils';

import DrawerNavigator from './DrawerNavigator';
import FirstScreen from '../screen/first';
import Screen1 from '../screen/screen1';
import Screen2 from '../screen/screen2';
import Signup from '../screen/signup';
import Forget1 from '../screen/forget1';
import Signin from '../screen/login';
import Otp from '../screen/otp';
import newpassword from '../screen/newpassword';
import Cart from '../screen/Cart';
import product from '../screen/product';
import reviews from '../screen/reviews';
import AddReview from '../screen/addreview';
import address from '../screen/address';
import payment from '../screen/payment';
import addcard from '../screen/addcard';
import orderdone from '../screen/orderdone';
import profile from '../screen/profile';
import wishlist from '../screen/wishlist';
import Home from '../screen/home';
import Productstack from '../screen/productstack';

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
          <Stack.Screen name={Routes.HOME} component={Home} />
          <Stack.Screen name={Routes.CART} component={Cart} />
          <Stack.Screen name={Routes.WISHLIST} component={wishlist} />
          <Stack.Screen name={Routes.PAYMENT} component={payment} />
          <Stack.Screen name={Routes.PROFILE} component={profile} />
          <Stack.Screen name={Routes.PRODUCT} component={product} />
          <Stack.Screen
            name={Routes.PRODUCT_STACK}
            component={Productstack}
          />
          <Stack.Screen name={Routes.REVIEWS} component={reviews} />
          <Stack.Screen name={Routes.ADD_REVIEW} component={AddReview} />
          <Stack.Screen name={Routes.ADDRESS} component={address} />
          <Stack.Screen name={Routes.ADD_CARD} component={addcard} />
          <Stack.Screen name={Routes.ORDER_DONE} component={orderdone} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name={Routes.FIRST} component={FirstScreen} />
          <Stack.Screen name={Routes.SCREEN1} component={Screen1} />
          <Stack.Screen name={Routes.SCREEN2} component={Screen2} />
          <Stack.Screen name={Routes.FORGET} component={Forget1} />
          <Stack.Screen name={Routes.OTP} component={Otp} />
          <Stack.Screen
            name={Routes.NEW_PASSWORD}
            component={newpassword}
          />
          <Stack.Screen name={Routes.SIGNUP} component={Signup} />
          <Stack.Screen name={Routes.LOGIN} component={Signin} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}
