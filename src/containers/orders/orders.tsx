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
import { useTheme } from '../../context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Routes } from '../../utils';
import { useAppSelector } from '../../hooks/redux';
import { formatPrice } from '../../utils/format';
import { OrderStatus } from '../../types';

const statusColors: Record<OrderStatus, string> = {
  Placed: '#f0a500',
  Processing: '#3b82f6',
  Shipped: '#8b5cf6',
  Delivered: '#22c55e',
  Cancelled: '#ef4444',
};

export default function Orders({ navigation }: any) {
  const orders = useAppSelector(state => state.orders.orders);

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

  if (orders.length === 0) {
    return (
      <View style={styles.center}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
          translucent
        />
        <Text style={styles.emptyText}>Your Orders is Empty!</Text>
      </View>
    );
  }

  return (
    <View style={pageStyle}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.replace(Routes.MAIN_TABS)}
            style={styles.backButton}
          >
            <Text style={styles.backArrow}>â†</Text>
          </TouchableOpacity>
          <Text style={titleTextStyle}>Orders</Text>
          <View style={styles.headerSpacer} />
        </View>

        <FlatList
          data={orders}
          contentContainerStyle={styles.flatListContent}
          keyExtractor={order => order.id.toString()}
          renderItem={({ item: order }) => (
            <TouchableOpacity
              style={styles.orderCard}
              //   onPress={() =>
              //     navigation.navigate(Routes.ORDER_DETAILS, { order })
              //   }
            >
              <View style={styles.orderTopRow}>
                <Text style={styles.orderId}>
                  Order #{order.id.toString().slice(-6)}
                </Text>
                <Text style={styles.orderDate}>
                  {new Date(order.date).toLocaleDateString()}
                </Text>
              </View>

              {order.status && (
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: `${statusColors[order.status]}20` },
                  ]}
                >
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: statusColors[order.status] },
                    ]}
                  />
                  <Text
                    style={[
                      styles.statusText,
                      { color: statusColors[order.status] },
                    ]}
                  >
                    {order.status}
                  </Text>
                </View>
              )}

              {order.items.slice(0, 2).map((product: any) => (
                <View key={product.id} style={styles.item}>
                  <Image
                    source={{ uri: product.thumbnail }}
                    style={styles.img}
                  />
                  <View style={styles.itemTextWrapper}>
                    <Text style={styles.name} numberOfLines={1}>
                      {product.title}
                    </Text>
                    <Text style={styles.price}>
                      Qty: {product.quantity} Â· ${product.price}
                    </Text>
                  </View>
                </View>
              ))}

              {order.items.length > 2 && (
                <Text style={styles.moreText}>
                  +{order.items.length - 2} more item
                  {order.items.length - 2 > 1 ? 's' : ''}
                </Text>
              )}

              {order.shippingAddress && (
                <View style={styles.infoBlock}>
                  <Text style={styles.infoLabel}>Shipping to</Text>
                  <Text style={styles.infoValue} numberOfLines={1}>
                    {order.shippingAddress.name}, {order.shippingAddress.city},{' '}
                    {order.shippingAddress.country}
                  </Text>
                  <Text style={styles.infoSubValue} numberOfLines={1}>
                    {order.shippingAddress.fulladdress}
                  </Text>
                </View>
              )}

              {order.payment && (
                <View style={styles.infoBlock}>
                  <Text style={styles.infoLabel}>Payment</Text>
                  <Text style={styles.infoValue}>
                    {order.payment.owner} Â· â€¢â€¢â€¢â€¢ {order.payment.last4}
                  </Text>
                </View>
              )}

              <View style={styles.divider} />

              {typeof order.subtotal === 'number' && (
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabel}>Subtotal</Text>
                  <Text style={styles.breakdownValue}>
                    {formatPrice(order.subtotal)}
                  </Text>
                </View>
              )}
              {typeof order.shipping === 'number' && (
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabel}>Shipping</Text>
                  <Text style={styles.breakdownValue}>
                    {formatPrice(order.shipping)}
                  </Text>
                </View>
              )}

              <View style={styles.orderFooter}>
                <Text style={styles.itemCount}>
                  {order.items.length} item
                  {order.items.length > 1 ? 's' : ''}
                </Text>
                <Text style={styles.totalPrice}>
                  {formatPrice(order.total)}
                </Text>
              </View>
            </TouchableOpacity>
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
  container: {
    flex: 1,
    paddingHorizontal: 20,
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
  },
  orderCard: {
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  orderTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  orderDate: {
    fontSize: 12,
    color: Colors.textMedium,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  img: {
    width: 55,
    height: 55,
    marginRight: 12,
    borderRadius: 10,
    backgroundColor: '#f4f4f4',
  },
  itemTextWrapper: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  price: {
    fontSize: 13,
    color: Colors.textMedium,
    marginTop: 3,
  },
  moreText: {
    fontSize: 13,
    color: Colors.textMedium,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  infoBlock: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
  },
  infoLabel: {
    fontSize: 11,
    color: Colors.textMedium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 13,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  infoSubValue: {
    fontSize: 12,
    color: Colors.textMedium,
    marginTop: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginTop: 10,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  breakdownLabel: {
    fontSize: 13,
    color: Colors.textMedium,
  },
  breakdownValue: {
    fontSize: 13,
    color: Colors.textPrimary,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  itemCount: {
    fontSize: 13,
    color: Colors.textMedium,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
  },
});
// const handleClearData = async () => {
//   await persistor.purge(); // clears the persisted AsyncStorage data
//   await persistor.flush(); // ensures the purge is written immediately
// };