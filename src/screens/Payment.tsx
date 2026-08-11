import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Switch,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Colors, Routes } from '../utils';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setcard } from '../store/redux/slice/cardSlice';

export default function Payment({ navigation }: any) {
  const card = useAppSelector(state => state.card);
  const dispatch = useAppDispatch();
  const { colors } = useTheme();

  const [isrememberd, setIsRemembered] = useState(true);
  const [owner, setowner] = useState(card?.owner || '');
  const [card_number, setcard_number] = useState(card?.card_number || '');
  const [exp, setexp] = useState(card?.exp || '');
  const [cvv, setcvv] = useState(card?.cvv || '');

  const handleCardNumberChange = (text: string) => {
    // digits only, formatted in groups of 4, capped at 16 digits (19 chars incl. spaces)
    const digits = text.replace(/\D/g, '').slice(0, 16);
    const formatted = digits.replace(/(.{4})/g, '$1 ').trim();
    setcard_number(formatted);
  };

  const handleExpChange = (text: string) => {
    // digits only, formatted as MM/YY
    const digits = text.replace(/\D/g, '').slice(0, 4);
    const formatted =
      digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    setexp(formatted);
  };

  const handleSave = () => {
    if (
      !owner ||
      !card_number ||
      !exp ||
      !cvv ||
      card_number.replace(/\s/g, '').length < 16 ||
      exp.length < 5 ||
      cvv.length < 3
    ) {
      Alert.alert('Please fill all the fields correctly');
      return;
    }
    console.log(card);

    dispatch(setcard({ owner, card_number, exp, cvv }));

    navigation.replace(Routes.MAIN_TABS, {
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
          <Text style={[styles.pagehead, { color: colors.text }]}>Payment</Text>
        </View>

        <Image
          source={require('../assets/images/Card.png')}
          resizeMode="contain"
          style={styles.imagecard}
        />

        <TouchableOpacity
          style={styles.addnew}
          onPress={() => navigation.navigate(Routes.ADD_CARD)}
        >
          <Image
            source={require('../assets/images/Plus.png')}
            style={styles.imgplus}
          />
          <Text style={styles.addtext}>Add new card</Text>
        </TouchableOpacity>

        <View>
          <Text style={[styles.head, { color: colors.text }]}>Card owner</Text>
          <TextInput
            placeholder="Mrh Raju"
            placeholderTextColor={'#959595'}
            style={styles.input}
            value={owner}
            onChangeText={setowner}
          />
        </View>

        <View>
          <Text style={[styles.head, { color: colors.text }]}>Card number</Text>
          <TextInput
            placeholder="5254 7634 8734 7690"
            placeholderTextColor={'#959595'}
            style={styles.input}
            keyboardType="numeric"
            value={card_number}
            onChangeText={handleCardNumberChange}
            maxLength={19}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.input2}>
            <Text style={[styles.head, { color: colors.text }]}>EXP</Text>
            <TextInput
              placeholder="05/28"
              placeholderTextColor={'#959595'}
              style={styles.input1}
              keyboardType="numeric"
              value={exp}
              onChangeText={handleExpChange}
              maxLength={5}
            />
          </View>
          <View style={styles.input2}>
            <Text style={[styles.head, { color: colors.text }]}>CVV</Text>
            <TextInput
              placeholder="763"
              placeholderTextColor={'#959595'}
              style={styles.input1}
              keyboardType="numeric"
              secureTextEntry
              value={cvv}
              onChangeText={text => setcvv(text.replace(/\D/g, '').slice(0, 4))}
              maxLength={4}
            />
          </View>
        </View>

        <View style={styles.head1}>
          <Text style={[styles.head, { color: colors.text }]}>
            Save card info
          </Text>
          <Switch
            value={isrememberd}
            onValueChange={setIsRemembered}
            trackColor={{ false: '#d3d3d3', true: '#41b1008e' }}
          />
        </View>
      </ScrollView>

      <View>
        <TouchableOpacity style={styles.last} onPress={handleSave}>
          <Text style={styles.lasttext}>Save Card</Text>
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
    paddingHorizontal: 20,
    paddingBottom: 100, // clears the absolute-positioned button
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 45,
    marginBottom: 10,
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
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  head: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
    color: 'black',
  },
  imagecard: {
    marginVertical: 20,
    alignSelf: 'center',
    width: '100%',
    height: 200,
  },
  addnew: {
    backgroundColor: Colors.primarySoft,
    borderColor: '#c77af3',
    borderWidth: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  imgplus: {
    marginRight: 8,
  },
  addtext: {
    color: '#a85cff',
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 15,
    height: 50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input2: {
    flex: 1,
    marginRight: 5,
  },
  input1: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginTop: 5,
    height: 50,
    paddingHorizontal: 15,
  },
  head1: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontSize: 18,
    fontWeight: '600',
  },
});
