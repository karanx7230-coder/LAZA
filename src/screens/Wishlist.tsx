import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Routes } from '../utils';
import { useAppSelector } from '../hooks/redux';
import ProductCard from '../components/ProductCard';
import { useDispatch } from 'react-redux';
import { toggleWishlist } from '../store/redux/slice/wishlistSlice';

export default function Wishlist({ navigation }: any) {
  const items = useAppSelector(state => state.wishlist.items);
  const dispatch = useDispatch();
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
          <Text style={titleTextStyle}>Wishlist</Text>
        </View>
        <FlatList
          columnWrapperStyle={styles.just}
          data={items}
          numColumns={2}
          contentContainerStyle={styles.flatListContent}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              isFavorite
              onToggleFavorite={() => dispatch(toggleWishlist(item))}
              onPress={() =>
                navigation.navigate(Routes.PRODUCT, { productData: item })
              }
            />
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
    alignSelf: 'center',
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
    marginHorizontal: 15,
  },
  just: { justifyContent: 'space-between' },
});
