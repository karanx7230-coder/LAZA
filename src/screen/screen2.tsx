import React from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
GoogleSignin.configure({
  webClientId: '1065925478043-cimr44d4veci0egq2grlivtb5bj2r002.apps.googleusercontent.com',
});
export default function Screen2({ navigation }: any) {
  const ongooglebuttonpress = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const signinresult = await GoogleSignin.signIn();
      const idtoken = signinresult.data?.idToken;
      if (!idtoken) {
        throw new Error('no id token found');
      }
      const googlecredential = auth.GoogleAuthProvider.credential(idtoken);
      return auth().signInWithCredential(googlecredential);
    } catch (error) {
      console.error('google login error:', error);
    }
  };
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title1, { color: colors.text }]}>
        Let's Get Started
      </Text>

      <TouchableOpacity
        style={styles.facebookBtn}
      >
        <Image
          style={styles.imgf}
          source={require('../assets/facebook.png')}
          resizeMode="contain"
        />
        <Text style={styles.btnText}>Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.TwitterBtn}
      >
        <Image
          style={styles.imgf}
          source={require('../assets/twitter.png')}
          resizeMode="contain"
        />
        <Text style={styles.btnText}>Twitter</Text>
      </TouchableOpacity>

      <TouchableOpacity
       onPress={() => {
          ongooglebuttonpress().catch(error => console.log('Login failed:', error));
        }}
        style={styles.GoogleBtn}
      >
        <Image
          style={styles.imgf}
          source={require('../assets/google.png')}
          resizeMode="contain"
        />
        <Text style={styles.btnText}>Google</Text>
      </TouchableOpacity>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('login')}
          style={styles.loginPrompt}
        >
          <Text style={styles.acchave}>
            Already have an account?{' '}
            <Text style={[styles.signin, { color: colors.text }]}>Signin</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('signup')}
          style={styles.createacc}
        >
          <Text style={styles.textsignin}>Create an Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title1: {
    fontSize: 28,
    marginTop: '30%',
    marginBottom: 60,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#222222',
  },
  facebookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4D6AB4',
    padding: 15,
    borderRadius: 8,
    width: '85%',
    marginBottom: 15,
  },
  TwitterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2CA4F4',
    padding: 15,
    width: '85%',
    borderRadius: 8,
    marginBottom: 15,
  },
  GoogleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E94335',
    padding: 15,
    width: '85%',
    borderRadius: 8,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  imgf: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  bottomContainer: {
    marginTop: 'auto',
    width: '100%',
    alignItems: 'center',
  },
  loginPrompt: {
    marginBottom: 20,
  },
  acchave: {
    color: '#9E9E9E',
    fontSize: 14,
  },
  signin: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: 14,
  },
  createacc: {
    backgroundColor: '#9A75FA',
    width: '100%',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  textsignin: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
