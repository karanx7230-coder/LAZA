import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';
import { useTheme } from '../context/ThemeContext';
export default observer(function Cart({ route, navigation }: any) {
  const { colors } = useTheme();
  const passedAddress = route?.params?.updatedaddress;
  const cart = useStore().cart;
  const shippingCost = cart.shippingCost;
  const subtotal = cart.subtotal;
  const totalAmount = cart.totalAmount;

  return (
    <View style={[styles.view, { backgroundColor: colors.background }]}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('MainTabs')}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.head, { color: colors.text }]}>My Cart</Text>
        <View style={styles.view1} />
      </View>

      {cart.items.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ fontSize: 18, color: 'gray' }}>
            Your cart is empty!
          </Text>
        </View>
      ) : (
        <FlatList
          data={cart.items}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
          renderItem={({ item }: any) => (
            <View style={styles.itemCard}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: item.thumbnail }}
                  resizeMode="cover"
                  style={styles.productimage}
                />
              </View>
              <View style={styles.detailsContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('wishlist')}
                >
                  <Text style={styles.itemName} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={styles.price}>${item.price}</Text>
                </TouchableOpacity>
                <View style={styles.priceviewbox}>
                  <TouchableOpacity
                    onPress={() => cart.decreaseQuantity(item.id)}
                    style={styles.qtyButton}
                  >
                    <Text style={styles.qtyIcon}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity || 1}</Text>
                  <TouchableOpacity
                    onPress={() => cart.increaseQuantity(item.id)}
                    style={styles.qtyButton}
                  >
                    <Text style={styles.qtyIcon}>+</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.deletetouch}
                    onPress={() => cart.removeFromCart(item.id)}
                  >
                    <Image
                      source={require('../assets/Delete.png')}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      )}

      <View style={styles.footerContainer}>
        <Text style={[styles.title, { color: colors.text }]}>
          Delivery Address
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('address')}>
          <View style={styles.row}>
            <Image
              source={require('../assets/map.png')}
              resizeMode="contain"
              style={styles.mapimage}
            />
            <View style={styles.adress}>
              <Text style={styles.adresshead}>
                {passedAddress
                  ? `${passedAddress.fullAddress}, ${passedAddress.country}`
                  : 'fufurinagar, cartoonnetwork 555'}
              </Text>
              <Text style={styles.adresssubhead}>
                {passedAddress
                  ? `${passedAddress.city}, ${passedAddress.name}`
                  : 'fufurinagar, cartoonnetwork 555'}
              </Text>
            </View>
            <Image
              source={require('../assets/Check.png')}
              resizeMode="contain"
              style={styles.tick}
            />
          </View>
        </TouchableOpacity>

        <Text style={[styles.title, { color: colors.text }]}>
          Payment Method
        </Text>
        <TouchableOpacity
          style={styles.row1}
          onPress={() => navigation.navigate('payment')}
        >
          <Image
            source={require('../assets/visa.png')}
            resizeMode="cover"
            style={styles.visa}
          />
          <View>
            <Text>Visa Classic</Text>
            <Text>**** 7640</Text>
          </View>
          <Image
            source={require('../assets/Check.png')}
            resizeMode="contain"
            style={styles.visatick}
          />
        </TouchableOpacity>

        <View>
          <Text style={[styles.title, { color: colors.text }]}>Order Info</Text>
          <View style={styles.inforow}>
            <Text style={{ color: colors.text }}>Subtotal</Text>
            <Text style={{ color: colors.text }}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.inforow}>
            <Text style={{ color: colors.text }}>Shipping Cost</Text>
            <Text style={{ color: colors.text }}>
              ${shippingCost.toFixed(2)}
            </Text>
          </View>
          <View style={styles.inforow}>
            <Text style={{ fontWeight: 'bold', color: colors.text }}>
              Total
            </Text>
            <Text style={{ fontWeight: 'bold', color: colors.text }}>
              ${totalAmount.toFixed(2)}
            </Text>
          </View>
        </View>

        <View>
          <TouchableOpacity
            style={styles.last}
            onPress={() => navigation.navigate('orderdone')}
          >
            <Text style={styles.lasttext}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});
const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
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
    marginLeft: 190,
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
    backgroundColor: '#8b5cf6',
    height: 50,
    marginVertical: 20,
    marginBottom: 1,
    marginHorizontal: -20,
  },
  lasttext: {
    alignSelf: 'center',
    padding: 10,
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
