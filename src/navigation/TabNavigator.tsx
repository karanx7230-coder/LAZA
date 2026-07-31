import React from 'react';
import { Image, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
          backgroundColor: '#ffffff',
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Text style={{ fontSize: 12, color: '#9B72FF' }}>home</Text>
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
        name="wishlist"
        component={wishlist}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('wishlist', { brandName: undefined });
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
        name="CartTab"
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
        name="payment"
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
