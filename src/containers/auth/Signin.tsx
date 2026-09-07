import React, { useMemo, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

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
import { Colors, Routes } from '../../utils';

import styles from './Signin.styles';

type FormField = keyof FormState;

interface FormState {
  email: string;
  password: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

const initialForm: FormState = {
  email: '',
  password: '',
};

const validateField = (field: FormField, value: string): string => {
  if (value.length === 0) return '';
  switch (field) {
    case 'email':
      return EMAIL_REGEX.test(value) ? '' : 'Enter a valid email address';
    case 'password':
      return PASSWORD_REGEX.test(value) ? '' : 'Password is too weak';
  }
};

export default function Signin({ navigation }: any) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormState>(initialForm);
  const [isRemembered, setIsRemembered] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<FormField | null>(null);
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

  const inputStyle = (field: FormField) => [
    styles.input,
    focusedField === field ? styles.inputFocused : styles.inputBlurred,
  ];

  const handleChange = (field: FormField) => (text: string) => {
    setForm(prev => ({ ...prev, [field]: text }));
    setErrors(prev => ({ ...prev, [field]: validateField(field, text) }));
  };

  const handleFocus = (field: FormField) => () => setFocusedField(field);

  const handleBlur = (field: FormField) => () => {
    setFocusedField(null);
    setErrors(prev => ({
      ...prev,
      [field]: validateField(field, form[field]),
    }));
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Missing Fields', 'Please enter your email and password.');
      return;
    }
    if (errors.email || errors.password) {
      Alert.alert('Invalid Input', 'Please fix the errors before logging in.');
      return;
    }

    setLoading(true);

    try {
      await auth().signInWithEmailAndPassword(form.email, form.password);
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
                  onFocus={handleFocus('email')}
                  onBlur={handleBlur('email')}
                  style={inputStyle('email')}
                  value={form.email}
                  onChangeText={handleChange('email')}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
              {errors.email ? (
                <Text style={styles.error}>{errors.email}</Text>
              ) : null}
            </View>
            <View style={styles.textinput}>
              <Text style={[styles.type, themeStyles.textColor]}>Password</Text>
              <View style={styles.line}>
                <TextInput
                  onFocus={handleFocus('password')}
                  onBlur={handleBlur('password')}
                  style={inputStyle('password')}
                  secureTextEntry={!showPassword}
                  value={form.password}
                  onChangeText={handleChange('password')}
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
              {errors.password ? (
                <Text style={styles.error}>{errors.password}</Text>
              ) : null}
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
