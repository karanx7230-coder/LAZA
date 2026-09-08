import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Colors, Routes } from '../../utils';
export default function Otp({ navigation }: any) {
  const [otp, setotp] = useState(['', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const { isDarkMode, colors } = useTheme();

  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    if (timeLeft === 0) return;
    const intervalId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setotp(newOtp);
    if (text.length !== 0 && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setTimeLeft(20);
    setotp(['', '', '', '']);
    inputRefs.current[0]?.focus();
  };

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
            Verification code
          </Text>
          <Image source={require('../../assets/images/lock.png')} />
          <View style={styles.input}>
            <Text style={[styles.headotp, { color: colors.text }]}>
              OTP Code
            </Text>
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(el: TextInput | null) => {
                    inputRefs.current[index] = el;
                  }}
                  style={[
                    styles.otpBox,
                    { borderColor: digit !== '' ? 'blue' : 'grey' },
                  ]}
                  keyboardType="numeric"
                  maxLength={1}
                  value={digit}
                  onChangeText={text => handleChange(text, index)}
                  onKeyPress={e => handleBackspace(e, index)}
                />
              ))}
            </View>
          </View>

          {timeLeft > 0 ? (
            <Text style={styles.line}>
              00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft} resend confirmation
              code.
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResend}>
              <Text
                style={[
                  styles.line,
                  { color: Colors.primaryDark, fontWeight: 'bold' },
                ]}
              >
                Resend confirmation code
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.NEW_PASSWORD)}
            style={styles.otpButton}
          >
            <Text style={styles.otpText}>Confirm otp</Text>
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
    backgroundColor: 'white',
  },
  head: {
    fontSize: 35,
    marginLeft: 40,
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  otpBox: {
    borderWidth: 2,
    width: 70,
    height: 90,
    borderRadius: 15,
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
  },
  backArrow: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#282828',
  },
  input: {
    paddingHorizontal: 40,
  },
  headotp: {
    color: '#898484',
  },
  line: {
    marginTop: 130,
    color: '#b7b2b2',
    padding: 20,
    paddingHorizontal: 45,
    alignItems: 'center',
    textAlign: 'center',
  },
  otpButton: {
    backgroundColor: Colors.primaryDark,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 25,
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
