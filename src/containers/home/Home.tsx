import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Routes } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleWishlist } from '../../store/redux/slice/wishlistSlice';
import { loadProducts } from '../../store/redux/slice/productSlice';
import ProductCard from '../../components/product/ProductCard';
import HomeListHeader from '../../components/home/listheaderHome';

import styles from './Home.styles';

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


