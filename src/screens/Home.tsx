import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Routes } from '../utils';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { toggleWishlist } from '../store/redux/slice/wishlistSlice';
import { loadProducts } from '../store/redux/slice/productSlice';
import ProductCard from '../components/ProductCard';
import HomeListHeader from '../components/listheaderHome';

export default function Home({ navigation }: any) {
  const { isDarkMode, colors } = useTheme();
  const dispatch = useAppDispatch();

  const wishlistItems = useAppSelector(state => state.wishlist.items);

  const cloths = useAppSelector(state => state.products.products);
  const loading = useAppSelector(state => state.products.loading);
  const error = useAppSelector(state => state.products.error);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = useMemo(
    () => [
      'All',
      ...new Set(
        cloths.map(item => item.category).filter((c): c is string => !!c),
      ),
    ],
    [cloths],
  );
  const filteredProducts = useMemo(
    () =>
      cloths.filter(item => {
        const categoryMatch =
          selectedCategory === 'All' ||
          (item.category ?? '').toLowerCase() ===
            selectedCategory.toLowerCase();

        const searchMatch = item.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        return categoryMatch && searchMatch;
      }),
    [cloths, selectedCategory, searchQuery],
  );

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  if (loading && cloths.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.background,
        }}
      >
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
          translucent
        />
        <ActivityIndicator size="large" color="#9B72FF" />
        <Text style={{ marginTop: 10, color: colors.text }}>
          Loading New Arrivals...
        </Text>
      </View>
    );
  }

  if (!loading && cloths.length === 0 && error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.background,
          padding: 20,
        }}
      >
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
          translucent
        />
        <Text
          style={{ color: colors.text, textAlign: 'center', marginBottom: 12 }}
        >
          {error === 'OFFLINE_NO_CACHE'
            ? "You're offline and there's nothing saved yet."
            : 'Something went wrong loading products.'}
        </Text>
        <TouchableOpacity
          style={styles.brand}
          onPress={() => dispatch(loadProducts())}
        >
          <Text style={styles.brandname}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.view, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <FlatList
        ListHeaderComponent={
          <HomeListHeader
            navigation={navigation}
            colors={colors}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        }
        numColumns={2}
        columnWrapperStyle={styles.just}
        showsVerticalScrollIndicator={false}
        data={filteredProducts}
        extraData={wishlistItems.length}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        //performance keh liye 
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={5}
        removeClippedSubviews
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            isFavorite={wishlistItems.some(i => i.id === item.id)}
            onPress={() =>
              navigation.navigate(Routes.PRODUCT, { productData: item })
            }
            onToggleFavorite={() => dispatch(toggleWishlist(item))}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#f9d7d719',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  viewtop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  back: {
    width: 50,
    height: 50,
    backgroundColor: '#ffffff9d',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    fontWeight: 'bold',
    borderRadius: 100,
  },
  imagetop: {
    height: 52,
    width: 52,
    borderRadius: 20,
  },

  hello: {
    fontWeight: '900',
    fontSize: 40,
  },
  welcome: {
    fontSize: 17,
    color: '#b4b4b4',
  },
  searchrow: {
    flexDirection: 'row',
  },
  image: {
    height: 25,
    width: 25,
    padding: 15,
    margin: 5,
  },
  textput: {
    color: 'black',
    flex: 1,
    height: '100%',
  },
  search: {
    backgroundColor: '#f6f6f6c0',
    marginVertical: 15,
    height: 50,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  space: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  just: { justifyContent: 'space-between' },

  choose: {
    fontSize: 22,
  },
  viewall: {
    fontSize: 12,
    color: '#b4b4b4',
  },
  categoryrow: {
    height: 60,
    marginVertical: 10,
  },
  brandbox: {
    marginTop: 20,
    flexDirection: 'row',
  },
  brand: {
    flexDirection: 'row',
    backgroundColor: '#dbdbdb88',
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    alignItems: 'center',
  },
  brandname: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
