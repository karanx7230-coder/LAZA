import React from 'react';
import { Image, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Routes, Colors } from '../utils';

import Home from '../screen/home';
import Cart from '../screen/Cart';
import wishlist from '../screen/wishlist';
import payment from '../screen/payment';
const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors.white,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name={Routes.HOME_TAB}
        component={Home}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Text style={{ fontSize: 12, color: Colors.primary }}>home</Text>
            ) : (
              <Image
                source={require('../assets/home1.png')}
                style={{ width: 40, height: 35 }}
                resizeMode="cover"
              />
            ),
        }}
      />
      <Tab.Screen
        name={Routes.WISHLIST}
        component={wishlist}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate(Routes.WISHLIST, { brandName: undefined });
          },
        })}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Text style={{ fontSize: 12 }}>wish list</Text>
            ) : (
              <Image
                source={require('../assets/dil.png')}
                style={{ width: 40, height: 40, opacity: 1 }}
                resizeMode="contain"
              />
            ),
        }}
      />

      <Tab.Screen
        name={Routes.CART_TAB}
        component={Cart}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Text style={{ fontSize: 12 }}>Cart</Text>
            ) : (
              <Image
                source={require('../assets/bag1.png')}
                style={{ width: 35, height: 35, opacity: 1 }}
                resizeMode="contain"
              />
            ),
        }}
      />
      <Tab.Screen
        name={Routes.PAYMENT}
        component={payment}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Text style={{ fontSize: 12 }}>batua</Text>
            ) : (
              <Image
                source={require('../assets/batua.png')}
                style={{ width: 40, height: 40, opacity: 1 }}
                resizeMode="contain"
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
