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
import ProductCard from '../components/ProductCard';

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
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          data={items}
          numColumns={2}
          contentContainerStyle={styles.flatListContent}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
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
    marginHorizontal: 15,
  },
});
