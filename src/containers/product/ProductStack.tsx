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
import React, { useState, useMemo } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useGetProductQuery } from '../../api/api';
import { Colors, Routes } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addToCart } from '../../store/redux/slice/cartSlice';
import QuantityStepper from '../../components/product/QuantityStepper';

import styles from './ProductStack.styles';

export default function Productstack({ route, navigation }: any) {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const productId = route?.params?.id;
  const {
    data: productData,
    isLoading,
    isError,
  } = useGetProductQuery(productId, {
    skip: !productId,
  });
  const [quantity, setQuantity] = useState(1);
  const isItemInCart = useAppSelector(state =>
    state.cart.items.some(item => item.id === productData?.id),
  );
  const isOutOfStock =
    productData?.stock === 0 ||
    productData?.availabilityStatus === 'Out of Stock';

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
          backgroundColor: isOutOfStock
            ? '#c9c9c9'
            : isItemInCart
            ? '#3281ffa7'
            : Colors.primary,
        },
        quantityValue: {
          color: colors.text,
        },
      }),
    [colors.background, colors.text, isItemInCart, isOutOfStock],
  );

  if (isLoading || !productData) {
    return (
      <View style={[styles.screen, styles.loading]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  if (isError) {
    return (
      <View style={[styles.screen, styles.loading]}>
        <Text>check your internet</Text>
      </View>
    );
  }
  const decreaseQty = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };
  const increaseQty = () => setQuantity(prev => prev + 1);

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
              <Text style={styles.backtext}> â† </Text>
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
                source={require('../../assets/images/Cart.png')}
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
        disabled={isOutOfStock}
        style={[styles.addtocart, themeStyles.buttonBackground]}
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
  );
}


