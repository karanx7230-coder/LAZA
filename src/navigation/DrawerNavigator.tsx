import React from 'react';
import {
  createDrawerNavigator,
  type DrawerContentComponentProps,
} from '@react-navigation/drawer';

import { Routes } from '../utils';

import Profile from '../screens/Profile';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return <Profile {...props} />;
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '85%', 
        },
      }}
    >
      <Drawer.Screen name={Routes.HOME_DRAWER} component={TabNavigator} />
      
    
    </Drawer.Navigator>
  );
}