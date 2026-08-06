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
import { useTheme } from '../context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Routes } from '../utils';
import { useAppSelector } from '../hooks/redux';
import { formatPrice } from '../utils/format';

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
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backArrow}>←</Text>
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
                      Qty: {product.quantity} · ${product.price}
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