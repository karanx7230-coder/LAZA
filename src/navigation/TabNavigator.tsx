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

/// this tab to use soon import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import React from 'react';
// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { color } from '../../utils/colors';
// import { Fonts } from '../../assets/fonts';
// import { Routes } from '../../utils/routes';
// import Home from '../../containers/home/home';
// import {
//   community,
//   Coping,
//   Mick,
//   Podcast,
// } from '../../containers/community/community';
// import {
//   careHandsIcon,
//   careHandsIconWhite,
//   communityIcon,
//   communityIconWhite,
//   homeIcon,
//   homeIconWhite,
//   microphoneIcon,
//   microphoneIconWhite,
// } from '../../assets/images';

// const Tab = createBottomTabNavigator();

// const TAB_ICONS: Record<string, { icon: any; iconActive: any; label: string }> =
//   {
//     [Routes.HOME]: { icon: homeIcon, iconActive: homeIconWhite, label: 'Home' },
//     [Routes.MIC]: {
//       icon: microphoneIcon,
//       iconActive: microphoneIconWhite,
//       label: 'Mic',
//     },
//     [Routes.COMMUNITY]: {
//       icon: communityIcon,
//       iconActive: communityIconWhite,
//       label: 'Community',
//     },
//     [Routes.PODCAST]: {
//       icon: microphoneIcon,
//       iconActive: microphoneIconWhite,
//       label: 'Podcast',
//     },
//     [Routes.COPING]: {
//       icon: careHandsIcon,
//       iconActive: careHandsIconWhite,
//       label: 'Coping',
//     },
//   };

// const CustomTabBar = ({ state, navigation }: any) => {
//   const insets = useSafeAreaInsets();
//   return (
//     <View style={[styles.container, { paddingBottom: insets.bottom }]}>
//       <View style={styles.bar}>
//         {state.routes.map((route: any, index: number) => {
//           const tab = TAB_ICONS[route.name];
//           if (!tab) {
//             return null;
//           }
//           const isFocused = state.index === index;
//           return (
//             <TouchableOpacity
//               key={route.key}
//               style={[styles.item, isFocused && styles.itemActive]}
//               activeOpacity={0.7}
//               onPress={() => navigation.navigate(route.name)}
//             >
//               <Image
//                 source={isFocused ? tab.iconActive : tab.icon}
//                 style={styles.icon}
//                 resizeMode="contain"
//               />
//               {isFocused && <Text style={styles.label}>{tab.label}</Text>}
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     </View>
//   );
// };

// const TAB = () => (
//   <Tab.Navigator
//     tabBar={props => <CustomTabBar {...props} />}
//     screenOptions={{ headerShown: false }}
//     initialRouteName={Routes.HOME}
//   >
//     <Tab.Screen name={Routes.HOME} component={Home} />
//     <Tab.Screen name={Routes.MIC} component={Mick} />
//     <Tab.Screen name={Routes.COMMUNITY} component={community} />
//     <Tab.Screen name={Routes.PODCAST} component={Podcast} />
//     <Tab.Screen name={Routes.COPING} component={Coping} />
//   </Tab.Navigator>
// );

// export default TAB;

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     paddingHorizontal: 16,
//     paddingTop: 10,
//   },
//   bar: {
//     flexDirection: 'row',
//     backgroundColor: color.WHITE,
//     borderRadius: 30,
//     height: 68,
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     shadowColor: color.BLACK,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   item: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 10,
//     paddingHorizontal: 12,
//     borderRadius: 40,
//   },
//   itemActive: {
//     backgroundColor: color.APPLIGHT,
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: 44,
//   },
//   label: {
//     fontFamily: Fonts.Epilogue.Medium,
//     fontSize: 13,
//     color: color.WHITE,
//     marginLeft: 6,
//   },
//   icon: {
//     width: 24,
//     height: 24,
//   },
// });
