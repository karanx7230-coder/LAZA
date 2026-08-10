import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Colors, Routes } from '../utils';
import Btn from '../components/basiccomponents';

export default function OrderDone({ navigation }: any) {
  const { colors } = useTheme();

  return (
    <View style={[styles.view, { backgroundColor: colors.background }]}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <Image
        source={require('../assets/images/confirm.png')}
        style={styles.imageconfirm}
      />

      <Text style={styles.head}>Order Confirmed!</Text>
      <Text style={styles.line}>
        Your order has been confirmed, we will send you confirmation email
        shortly.
      </Text>
      <TouchableOpacity
        style={styles.addnew}
        onPress={() => navigation.replace(Routes.ORDER)}
      >
        <Text style={styles.addtext}>Go to Orders</Text>
      </TouchableOpacity>
      <Btn
        onPress={() => navigation.replace(Routes.MAIN_TABS)}
        title="Continue Shopping"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  head: {
    fontSize: 35,
    alignSelf: 'center',
  },
  backButton: {
    width: 50,
    height: 50,
    backgroundColor: '#dad7d766',
    alignItems: 'center',
    padding: 8,
    marginTop: 20,
    borderRadius: 30,
    marginLeft: 10,
  },
  backArrow: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#282828',
  },
  imageconfirm: {
    margin: 50,
  },

  line: {
    color: '#898484',
    padding: 20,
    paddingHorizontal: 45,
    alignItems: 'center',
  },
  confirmbtn: {
    backgroundColor: Colors.primaryDark,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 20,
    alignItems: 'center',
    marginTop: 180,
    marginHorizontal: -20,
  },
  confirmtext: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  addnew: {
    backgroundColor: '#a3a3a32a',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 120,
    left: 20,
    right: 20,
  },

  addtext: {
    color: '#797979',
    fontSize: 16,
    fontWeight: '600',
  },
});
