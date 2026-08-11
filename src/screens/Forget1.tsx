import {
  View,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  Text,
  TextInput,
  StatusBar,
} from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Colors, Routes } from '../utils';
import Btn from '../components/basiccomponents';
export default function Forget1({ navigation }: any) {
  const { isDarkMode, colors } = useTheme();

  const [emailFocused, setemailFocused] = useState(false);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.view, { backgroundColor: colors.background }]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.head, { color: colors.text }]}>
            Forget Password
          </Text>
          <Image
            source={require('../assets/images/biglock.png')}
            resizeMode="contain"
           />
          <View style={styles.input}>
            <Text style={[styles.heade, { color: colors.text }]}>
              Email address
            </Text>
            <TextInput
              onFocus={() => setemailFocused(true)}
              onBlur={() => setemailFocused(false)}
              style={[
                styles.email,
                { borderColor: emailFocused ? 'blue' : 'grey' },
              ]}
              placeholderTextColor={'black'}
             />
          </View>
          <Text style={styles.line}>
            Please write your email to receive a confirmation code to set a new
            password.
          </Text>
          <Btn
            onPress={() => navigation.navigate(Routes.OTP)}
            title="Confirm Email"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  view: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  head: {
    fontSize: 35,
    marginLeft: 30,
    marginStart: 50,
  },
  backButton: {
    width: 50,
    height: 50,
    backgroundColor: '#dfdfdfd7',
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
  input: {
    padding: 30,
  },
  heade: {
    color: '#898484',
  },
  email: {
    borderBottomWidth: 2,
    padding: 10,
  },
  line: {
    marginTop: 130,
    color: '#898484',
    padding: 20,
    paddingHorizontal: 45,
    alignItems: 'center',
  },
  otpButton: {
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
  otpText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
