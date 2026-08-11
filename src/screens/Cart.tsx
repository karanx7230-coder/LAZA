import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Colors, Routes } from '../utils';
import { formatPrice } from '../utils/format';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '../store/redux/slice/cartSlice';
import { addOrder } from '../store/redux/slice/ordersSlice';
import QuantityStepper from '../components/QuantityStepper';
// import { useAppSelector } from '../hooks/redux';

export default function Cart({ navigation }: any) {
  const { isDarkMode, colors } = useTheme();
  const dispatch = useAppDispatch();
  // const passedAddress = route?.params?.updatedaddress;
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

  return (
    <View style={[styles.view, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <View style={[styles.headerRow, styles.sectionPad]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate(Routes.MAIN_TABS)}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.head, { color: colors.text }]}>My Cart</Text>
        <View style={styles.view1} />
      </View>

      <FlatList
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
                    source={require('../assets/images/Delete.png')}
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
                  source={require('../assets/images/map.png')}
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
                    source={require('../assets/images/Check.png')}
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
                source={require('../assets/images/visa.png')}
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
                  source={require('../assets/images/Check.png')}
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
          </View>
        }
      />
      <TouchableOpacity
        style={styles.last}
        onPress={() => {
          if (!hasAddress || !hascard || items.length === 0) {
            console.log('CHECKOUT BLOCKED:', {
              hasAddress,
              hascard,
              cartItems: items.length,
            });
            return;
          }

          console.log('========== ORDER DATA ==========');
          console.log('ORDER ID:', Date.now().toString());
          console.log('ITEMS:', items);
          console.log('SUBTOTAL:', subtotal);
          console.log('SHIPPING:', shippingCost);
          console.log('TOTAL:', totalAmount);
          console.log('DATE:', new Date().toISOString());
          console.log('STATUS:', 'Placed');
          console.log(
            'SHIPPING ADDRESS:',
            Address!.name,
            Address?.city,
            Address?.country,
            Address?.fulladdress,
            Address?.phone,
          );
          console.log('PAYMENT:', card!.owner, card!.card_number);
          console.log('========== FULL ORDER ==========');
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
          console.log('✅ addOrder dispatched');
          dispatch(clearCart());
          navigation.replace(Routes.ORDER_DONE);
        }}
      >
        <Text style={styles.lasttext}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
  },
  sectionPad: {
    marginHorizontal: 20,
  },
  priceviewbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  view1: {
    width: 50,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  head: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 30,
  },
  backButton: {
    width: 50,
    height: 50,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  backArrow: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  itemCard: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderColor: '#fafafa',
    borderWidth: 2,
    borderRadius: 20,
    padding: 4,
  },
  imageContainer: {
    backgroundColor: '#f4f5f9',
    borderRadius: 12,
    marginRight: 15,
  },
  productimage: {
    height: 100,
    width: 100,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#9ba0a5',
  },
  footerContainer: {
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  mapimage: {
    height: 60,
    width: 60,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  adress: {
    flex: 1,
    paddingHorizontal: 10,
  },
  adresshead: {
    fontSize: 16,
  },
  adresssubhead: {
    color: '#b4b4b4',
  },
  tick: {
    width: 25,
    height: 25,
    margin: 10,
  },
  visatick: {
    width: 25,
    height: 25,
    margin: 10,
    marginLeft: 150,
  },
  deletetouch: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#3a3a3a',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
    alignSelf: 'flex-end',
  },
  visa: {
    height: 50,
    width: 50,
    borderRadius: 10,
  },
  inforow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  last: {
    backgroundColor: Colors.primaryDark,
    height: 55,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 0,
  },
  lasttext: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
  row1: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
});
