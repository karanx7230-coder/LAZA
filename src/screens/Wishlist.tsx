import React, { useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Routes } from '../utils';
import { useAppSelector } from '../hooks/redux';

export default function Wishlist({ navigation }: any) {
  const items = useAppSelector(state => state.wishlist.items);

  const { isDarkMode, colors } = useTheme();
  const insets = useSafeAreaInsets();

  const pageStyle = useMemo(
    () => [
      styles.view,
      {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: colors.background,
      },
    ],
    [insets.top, insets.bottom, colors.background],
  );

  const titleTextStyle = useMemo(
    () => [styles.title, { color: colors.text }],
    [colors.text],
  );

  if (items.length === 0) {
    return (
      <View style={styles.center}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
          translucent
        />
        <Text style={styles.emptyText}>Your Wishlist is Empty!</Text>
      </View>
    );
  }

  return (
    <View style={pageStyle}>
      <View style={styles.container1}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={titleTextStyle}>Wishlist</Text>
          <View style={styles.headerSpacer} />
        </View>

        <FlatList
          data={items}
          numColumns={2}
          contentContainerStyle={styles.flatListContent}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(Routes.PRODUCT, { productData: item })
                }
                style={styles.touchbox}
              >
                <Image
                  source={{ uri: item.thumbnail }}
                  style={styles.image}
                  resizeMode="contain"
                />

                <Text style={styles.name} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.price} numberOfLines={1}>
                  ${item.price}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container1: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  backButton: {
    padding: 10,
    backgroundColor: Colors.bgLight,
    borderRadius: 50,
  },
  backArrow: {
    fontSize: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.black,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  emptyText: {
    fontSize: 18,
    color: Colors.textMedium,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
    backgroundColor: Colors.white,
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
  itemTextWrapper: {
    flex: 1,
  },

  //card styles
  container: {
    height: 'auto',
    width: 'auto',
  },
  touchbox: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 5,
    alignItems: 'center',
    width: 170,
    borderRadius: 10,
  },
  image: {
    width: 160,
    height: 200,
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
  favoriteTouch: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 8,
    borderRadius: 20,
  },
  favoriteImage: {
    width: 20,
    height: 20,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 5,
    color: '#333',
    width: 150,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});
// <TouchableOpacity
//   style={styles.item}
//   onPress={() =>
//     navigation.navigate(Routes.PRODUCT, { productData: item })
//   }
// >
//   <Image source={{ uri: item.thumbnail }} style={styles.img} />
//   <View style={styles.itemTextWrapper}>
//     <Text style={styles.name} numberOfLines={1}>
//       {item.title}
//     </Text>
//     <Text style={styles.price}>${item.price}</Text>
//   </View>
// </TouchableOpacity>
