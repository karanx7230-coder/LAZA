import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Routes } from '../utils';
import Home from '../screens/Home';
import Cart from '../screens/Cart';
import Wishlist from '../screens/Wishlist';
import Orders from '../screens/orders';
import { CustomTabBar } from './CustomTabBar';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
      initialRouteName={Routes.HOME}
    >
      <Tab.Screen name={Routes.HOME} component={Home} />
      <Tab.Screen name={Routes.WISHLIST} component={Wishlist} />
      <Tab.Screen name={Routes.CART} component={Cart} />
      <Tab.Screen name={Routes.ORDER} component={Orders} />
    </Tab.Navigator>
  );
}
