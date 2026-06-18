import {
  View,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Text,
  TextInput,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function NewPassword({ navigation }: any) {
  const [passwordFocused, setpasswordFocused] = useState(false);
  const [confirmpasswordFocused, setconfirmpasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const {isDarkMode,toggleTheme,colors}=useTheme();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleConfirm = () => {
    if (password === '' || confirmPassword === '') {
      setErrorMessage('Please fill in both fields.');
    } else {
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match!');
      } else {
        setErrorMessage('');
        console.log('Success! Passwords match.');
        navigation.navigate('home');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1,backgroundColor:colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.view,{backgroundColor:colors.background}]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.head,{color:colors.text}]}>New Password</Text>
          <Text style={[styles.heade,{color:colors.text}]}>Password</Text>
          <View style={styles.input}>
            <TextInput
              onFocus={() => setpasswordFocused(true)}
              onBlur={() => setpasswordFocused(false)}
              style={[
                styles.password,
                { borderColor: passwordFocused ? 'blue' : 'grey' },
              ]}
              placeholderTextColor={'black'}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={text => {
                setPassword(text);
                setErrorMessage('');
              }}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={{
                  uri: showPassword
                    ? 'https://cdn-icons-png.flaticon.com/512/709/709612.png'
                    : 'https://cdn-icons-png.flaticon.com/512/565/565655.png',
                }}
                style={{
                  marginRight: 10,
                  width: 24,
                  height: 24,
                  marginLeft: -25,
                  marginBottom: 10,
                }}
              />
            </TouchableOpacity>
          </View>
          <Text style={[styles.heade,{color:colors.text}]}>Confirm password</Text>
          <View style={styles.input}>
            <TextInput
              onFocus={() => setconfirmpasswordFocused(true)}
              onBlur={() => setconfirmpasswordFocused(false)}
              style={[
                styles.password,
                { borderColor: confirmpasswordFocused ? 'blue' : 'grey' },
              ]}
              placeholderTextColor={'black'}
              secureTextEntry={!showconfirmPassword}
              value={confirmPassword}
              onChangeText={text => {
                setConfirmPassword(text);
                setErrorMessage('');
              }}
            />
            <TouchableOpacity
              onPress={() => setShowconfirmPassword(!showconfirmPassword)}
            >
              <Image
                source={{
                  uri: showconfirmPassword
                    ? 'https://cdn-icons-png.flaticon.com/512/709/709612.png'
                    : 'https://cdn-icons-png.flaticon.com/512/565/565655.png',
                }}
                style={{
                  marginRight: 10,
                  width: 24,
                  height: 24,
                  marginLeft: -25,
                  marginBottom: 10,
                }}
              />
            </TouchableOpacity>
          </View>

          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}

          <Text style={styles.line}>Please set a new password.</Text>

          <TouchableOpacity onPress={handleConfirm} style={styles.otpButton}>
            <Text style={styles.otpText}>Confirm password</Text>
          </TouchableOpacity>
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
    backgroundColor: '#00000022',
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
    paddingBottom: 10,
    flexDirection: 'row',
  },
  heade: {
    color: '#898484',
    marginLeft: 30,
  },
  password: {
    borderBottomWidth: 2,
    padding: 5,
    color: 'black',
    width: 300,
  },
  line: {
    marginTop: 80,
    color: '#9b9b9b',
    padding: 20,
    paddingHorizontal: 45,
    alignItems: 'center',
    textAlign: 'center',
  },
  otpButton: {
    backgroundColor: '#8b5cf6',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 20,
    alignItems: 'center',
  },
  otpText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },

  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  },
});
