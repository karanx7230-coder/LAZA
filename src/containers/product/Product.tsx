import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  StatusBar,
} from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Colors, Routes } from '../../utils';
import { toggleWishlist } from '../../store/redux/slice/wishlistSlice';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addToCart } from '../../store/redux/slice/cartSlice';
import QuantityStepper from '../../components/product/QuantityStepper';
export default function Product({ route, navigation }: any) {
  const { isDarkMode, colors } = useTheme();
  const dispatch = useAppDispatch();
  const { productData } = route.params;
  const isItemInCart = useAppSelector(state =>
    state.cart.items.some(item => item.id === productData.id),
  );
  const isOutOfStock =
    productData.stock === 0 ||
    productData.availabilityStatus === 'Out of Stock';
  const handlePress = () => {
    if (isOutOfStock) return;
    if (!isItemInCart) {
      dispatch(addToCart({ ...productData, quantity }));
    } else {
      navigation.navigate(Routes.MAIN_TABS, {
        screen: Routes.HOME_DRAWER,
        params: { screen: Routes.CART },
      });
    }
  };
  const wishlistItems = useAppSelector(state => state.wishlist.items);
  const [quantity, setQuantity] = useState(1);
  const isFavorite = wishlistItems.some(i => i.id === productData.id);
  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };
  const totalPrice = productData.price * quantity;
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <ScrollView style={styles.scrollview}>
        <ImageBackground
          source={{ uri: productData.thumbnail }}
          style={styles.image}
          resizeMode="contain"
        >
          <View style={styles.viewtop}>
            <TouchableOpacity
              style={styles.back}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backtext}> â† </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.wishlist}
              onPress={() => dispatch(toggleWishlist(productData))}
            >
              <Image
                source={
                  isFavorite
                    ? require('../../assets/images/heart1.png')
                    : require('../../assets/images/Heart.png')
                }
                style={styles.imagewish}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <View style={styles.mainview}>
          <View style={styles.view2}>
            <View style={styles.subname} />
            <Text style={styles.subname}>price</Text>
          </View>
          <View style={styles.view3}>
            <Text style={[styles.name, { color: colors.text }]}>
              {productData.title}
            </Text>
            <Text style={[styles.price, { color: colors.text }]}>
              ${productData.price}
            </Text>
          </View>

          <View style={styles.viewdescription}>
            <Text style={[styles.name, { color: colors.text }]}>
              Description
            </Text>

            <Text style={styles.subname}>{productData.description}</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <View style={styles.view2}>
              <Text style={[styles.name, { color: colors.text }]}>Reviews</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(Routes.REVIEWS, {
                    reviews: productData.reviews,
                  })
                }
              >
                <Text style={styles.subname}>View All</Text>
              </TouchableOpacity>
            </View>

            {productData.reviews && productData.reviews.length > 0 ? (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                  }}
                >
                  <View
                    style={[
                      styles.profileimg,
                      {
                        backgroundColor: '#f0f0f0',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                    ]}
                  >
                    <Text style={{ fontWeight: 'bold' }}>
                      {productData.reviews[0].reviewerName.charAt(0)}
                    </Text>
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: 'bold', color: colors.text }}>
                      {productData.reviews[0].reviewerName}
                    </Text>
                    <Text style={styles.date}>
                      {new Date(
                        productData.reviews[0].date,
                      ).toLocaleDateString()}
                    </Text>
                  </View>

                  <View style={styles.viewrating}>
                    <Text style={styles.rating}>
                      {productData.reviews[0].rating} â˜…
                    </Text>
                  </View>
                </View>

                <Text style={styles.reviewpassage}>
                  {productData.reviews[0].comment}
                </Text>
              </View>
            ) : (
              <Text style={styles.subname}>No reviews yet.</Text>
            )}
          </View>
        </View>
      </ScrollView>
      <View>
        <View style={styles.priceviewbox}>
          <View>
            <Text style={[styles.name, { color: colors.text }]}>
              Total Price
            </Text>
            <Text style={styles.tax}>with VAT,SD</Text>
          </View>
          <QuantityStepper
            value={quantity}
            onDecrease={decreaseQty}
            onIncrease={increaseQty}
            valueStyle={{ color: colors.text }}
          />
          <Text style={[styles.price, { color: colors.text }]}>
            ${totalPrice.toFixed(2)}
          </Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={handlePress}
          disabled={isOutOfStock}
          style={[
            styles.addtocart,
            {
              backgroundColor: isOutOfStock
                ? '#c9c9c9'
                : isItemInCart
                ? '#3281ffa7'
                : Colors.primary,
            },
          ]}
        >
          <Text style={styles.cart}>
            {isOutOfStock
              ? 'Out of Stock'
              : isItemInCart
              ? 'Go to Cart'
              : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
  },

  viewtop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  back: {
    width: 45,
    height: 45,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginHorizontal: 20,
    borderRadius: 25,
    fontWeight: 'bold',
  },
  wishlist: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginHorizontal: 20,
  },
  imagewish: {
    height: 25,
    width: 25,
    borderRadius: 20,
  },
  backtext: {
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    lineHeight: 30,
  },

  image: {
    width: '100%',
    height: 350,
    backgroundColor: '#e9e9e998',
  },

  mainview: {
    paddingHorizontal: 20,
  },
  view2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  subname: {
    fontSize: 12,
    color: '#b2b2b2',
    marginTop: 10,
  },
  view3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 22,
    fontWeight: '400',
    color: '#000',
    marginTop: 5,
  },
  viewdescription: {
    marginTop: 5,
  },
  profileimg: {
    height: 40,
    width: 40,
    marginRight: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  rating: {
    color: 'grey',
  },
  date: {
    color: '#b4b4b4',
  },

  reviewpassage: {
    fontSize: 13,
    padding: 10,
    color: '#878787',
  },
  row: {
    flexDirection: 'row',
  },
  priceviewbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  tax: {
    fontSize: 11,
    color: '#b1b1b1',
    marginTop: 2,
  },
  cart: {
    color: '#ffffff',
    fontSize: 20,
  },
  addtocart: {
    alignItems: 'center',
    marginHorizontal: -20,
    paddingVertical: 18,
    marginTop: 20,
  },
  viewrating: {
    marginLeft: 130,
    marginTop: 10,
  },
});
