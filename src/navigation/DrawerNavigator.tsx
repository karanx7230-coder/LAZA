import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Profile from '../screen/profile'; 
import TabNavigator from './TabNavigator'; 

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <Profile {...props} />} 
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '85%', 
        },
      }}
    >
      <Drawer.Screen name="HomeDrawer" component={TabNavigator} />
      
    
    </Drawer.Navigator>
  );
}