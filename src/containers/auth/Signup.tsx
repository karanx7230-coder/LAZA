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
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import React, { useMemo, useState } from 'react';
import { Colors } from '../../utils';

import styles from './Signup.styles';

export default function Signup({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [isRemembered, setIsRemembered] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
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

  const usernameInputStyle = [
    styles.input,
    usernameFocused ? styles.inputFocused : styles.inputBlurred,
  ];

  const emailInputStyle = [
    styles.input,
    emailFocused ? styles.inputFocused : styles.inputBlurred,
  ];

  const passwordInputStyle = [
    styles.input,
    passwordFocused ? styles.inputFocused : styles.inputBlurred,
  ];

  const handleUsernameChange = (text: string) => {
    setUsername(text);
    if (text.length > 0 && text.length < 5) {
      setUsernameError('Must be at least 5 characters');
    } else {
      setUsernameError('');
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (text.length === 0) {
      setEmailError('');
    } else if (!text.includes('@')) {
      setEmailError('Must contain @');
    } else if (!text.includes('.')) {
      setEmailError("Email must contain a '.'");
    } else {
      setEmailError('');
    }
  };

  const handlepasswordChange = (text: string) => {
    setPassword(text);
    const hasNumber = /[0-9]/.test(text);
    const isLongEnough = text.length >= 8;

    if (text.length === 0) {
      setPasswordError('');
    } else if (!isLongEnough) {
      setPasswordError('Must be at least 8 characters');
    } else if (!hasNumber) {
      setPasswordError('Must contain at least one number');
    } else {
      setPasswordError('');
    }
  };

  const handleFirebaseSignUp = async () => {
    if (!username || !email || !password) {
      Alert.alert('Missing Fields', 'Please fill out all fields.');
      return;
    }
    if (usernameError || emailError || passwordError) {
      Alert.alert('Invalid Input', 'Please fix the errors before signing up.');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      await userCredential.user.updateProfile({
        displayName: username,
      });
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setEmailError('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        setEmailError('That email address is invalid!');
      } else if (error.code === 'auth/weak-password') {
        setPasswordError('Password is too weak.');
      } else {
        Alert.alert('Signup Error', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

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
              <Text style={styles.backArrow}>â†</Text>
            </TouchableOpacity>

            <Text style={[styles.title, themeStyles.textColor]}>Sign Up</Text>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, themeStyles.textColor]}>
                Username
              </Text>
              <View style={styles.inputRow}>
                <TextInput
                  style={usernameInputStyle}
                  value={username}
                  onChangeText={handleUsernameChange}
                  onFocus={() => setUsernameFocused(true)}
                  onBlur={() => setUsernameFocused(false)}
                  autoCapitalize="none"
                />
                {username.length >= 5 ? (
                  <Text style={styles.checkMark}>âœ“</Text>
                ) : null}
              </View>
              {usernameError ? (
                <Text style={styles.error}>{usernameError}</Text>
              ) : null}
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, themeStyles.textColor]}>
                Email Address
              </Text>
              <View style={styles.inputRow}>
                <TextInput
                  style={emailInputStyle}
                  value={email}
                  onChangeText={handleEmailChange}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                {email.length > 0 && emailError === '' ? (
                  <Text style={styles.checkMark}>âœ“</Text>
                ) : null}
              </View>
              {emailError ? (
                <Text style={styles.error}>{emailError}</Text>
              ) : null}
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, themeStyles.textColor]}>
                Password
              </Text>
              <View style={styles.inputRow}>
                <TextInput
                  style={passwordInputStyle}
                  value={password}
                  onChangeText={handlepasswordChange}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  secureTextEntry={true}
                />
                {password.length > 0 && passwordError === '' ? (
                  <Text style={styles.strongText}>Strong</Text>
                ) : null}
              </View>
              {passwordError ? (
                <Text style={styles.error}>{passwordError}</Text>
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


