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
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import React, { useState } from 'react';
export default function Signup({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [isRemembered, setIsRemembered] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();

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
    // 1. Check if fields are empty or have errors
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
      // 2. Create the user in Firebase
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      // 3. Optional but recommended: Save their username to their Firebase profile
      await userCredential.user.updateProfile({
        displayName: username,
      });

      console.log(
        'User account created & signed in!',
        userCredential.user.email,
      );

      // 4. Navigate to the main app on success
      navigation.navigate('MainTabs');
    } catch (error: any) {
      // 5. Handle Firebase-specific errors
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
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.innerContainer}>
          <View>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Sign Up</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  value={username}
                  onChangeText={handleUsernameChange}
                  autoCapitalize="none"
                />
                {username.length >= 5 ? (
                  <Text style={styles.checkMark}>✓</Text>
                ) : null}
              </View>
              {usernameError ? (
                <Text style={styles.error}>{usernameError}</Text>
              ) : null}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={handleEmailChange}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                {email.length > 0 && emailError === '' ? (
                  <Text style={styles.checkMark}>✓</Text>
                ) : null}
              </View>
              {emailError ? (
                <Text style={styles.error}>{emailError}</Text>
              ) : null}
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={handlepasswordChange}
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
              <Text style={styles.rememberText}>Remember me</Text>
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
            style={styles.signupButton}
            activeOpacity={0.8}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" size="large" />
            ) : (
              <Text style={styles.signupButtonText}>Sign Up</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 45,
    height: 45,
    backgroundColor: '#F5F6FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    borderRadius: 25,
  },
  backArrow: {
    fontSize: 22,
    color: '#282828',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 40,
    color: '#1D1E20',
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    color: '#8F959E',
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E7E8EA',
    paddingBottom: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1D1E20',
    fontWeight: '500',
    padding: 0,
  },
  checkMark: {
    color: '#4ade80',
    fontSize: 18,
    fontWeight: 'bold',
  },
  strongText: {
    color: '#4ade80',
    fontSize: 14,
    fontWeight: '500',
  },
  rememberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  rememberText: {
    fontSize: 15,
    color: '#1D1E20',
    fontWeight: '500',
  },
  signupButton: {
    backgroundColor: '#9b6cff',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: -20,
  },
  signupButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  error: {
    color: '#EA4335',
    fontSize: 12,
    marginTop: 5,
  },
});
