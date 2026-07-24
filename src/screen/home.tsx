import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { DrawerActions } from '@react-navigation/native';
import API from '../api/api';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';
export default function Home({ navigation }: any) {
  const { colors } = useTheme();
  const { wishlist, toggleWishlist } = useWishlist();
  const [cloths, setCloths] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Fragrances', 'Furniture', 'Beauty', 'Groceries'];
  const filteredProducts = cloths.filter(item => {
    const categoryMatch =
      selectedCategory === 'All' ||
      item.category.toLowerCase() === selectedCategory.toLowerCase();

    const searchMatch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return categoryMatch && searchMatch;
  });
  useEffect(() => {
    const getProductsFromAPI = async () => {
      try {
        const response = await API.get('/products');

        setCloths(response.data.products);
      } catch (error) {
        console.log('API call fail ho gayi:', error);
      } finally {
        setLoading(false);
      }
    };

    getProductsFromAPI();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#9B72FF" />
        <Text style={{ marginTop: 10 }}>Loading New Arrivals...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.view, { backgroundColor: colors.background }]}>
      <View style={styles.viewtop}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Image
            style={styles.imagetop}
            source={require('../assets/Menu.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.navigate('Cart')}
        >
          <Image
            style={styles.imagetop}
            source={require('../assets/Cart.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <Text style={[styles.hello, { color: colors.text }]}>Hello</Text>
      <Text style={[styles.welcome, { color: colors.text }]}>
        Welcome to Laza.
      </Text>
      <View style={styles.searchrow}>
        <View style={styles.search}>
          <Image
            source={require('../assets/searchgrey.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <TextInput
            style={styles.textput}
            placeholder="Search..."
            placeholderTextColor={'#9a9797'}
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
        </View>
      </View>
      <View style={styles.space}>
        <Text style={[styles.choose, { color: colors.text }]}>
          Choose Category
        </Text>
        <Text style={styles.viewall}>View All</Text>
      </View>
      <View style={styles.categoryrow}>
        <ScrollView
          horizontal={true}
          style={styles.brandbox}
          showsHorizontalScrollIndicator={false}
        >
          {categories.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.brand,
                selectedCategory === cat && { backgroundColor: '#9B72FF' },
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.brandname,
                  selectedCategory === cat && { color: '#fff' },
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.space}>
        <Text style={[styles.choose, { color: colors.text }]}>
          New Arrivals
        </Text>
        <TouchableOpacity>
          <Text style={styles.viewall}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        data={filteredProducts}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        renderItem={({ item }) => {
          const isFavorite = wishlist.some(
            (favItem: any) => favItem.id === item.id,
          );

          return (
            <View style={styles.clothboxes}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('product', { productData: item })
                }
                style={styles.touchbox}
              >
                <ImageBackground
                  source={{ uri: item.thumbnail }}
                  style={styles.clothimage}
                  resizeMode="contain"
                >
                  <TouchableOpacity
                    style={styles.diltouch}
                    onPress={() => toggleWishlist(item)}
                  >
                    <Image
                      source={
                        isFavorite
                          ? require('../assets/heart1.png')
                          : require('../assets/Heart.png')
                      }
                      style={styles.dilimage}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </ImageBackground>

                <Text style={styles.name} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.price} numberOfLines={1}>
                  ${item.price}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#f9d7d719',
    padding: 15,
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
  },
  touchbox: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 5,
    alignItems: 'center',
    width: 170,
    borderRadius: 10,
  },
  clothboxes: {
    height: 'auto',
    width: 'auto',
  },
  clothimage: {
    width: 160,
    height: 200,
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
  diltouch: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 8,
    borderRadius: 20,
  },
  dilimage: {
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
