import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  Alert,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks/redux';

import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Colors, Routes } from '../utils';
import { setAddress } from '../store/redux/slice/adressSlice';

export default function Address({ navigation, route }: any) {
  const Address = useAppSelector(state => state.address);
  const dispatch = useAppDispatch();
  const [isprimary, setasprimary] = useState(true);
  const { colors } = useTheme();
  const [name, setname] = useState(Address?.name);
  const [city, setcity] = useState(Address?.city);
  const [country, setcountry] = useState(Address?.country);
  const [phone, setphone] = useState(Address?.phone || '+91 ');
  const [fulladdress, setfulladdress] = useState(Address?.fulladdress || '');

  const handlePhoneChange = (text: string) => {
    setphone(text.slice(0, 13));
  };

  useEffect(() => {
    const loc = route.params?.savedLocation;
    if (loc) {
      setfulladdress(
        `Latitude: ${loc.latitude.toFixed(
          6,
        )}, Longitude: ${loc.longitude.toFixed(6)}`,
      );
    }
  }, [route.params?.savedLocation]);

  const handlecheckkout = () => {
    if (
      !name ||
      !city ||
      !country ||
      !phone ||
      !fulladdress ||
      phone.length < 13
    ) {
      Alert.alert('Please fill all the fields');
      return;
    }
    dispatch(setAddress({ name, city, country, phone, fulladdress }));
    navigation.navigate(Routes.MAIN_TABS, {
      screen: Routes.HOME_DRAWER,
      params: { screen: Routes.CART },
    });
  };

  return (
    <KeyboardAvoidingView
      style={[styles.mainview, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
          <Text style={[styles.head, { color: colors.text }]}>
            Phone-number
          </Text>
          <TextInput
            placeholder="+91 98781-64914"
            placeholderTextColor={'#959595'}
            style={styles.input}
            keyboardType="numeric"
            value={phone}
            onChangeText={handlePhoneChange}
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

        <TouchableOpacity
          //  onPress={checkLocationPermission}
          onPress={() => navigation.navigate(Routes.Track)}
        >
          <Image
            source={require('../assets/images/location.png')}
            resizeMode="contain"
            style={styles.card}
          />
          <Text
            style={[
              styles.headbtn,
              { color: colors.text, alignSelf: 'center' },
            ]}
          >
            Get Current Location
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <View>
        <TouchableOpacity style={styles.last} onPress={handlecheckkout}>
          <Text style={styles.lasttext}>Set address</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  mainview: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    flexGrow: 1,
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
    color: 'black',
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
    alignSelf: 'center',
    height: 300,
    width: 350,
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
  },
});
