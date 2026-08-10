import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import API from '../api/api';
import { Colors, Routes } from '../utils';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { addToCart } from '../store/redux/slice/cartSlice';
import QuantityStepper from '../components/QuantityStepper';

export default function Productstack({ route, navigation }: any) {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const [productData, setProductData] = useState(
    route.params?.productData || null,
  );
  const [loading, setLoading] = useState(!route.params?.productData);
  const [quantity, setQuantity] = useState(1);
  const productId = route?.params?.id;
  const isItemInCart = useAppSelector(state =>
    state.cart.items.some(item => item.id === productData?.id),
  );

  const themeStyles = useMemo(
    () =>
      StyleSheet.create({
        screenBackground: {
          flex: 1,
          backgroundColor: colors.background,
        },
        textColor: {
          color: colors.text,
        },
        buttonBackground: {
          backgroundColor: isItemInCart ? '#3281ffa7' : Colors.primary,
        },
        quantityValue: {
          color: colors.text,
        },
      }),
    [colors.background, colors.text, isItemInCart],
  );

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

  if (loading || !productData) {
    return (
      <View style={[styles.screen, styles.loading]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };
  const increaseQty = () => setQuantity(prev => prev + 1);

  const handlePress = () => {
    if (!isItemInCart) {
      dispatch(addToCart({ ...productData, quantity }));
    } else {
      navigation.navigate(Routes.MAIN_TABS, {
        screen: Routes.HOME_DRAWER,
        params: { screen: Routes.CART },
      });
    }
  };

  const totalPrice = productData.price * quantity;

  return (
    <View style={[styles.screen, themeStyles.screenBackground]}>
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
              onPress={() =>
                navigation.navigate(Routes.MAIN_TABS, {
                  screen: Routes.HOME_DRAWER,
                  params: { screen: Routes.CART },
                })
              }
            >
              <Image
                style={styles.imagetop}
                source={require('../assets/images/Cart.png')}
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
            <Text style={[styles.name, themeStyles.textColor]}>
              {productData.title}
            </Text>
            <Text style={[styles.price, themeStyles.textColor]}>
              ${productData.price}
            </Text>
          </View>

          <View style={styles.viewdescription}>
            <Text style={[styles.name, themeStyles.textColor]}>
              Description
            </Text>
            <Text style={styles.subname}>{productData.description}</Text>
          </View>

          <View style={styles.section}>
            <View style={styles.view2}>
              <Text style={[styles.name, themeStyles.textColor]}>Reviews</Text>
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
                <View style={styles.reviewSummaryRow}>
                  <View style={[styles.profileimg, styles.profileAvatar]}>
                    <Text style={styles.boldText}>
                      {productData.reviews[0].reviewerName.charAt(0)}
                    </Text>
                  </View>

                  <View style={styles.flexOne}>
                    <Text style={[styles.boldText, themeStyles.textColor]}>
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

      <View style={styles.priceSection}>
        <View style={styles.priceviewbox}>
          <View>
            <Text style={[styles.name, themeStyles.textColor]}>
              Total Price
            </Text>
            <Text style={styles.tax}>with VAT,SD</Text>
          </View>
          <QuantityStepper
            value={quantity}
            onDecrease={decreaseQty}
            onIncrease={increaseQty}
            valueStyle={themeStyles.quantityValue}
          />
          <Text style={[styles.price, themeStyles.textColor]}>
            ${totalPrice.toFixed(2)}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={handlePress}
        style={[styles.addtocart, themeStyles.buttonBackground]}
      >
        <Text style={styles.cart}>
          {isItemInCart ? 'Go to Cart' : 'Add to Cart'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollview: {
    flex: 1,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginTop: 20,
  },
  priceSection: {
    marginTop: 10,
  },
  reviewSummaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  profileAvatar: {
    backgroundColor: Colors.bgSoft,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexOne: {
    flex: 1,
    marginLeft: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  viewtop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  back: {
    width: 45,
    height: 45,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginHorizontal: 20,
    borderRadius: 25,
  },
  backtext: {
    fontSize: 30,
    color: Colors.black,
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
    color: Colors.textMuted,
    marginTop: 10,
  },
  view3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  price: {
    fontSize: 22,
    fontWeight: '400',
    color: Colors.black,
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
    color: Colors.textMuted,
  },
  reviewpassage: {
    fontSize: 13,
    padding: 10,
    color: Colors.textMedium,
    marginTop: 10,
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
    color: Colors.white,
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
