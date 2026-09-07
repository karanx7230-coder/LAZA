import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Routes } from '../../utils';
import { formatPrice } from '../../utils/format';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '../../store/redux/slice/cartSlice';
import { addOrder } from '../../store/redux/slice/ordersSlice';
import QuantityStepper from '../../components/product/QuantityStepper';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './Cart.styles';

export default function Cart({ navigation }: any) {
  const [isReady, setIsReady] = useState(false);
  const { isDarkMode, colors } = useTheme();
  const dispatch = useAppDispatch();
  const shippingCost = 5;
  const items = useAppSelector(state => state.cart.items);

  const subtotal = items.reduce(
    (accumulator, item) => accumulator + item.price * item.quantity,
    0,
  );
  const totalAmount = subtotal + shippingCost;
  const Address = useAppSelector(state => state.address);
  const hasAddress = !!Address?.name?.trim();
  const card = useAppSelector(state => state.card);
  const hascard = !!card?.owner?.trim();
  useEffect(() => {
    if (items.length > 0 && hasAddress && hascard) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [items, hasAddress, hascard]);
  return (
    <SafeAreaView style={[styles.view, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      <FlatList
        ListHeaderComponent={
          <View style={[styles.headerRow, styles.sectionPad]}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate(Routes.MAIN_TABS)}
            >
              <Text style={styles.backArrow}>â†</Text>
            </TouchableOpacity>
            <Text style={[styles.head, { color: colors.text }]}>My Cart</Text>
            <View style={styles.view1} />
          </View>
        }
        data={items}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        contentContainerStyle={
          items.length === 0
            ? { flexGrow: 1, justifyContent: 'center' }
            : undefined
        }
        renderItem={({ item }: any) => (
          <View style={[styles.itemCard, styles.sectionPad]}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item.thumbnail }}
                resizeMode="cover"
                style={styles.productimage}
              />
            </View>
            <View style={styles.detailsContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate(Routes.WISHLIST)}
              >
                <Text style={styles.itemName} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.price}>${item.price}</Text>
              </TouchableOpacity>
              <View style={styles.priceviewbox}>
                <QuantityStepper
                  value={item.quantity || 1}
                  onDecrease={() => dispatch(decreaseQuantity(item.id))}
                  onIncrease={() => dispatch(increaseQuantity(item.id))}
                />
              </View>
              <View>
                <TouchableOpacity
                  style={styles.deletetouch}
                  onPress={() => dispatch(removeFromCart(item.id))}
                >
                  <Image
                    source={require('../../assets/images/Delete.png')}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View
            style={[
              { flex: 1, justifyContent: 'center', alignItems: 'center' },
              styles.sectionPad,
            ]}
          >
            <Text style={{ fontSize: 18, color: 'gray', fontWeight: '200' }}>
              Your cart is empty!
            </Text>
          </View>
        }
        ListFooterComponent={
          <View style={styles.footerContainer}>
            <Text
              style={[styles.title, styles.sectionPad, { color: colors.text }]}
            >
              Delivery Address
            </Text>
            <TouchableOpacity
              style={styles.sectionPad}
              onPress={() => navigation.navigate(Routes.ADDRESS)}
            >
              <View style={styles.row}>
                <Image
                  source={require('../../assets/images/map.png')}
                  resizeMode="contain"
                  style={styles.mapimage}
                />
                {hasAddress ? (
                  <View style={styles.adress}>
                    <Text style={styles.adresshead}>
                      {Address?.name}, {Address?.city}, {Address?.country}
                    </Text>
                    <Text style={styles.adresssubhead}>
                      {Address?.fulladdress}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.adress}>
                    <Text style={styles.adresshead}>
                      Tap to fill the adress
                    </Text>
                  </View>
                )}
                {hasAddress && (
                  <Image
                    source={require('../../assets/images/Check.png')}
                    resizeMode="contain"
                    style={styles.tick}
                  />
                )}
              </View>
            </TouchableOpacity>
            <Text
              style={[styles.title, styles.sectionPad, { color: colors.text }]}
            >
              Payment Method
            </Text>
            <TouchableOpacity
              style={[styles.row1, styles.sectionPad]}
              onPress={() => navigation.navigate(Routes.PAYMENT)}
            >
              <Image
                source={require('../../assets/images/visa.png')}
                resizeMode="cover"
                style={styles.visa}
              />
              {hascard ? (
                <View>
                  <View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text>{card?.owner}</Text>
                    </View>
                    <Text>
                      ****
                      {card?.card_number?.replace(/\s/g, '').slice(-4)}
                    </Text>
                  </View>
                </View>
              ) : (
                <View>
                  <View>
                    <Text>fill the card details</Text>
                  </View>
                </View>
              )}
              {hascard && (
                <Image
                  source={require('../../assets/images/Check.png')}
                  resizeMode="contain"
                  style={styles.visatick}
                />
              )}
            </TouchableOpacity>

            <View style={styles.sectionPad}>
              <Text style={[styles.title, { color: colors.text }]}>
                Order Info
              </Text>
              <View style={styles.inforow}>
                <Text style={{ color: colors.text }}>Subtotal</Text>
                <Text style={{ color: colors.text }}>
                  {formatPrice(subtotal)}
                </Text>
              </View>
              <View style={styles.inforow}>
                <Text style={{ color: colors.text }}>Shipping Cost</Text>
                <Text style={{ color: colors.text }}>
                  {formatPrice(shippingCost)}
                </Text>
              </View>
              <View style={styles.inforow}>
                <Text style={{ fontWeight: 'bold', color: colors.text }}>
                  Total
                </Text>
                <Text style={{ fontWeight: 'bold', color: colors.text }}>
                  {formatPrice(totalAmount)}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.last,
                !isReady && { backgroundColor: '#8a5cf665' },
              ]}
              onPress={() => {
                if (items.length === 0) {
                  Alert.alert(
                    'Cart is Empty',
                    'Please add at least one product to your cart before checkout.',
                  );
                  return;
                }

                if (!hasAddress) {
                  Alert.alert(
                    'Address Required',
                    'Please add a shipping address before checkout.',
                  );
                  return;
                }

                if (!hascard) {
                  Alert.alert(
                    'Card Required',
                    'Please add a payment card before checkout.',
                  );
                  return;
                }
                dispatch(
                  addOrder({
                    id: Date.now().toString(),

                    items,

                    subtotal,

                    shipping: shippingCost,

                    total: totalAmount,

                    date: new Date().toISOString(),

                    status: 'Placed',

                    shippingAddress: {
                      name: Address!.name,
                      city: Address!.city,
                      country: Address!.country,
                      phone: Address!.phone,
                      fulladdress: Address!.fulladdress,
                    },

                    payment: {
                      owner: card!.owner,
                      last4: card!.card_number.replace(/\s/g, '').slice(-4),
                    },
                  }),
                );
                dispatch(clearCart());
                navigation.replace(Routes.ORDER_DONE);
              }}
            >
              <Text style={styles.lasttext}>Checkout</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
}

