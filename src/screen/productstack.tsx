import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  ActivityIndicator, // <-- Added ActivityIndicator
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { observer } from '@legendapp/state/react';
import { useTheme } from '../context/ThemeContext';
import API from '../api/api';
import { Colors, Routes } from '../utils';
import {
  addToCart,
  cart$,
  decreaseQuantity,
  increaseQuantity,
} from '../store/legend/cart';

export default observer(function Productstack({ route, navigation }: any) {
  const { colors } = useTheme();
  const [productData, setProductData] = useState(
    route.params?.productData || null,
  );
  const [loading, setLoading] = useState(!route.params?.productData);
  const [quantity, setQuantity] = useState(1);
  const productId = route?.params?.id;
  useEffect(() => {
    if (!productData && productId) {
      API.get(`/products/${productId}`)
        .then(({ data }) => {
          setProductData(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [productId, productData]);

  // 3. Show loading screen while fetching
  if (loading || !productData) {
    return (
      <View
        style={[
          styles.scrollview,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <ActivityIndicator size="large" color="#9B72FF" />
      </View>
    );
  }

  // Now it is safe to use productData!
  const isItemInCart = cart$.items
    .get()
    .some(item => item.id === productData.id);

  const handlePress = () => {
    if (!isItemInCart) {
      addToCart({ ...productData, quantity: quantity });
    } else {
      navigation.navigate(Routes.CART);
    }
  };

  const totalPrice = productData.price * quantity;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
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
              <Text style={styles.backtext}> ← </Text>
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
        </ImageBackground>

        <View style={styles.mainview}>
          <View style={styles.view2}>
            <View style={styles.subname}></View>
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
                  navigation.navigate('reviews', {
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
                      {productData.reviews[0].rating} ★
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
          <TouchableOpacity
            onPress={() => decreaseQuantity}
            style={styles.qtyButton}
          >
            <Text style={styles.qtyIcon}>-</Text>
          </TouchableOpacity>
          <Text style={[styles.qtyText, { color: colors.text }]}>
            {quantity}
          </Text>
          <TouchableOpacity
            onPress={() => increaseQuantity}
            style={styles.qtyButton}
          >
            <Text style={styles.qtyIcon}>+</Text>
          </TouchableOpacity>
          <Text style={[styles.price, { color: colors.text }]}>
            ${totalPrice.toFixed(2)}
          </Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={handlePress}
          style={[
            styles.addtocart,
            { backgroundColor: isItemInCart ? '#3281ffa7' : Colors.primary },
          ]}
        >
          <Text style={styles.cart}>
            {isItemInCart ? 'Go to Cart' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

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
  imagetop: {
    height: 45,
    width: 45,
    borderRadius: 20,
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
  imageextra: {
    height: 77,
    width: 77,
    borderRadius: 10,
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
  buttonText: {
    color: '#737373',
    fontWeight: 'bold',
    fontSize: 12,
  },
  more: {
    fontSize: 12,
    color: '#b2b2b2',
    marginTop: -4,
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
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
  },
  qtyButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#949494',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  qtyIcon: {
    fontSize: 16,
    color: '#242424',
  },
  qtyText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceviewbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  pricetext: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2d2d2d',
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
