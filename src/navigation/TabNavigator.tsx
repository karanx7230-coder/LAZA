import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Routes, Colors } from '../utils';
import Home from '../screens/Home';
import Cart from '../screens/Cart';
import Wishlist from '../screens/Wishlist';
import Orders from '../screens/orders';
const Tab = createBottomTabNavigator();

const NoAnimationTabButton = (props: any) => (
  <Pressable {...props} android_ripple={null} style={props.style} />
);

export default function TabNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors.white,
          height: 60 + insets.bottom,
        },
        tabBarButton: props => <NoAnimationTabButton {...props} />,
      }}
    >
      <Tab.Screen
        name={Routes.HOME}
        component={Home}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                source={require('../assets/images/home1.png')}
                style={{ width: 40, height: 35 }}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={require('../assets/images/home1.png')}
                style={{ width: 40, height: 35, opacity: 0.5 }}
                resizeMode="cover"
              />
            ),
        }}
      />
      <Tab.Screen
        name={Routes.WISHLIST}
        component={Wishlist}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate(Routes.WISHLIST, { brandName: undefined });
          },
        })}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                source={require('../assets/images/dil.png')}
                style={{ width: 40, height: 40, opacity: 1 }}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={require('../assets/images/dil.png')}
                style={{ width: 40, height: 40, opacity: 0.5 }}
                resizeMode="contain"
              />
            ),
        }}
      />

      <Tab.Screen
        name={Routes.CART}
        component={Cart}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                source={require('../assets/images/bag1.png')}
                style={{ width: 35, height: 35, opacity: 1 }}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={require('../assets/images/bag1.png')}
                style={{ width: 35, height: 35, opacity: 0.5 }}
                resizeMode="contain"
              />
            ),
        }}
      />
      <Tab.Screen
        name={Routes.ORDER}
        component={Orders}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                source={require('../assets/images/batua.png')}
                style={{ width: 40, height: 40, opacity: 1 }}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={require('../assets/images/batua.png')}
                style={{ width: 40, height: 40, opacity: 0.5 }}
                resizeMode="contain"
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
