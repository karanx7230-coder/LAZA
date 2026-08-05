import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Colors, Routes } from '../utils';
export default function Address({ navigation }: any) {
  const [isprimary, setasprimary] = useState(true);
  const { colors } = useTheme();
  const [name, setname] = useState('');
  const [city, setcity] = useState('');
  const [country, setcountry] = useState('');
  const [phone, setphone] = useState('');
  const [fulladdress, setfulladdress] = useState('');
  const handlecheckkout = () => {
    navigation.navigate(Routes.CART, {
      updatedaddress: {
        name,
        city,
        country,
        phone,
        fulladdress,
      },
    });
  };
  return (
    <View style={[styles.headview, { backgroundColor: colors.background }]}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.pagehead, { color: colors.text }]}>Address</Text>
      </View>
      <View>
        <Text style={[styles.head, { color: colors.text }]}>name</Text>
        <TextInput
          placeholder="mr you"
          placeholderTextColor={'#959595'}
          style={styles.input}
          value={name}
          onChangeText={setname}
        />
      </View>
      <View style={styles.row}>
        <View>
          <Text style={[styles.head, { color: colors.text }]}>City</Text>
          <TextInput
            placeholder="roper"
            placeholderTextColor={'#959595'}
            style={styles.input1}
            value={city}
            onChangeText={setcity}
          />
        </View>
        <View>
          <Text style={[styles.head, { color: colors.text }]}>Country</Text>
          <TextInput
            placeholder="furinagar"
            placeholderTextColor={'#959595'}
            style={styles.input1}
            value={country}
            onChangeText={setcountry}
          />
        </View>
      </View>
      <View>
        <Text style={[styles.head, { color: colors.text }]}>Phone-number</Text>
        <TextInput
          placeholder="+91 98781-64914"
          placeholderTextColor={'#959595'}
          style={styles.input}
          value={phone}
          onChangeText={setphone}
        />
      </View>
      <View>
        <Text style={[styles.head, { color: colors.text }]}>Address</Text>
        <TextInput
          placeholder="Chhatak, Sunamgonj 12/8AB"
          placeholderTextColor={'#959595'}
          style={styles.input}
          value={fulladdress}
          onChangeText={setfulladdress}
        />
      </View>
      <View style={styles.row2}>
        <Text style={[styles.headbtn, { color: colors.text }]}>
          save as primary address
        </Text>
        <Switch
          value={isprimary}
          onValueChange={setasprimary}
          thumbColor={'#ffffff'}
          trackColor={{ false: '#e0e0e0', true: '#3ac053' }}
        />
      </View>
      <View style={styles.card} />
      <View>
        <TouchableOpacity style={styles.last} onPress={handlecheckkout}>
          <Text style={styles.lasttext}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  headview: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    marginTop: 45,
    marginBottom: 20,
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
  pagehead: {
    paddingLeft: 110,
    marginTop: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
  head: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 20,
  },
  input: {
    backgroundColor: '#dbdbdb',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  input1: {
    backgroundColor: '#dbdbdb',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    width: 160,
    paddingHorizontal: 10,
  },
  headbtn: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 20,
    marginHorizontal: 30,
  },
  card: {
    marginBottom: 170,
  },
  last: {
	backgroundColor: Colors.primaryDark,
    height: 80,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  lasttext: {
    alignSelf: 'center',
    padding: 10,
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 100,
  },
});
