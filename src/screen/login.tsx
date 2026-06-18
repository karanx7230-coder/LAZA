import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

import auth from '@react-native-firebase/auth';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
export default function Signin({ navigation }: any) {
  const [isRemembered, setIsRemembered] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [usernameFocused, setusernameFocused] = useState(false);
  const [passwordFocused, setpasswordFocused] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please enter your email and password.');
      return;
    }

    setLoading(true);

    try {
      await auth().signInWithEmailAndPassword(email, password);
      console.log('Logged in successfully!');

      navigation.navigate('MainTabs');
    } catch (error: any) {
      if (
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/invalid-credential'
      ) {
        Alert.alert('Login Failed', 'Incorrect email or password.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Invalid Email', 'Please enter a valid email address.');
      } else {
        Alert.alert('Error', error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.login, { backgroundColor: colors.background }]}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backtext}> ← </Text>
          </TouchableOpacity>
          <Text style={[styles.signup, { color: colors.text }]}>Welcome</Text>
          <Text style={styles.line1}>Please enter your data to continue</Text>
          <View style={styles.textinput}>
            <Text style={[styles.type, { color: colors.text }]}>E mail</Text>
            <View style={styles.line}>
              <TextInput
                onFocus={() => setusernameFocused(true)}
                onBlur={() => setusernameFocused(false)}
                style={[
                  styles.input,
                  { borderBottomColor: usernameFocused ? 'blue' : 'grey' },
                ]}
                value={email}
                onChangeText={setEmail} 
                autoCapitalize="none" 
                keyboardType="email-address"
              />
            </View>
          </View>
          <View style={styles.textinput}>
            <Text style={[styles.type, { color: colors.text }]}>Password</Text>
            <View style={styles.line}>
              <TextInput
                onFocus={() => setpasswordFocused(true)}
                onBlur={() => setpasswordFocused(false)}
                style={[
                  styles.input,
                  { borderBottomColor: passwordFocused ? 'blue' : 'grey' },
                ]}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                autoCapitalize='none'
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
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate('forget1')}
                style={styles.forgotbtn}
              >
                <Text style={styles.forget}>Forget Password?</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.rememberRow}>
            <Text style={[styles.rememberText, { color: colors.text }]}>
              Remember me
            </Text>
            <Switch
              value={isRemembered}
              onValueChange={setIsRemembered}
              trackColor={{ false: 'grey', true: 'green' }}
              thumbColor="white"
            />
          </View>
          <View style={styles.endview}>
            <Text style={[styles.endline, { color: colors.text }]}>
              By connecting your account confirm that you agree with our
              <Text style={styles.term}> Term and Condition</Text>
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleLogin}
            style={styles.signupButton}
            disabled={loading}
          >{loading ?(<ActivityIndicator color={"#ffffff"} size={"large"}/>

          ):(
            <Text style={styles.signupButtonText}>Login</Text>
           ) }
            </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  back: {
    width: 50,
    height: 50,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 30,
    fontWeight: 'bold',
  },
  backtext: {
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    lineHeight: 30,
  },
  signup: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 0,
    color: '#111',
  },
  line1: {
    fontSize: 15,
    color: '#989898',
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 200,
  },
  textinput: {
    marginBottom: 25,
  },
  type: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 10,
  },
  line: {
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
    padding: 0,

    borderBottomWidth: 1,
  },
  rememberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  forgotbtn: {
    marginLeft: 'auto',
  },
  forget: {
    color: 'red',
  },
  rememberText: {
    fontSize: 16,
    color: '#4b4c4d',
  },
  term: {
    fontWeight: 'bold',
    color: '#0000',
  },
  endview: {
    bottom: 100,
    position: 'absolute',
    marginHorizontal: 20,
  },
  endline: {
    fontSize: 14,
    color: '#464646',
  },
  signupButton: {
    backgroundColor: '#8b5cf6',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 20,
    alignItems: 'center',
    marginHorizontal: -20,
  },
  signupButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
