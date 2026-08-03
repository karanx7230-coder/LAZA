import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Routes } from '../utils';
import { useStore } from '../store';
import { observer } from 'mobx-react-lite';
export default observer(function Wishlist({ navigation }: any) {
  const wishlist = useStore().wishlist;

  const { isDarkMode, colors } = useTheme();
  const insets = useSafeAreaInsets();
  if (wishlist.items.length === 0) {
    return (
      <View style={styles.center}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
          translucent
        />
        <Text style={{ fontSize: 18, color: 'gray' }}>
          Your Wishlist is Empty!
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.view,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          backgroundColor: colors.background,
        },
      ]}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={{ fontSize: 20 }}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>Wishlist</Text>
          <View style={{ width: 40 }} />
        </View>

        <FlatList
          data={wishlist.items}
          contentContainerStyle={{ paddingBottom: 20 }}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() =>
                navigation.navigate(Routes.PRODUCT, { productData: item })
              }
            >
              <Image source={{ uri: item.thumbnail }} style={styles.img} />
              <View style={{ flex: 1 }}>
                <Text style={styles.name} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.price}>${item.price}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  backButton: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
  },
  img: {
    width: 70,
    height: 70,
    marginRight: 15,
    borderRadius: 10,
    backgroundColor: '#f4f4f4',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 5,
  },
});
