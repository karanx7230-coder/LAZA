import React, { useMemo, useState } from 'react';
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
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Routes } from '../utils';

export default function Signin({ navigation }: any) {
  const [isRemembered, setIsRemembered] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [usernameFocused, setusernameFocused] = useState(false);
  const [passwordFocused, setpasswordFocused] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { isDarkMode, colors } = useTheme();

  const themeStyles = useMemo(
    () =>
      StyleSheet.create({
        background: {
          backgroundColor: colors.background,
        },
        textColor: {
          color: colors.text,
        },
      }),
    [colors.background, colors.text],
  );

  const emailInputStyle = [
    styles.input,
    usernameFocused ? styles.inputFocused : styles.inputBlurred,
  ];

  const passwordInputStyle = [
    styles.input,
    passwordFocused ? styles.inputFocused : styles.inputBlurred,
  ];

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please enter your email and password.');
      return;
    }

    setLoading(true);

    try {
      await auth().signInWithEmailAndPassword(email, password);
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
    <SafeAreaView style={[styles.safeArea, themeStyles.background]}>
      <KeyboardAvoidingView
        style={[styles.keyboard, themeStyles.background]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
          translucent
        />
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[styles.login, themeStyles.background]}>
            <TouchableOpacity
              style={styles.back}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backtext}> ← </Text>
            </TouchableOpacity>
            <Text style={[styles.signup, themeStyles.textColor]}>Welcome</Text>
            <Text style={styles.line1}>Please enter your data to continue</Text>
            <View style={styles.spacer} />
            <View style={styles.textinput}>
              <Text style={[styles.type, themeStyles.textColor]}>E mail</Text>
              <View style={styles.line}>
                <TextInput
                  onFocus={() => setusernameFocused(true)}
                  onBlur={() => setusernameFocused(false)}
                  style={emailInputStyle}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>
            <View style={styles.textinput}>
              <Text style={[styles.type, themeStyles.textColor]}>Password</Text>
              <View style={styles.line}>
                <TextInput
                  onFocus={() => setpasswordFocused(true)}
                  onBlur={() => setpasswordFocused(false)}
                  style={passwordInputStyle}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Image
                    source={{
                      uri: showPassword
                        ? 'https://cdn-icons-png.flaticon.com/512/709/709612.png'
                        : 'https://cdn-icons-png.flaticon.com/512/565/565655.png',
                    }}
                    style={styles.passwordIcon}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate(Routes.FORGET)}
                  style={styles.forgotbtn}
                >
                  <Text style={styles.forget}>Forget Password?</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.rememberRow}>
              <Text style={[styles.rememberText, themeStyles.textColor]}>
                Remember me
              </Text>
              <Switch
                value={isRemembered}
                onValueChange={setIsRemembered}
                trackColor={{ false: 'grey', true: 'green' }}
                thumbColor="white"
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={[styles.footer, themeStyles.background]}>
        <View style={styles.endview}>
          <Text style={[styles.endline, themeStyles.textColor]}>
            By connecting your account confirm that you agree with our
            <Text style={styles.term}> Term and Condition</Text>
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.signupButton}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={Colors.white} size="large" />
          ) : (
            <Text style={styles.signupButtonText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
  },
  login: {
    flex: 1,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  spacer: {
    flex: 0.4,
  },
  back: {
    width: 50,
    height: 50,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  backtext: {
    fontSize: 40,
    color: Colors.black,
    textAlign: 'center',
  },
  signup: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 0,
  },
  line1: {
    fontSize: 15,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 0,
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
    color: Colors.textPrimary,
    fontWeight: '500',
    padding: 0,
    borderBottomWidth: 1,
  },
  inputFocused: {
    borderBottomColor: 'blue',
  },
  inputBlurred: {
    borderBottomColor: 'grey',
  },
  passwordIcon: {
    marginRight: 10,
    width: 24,
    height: 24,
    marginLeft: -25,
    marginBottom: 10,
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
    color: Colors.error,
  },
  rememberText: {
    fontSize: 16,
  },
  term: {
    fontWeight: 'bold',
  },
  endview: {
    margin: 20,
  },
  endline: {
    fontSize: 14,
  },
  signupButton: {
    backgroundColor: Colors.primaryDark,
    paddingVertical: 20,
    alignItems: 'center',
    height: 80,
    width: '100%',
  },
  signupButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: -20,
  },
});
