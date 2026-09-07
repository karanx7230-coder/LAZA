import React, { useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Routes } from '../../utils';
import { useAppSelector } from '../../hooks/redux';
import { formatPrice } from '../../utils/format';
import { OrderStatus } from '../../types';

import styles from './orders.styles';

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


// const handleClearData = async () => {
//   await persistor.purge(); // clears the persisted AsyncStorage data
//   await persistor.flush(); // ensures the purge is written immediately
// };