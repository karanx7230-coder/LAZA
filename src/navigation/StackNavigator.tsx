import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
        // Agar user login hai (user object exist karta hai), toh yeh screens dikhao
        <Stack.Group>
          <Stack.Screen name="MainTabs" component={DrawerNavigator} />
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="wishlist" component={wishlist} />
          <Stack.Screen name="payment" component={payment} />
          <Stack.Screen name="profile" component={profile} />
          <Stack.Screen name="product" component={product} />
          <Stack.Screen name="productstack" component={Productstack} />
          <Stack.Screen name="reviews" component={reviews} />
          <Stack.Screen name="addreview" component={AddReview} />
          <Stack.Screen name="address" component={address} />
          <Stack.Screen name="addcard" component={addcard} />
          <Stack.Screen name="orderdone" component={orderdone} />
        </Stack.Group>
      ) : (
        // Agar user null hai (login nahi kiya), toh sirf yeh Auth screens dikhao
        <Stack.Group>
          <Stack.Screen name="first" component={FirstScreen} />
          <Stack.Screen name="screen1" component={Screen1} />
          <Stack.Screen name="screen2" component={Screen2} />
          <Stack.Screen name="forget1" component={Forget1} />
          <Stack.Screen name="otp" component={Otp} />
          <Stack.Screen name="newpassword" component={newpassword} />
          <Stack.Screen name="signup" component={Signup} />
          <Stack.Screen name="login" component={Signin} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}
