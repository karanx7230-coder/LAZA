import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Routes } from '../utils';

const TAB_ICONS: Record<string, { icon: any; iconActive: any; label: string }> =
  {
    [Routes.HOME]: {
      icon: require('../assets/images/home1.png'),
      iconActive: require('../assets/images/home1.png'),
      label: 'Home',
    },
    [Routes.WISHLIST]: {
      icon: require('../assets/images/dil.png'),
      iconActive: require('../assets/images/dil.png'),
      label: 'Wishlist',
    },
    [Routes.CART]: {
      icon: require('../assets/images/batua.png'),
      iconActive: require('../assets/images/batua.png'),
      label: 'Cart',
    },
    [Routes.ORDER]: {
      icon: require('../assets/images/purse.png'),
      iconActive: require('../assets/images/purse.png'),
      label: 'Orders',
    },
  };

export const CustomTabBar = ({ state, navigation }: any) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.bar}>
        {state.routes.map((route: any, index: number) => {
          const tab = TAB_ICONS[route.name];
          if (!tab) {
            return null;
          }
          const isFocused = state.index === index;
          return (
            <TouchableOpacity
              key={route.key}
              style={[styles.item, isFocused && styles.itemActive]}
              activeOpacity={0.7}
              onPress={() => navigation.navigate(route.name)}
            >
              <Image
                source={isFocused ? tab.iconActive : tab.icon}
                style={[styles.icon, { opacity: isFocused ? 1 : 0.5 }]}
                resizeMode="contain"
              />
              {isFocused && <Text style={styles.label}>{tab.label}</Text>}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  bar: {
    flexDirection: 'row',
    backgroundColor: '#9a7777',
    borderRadius: 30,
    height: 68,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 40,
  },
  itemActive: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
  },
  label: {
    fontSize: 13,
    color: Colors.white,
    marginLeft: 6,
  },
  icon: {
    width: 44,
    height: 44,
  },
});
