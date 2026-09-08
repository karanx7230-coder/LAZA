import auth from '@react-native-firebase/auth';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Switch,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
  StatusBar,
  Image,
  Modal,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import React, { useMemo, useState } from 'react';
import { Colors } from '../../utils';

import styles from './Signup.styles';

type FormField = keyof FormState;

interface FormState {
  username: string;
  email: string;
  password: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
const USERNAME_MIN_LENGTH = 5;

const initialForm: FormState = {
  username: '',
  email: '',
  password: '',
};

const validateField = (field: FormField, value: string): string => {
  if (value.length === 0) return '';
  switch (field) {
    case 'username':
      return value.length >= USERNAME_MIN_LENGTH
        ? ''
        : `Must be at least ${USERNAME_MIN_LENGTH} characters`;
    case 'email':
      return EMAIL_REGEX.test(value) ? '' : 'Enter a valid email address';
    case 'password':
      return PASSWORD_REGEX.test(value)
        ? ''
        : 'Password must be 8+ characters and contain a number';
  }
};

export default function Signup({ navigation }: any) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormState>(initialForm);
  const [isRemembered, setIsRemembered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setshow] = useState(false);
  const [focusedField, setFocusedField] = useState<FormField | null>(null);
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

  const handleFirebaseSignUp = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Missing Fields', 'Please fill out all fields.');
      return;
    }
    if (errors.username || errors.email || errors.password) {
      Alert.alert('Invalid Input', 'Please fix the errors before signing up.');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        form.email,
        form.password,
      );

      await userCredential.user.updateProfile({
        displayName: form.username,
      });
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setErrors(prev => ({
          ...prev,
          email: 'That email address is already in use!',
        }));
      } else if (error.code === 'auth/invalid-email') {
        setErrors(prev => ({
          ...prev,
          email: 'That email address is invalid!',
        }));
      } else if (error.code === 'auth/weak-password') {
        setErrors(prev => ({ ...prev, password: 'Password is too weak.' }));
      } else {
        Alert.alert('Signup Error', error.message);
      }
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={Colors.black} size="large" />
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      style={[styles.keyboard, themeStyles.background]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      {show && (
        <Modal
          visible={show}
          transparent
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              height: '100%',
              width: '100%',
              backgroundColor: '#6b6a6a5a',
              position: 'absolute',
            }}
            onPress={() => setshow(!show)}
          />
          <View
            style={{
              height: '30%',
              top: '30%',
              alignSelf: 'center',
              justifyContent: 'center',
              width: '80%',
              backgroundColor: Colors.primary,
              borderRadius: 50,
            }}
          ></View>
        </Modal>
      )}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.innerContainer, themeStyles.background]}>
          <View>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>

            <Text style={[styles.title, themeStyles.textColor]}>Sign Up</Text>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, themeStyles.textColor]}>
                Username
              </Text>
              <View style={styles.inputRow}>
                <TextInput
                  style={inputStyle('username')}
                  value={form.username}
                  onChangeText={handleChange('username')}
                  onFocus={handleFocus('username')}
                  onBlur={handleBlur('username')}
                  autoCapitalize="none"
                />
                {form.username.length >= USERNAME_MIN_LENGTH ? (
                  <Text style={styles.checkMark}>✓</Text>
                ) : null}
              </View>
              {errors.username ? (
                <Text style={styles.error}>{errors.username}</Text>
              ) : null}
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, themeStyles.textColor]}>
                Email Address
              </Text>
              <View style={styles.inputRow}>
                <TextInput
                  style={inputStyle('email')}
                  value={form.email}
                  onChangeText={handleChange('email')}
                  onFocus={handleFocus('email')}
                  onBlur={handleBlur('email')}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                {form.email.length > 0 && !errors.email ? (
                  <Text style={styles.checkMark}>✓</Text>
                ) : null}
              </View>
              {errors.email ? (
                <Text style={styles.error}>{errors.email}</Text>
              ) : null}
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, themeStyles.textColor]}>
                Password
              </Text>
              <View style={styles.inputRow}>
                <TextInput
                  style={inputStyle('password')}
                  value={form.password}
                  onChangeText={handleChange('password')}
                  onFocus={handleFocus('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry={show}
                />
                {show ? (
                  <TouchableOpacity
                    onPress={() => {
                      setshow(!show);
                    }}
                  >
                    <Image
                      source={require('../../assets/images/hide.png')}
                      style={{
                        height: 25,
                        width: 25,
                        marginHorizontal: 20,
                      }}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setshow(!show);
                    }}
                  >
                    <Image
                      source={require('../../assets/images/view.png')}
                      style={{
                        height: 25,
                        width: 25,
                        marginHorizontal: 20,
                      }}
                    />
                  </TouchableOpacity>
                )}

                {form.password.length > 0 && !errors.password ? (
                  <Text style={styles.strongText}>Strong</Text>
                ) : null}
              </View>
              {errors.password ? (
                <Text style={styles.error}>{errors.password}</Text>
              ) : null}
            </View>

            <View style={styles.rememberRow}>
              <Text style={[styles.rememberText, themeStyles.textColor]}>
                Remember me
              </Text>
              <Switch
                value={isRemembered}
                onValueChange={setIsRemembered}
                trackColor={{ false: '#e0e0e0', true: '#3ac053' }}
                thumbColor="#ffffff"
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={handleFirebaseSignUp}
            style={styles.createacc}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={Colors.white} size="large" />
            ) : (
              <Text style={styles.textsignin}>Sign Up</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
