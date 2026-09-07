// import React, { useState } from 'react';
// import auth from '@react-native-firebase/auth';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   StatusBar,
// } from 'react-native';
// import { useTheme } from '../../context/ThemeContext';
// import { Colors, Routes } from '../../utils';
// import Btn from '../../components/auth/basiccomponents';
// import { Userapi } from '../../types';
// export default function Screen2({ navigation }: any) {
//   const [user, setuser] = useState('');
//   const ongooglebuttonpress = async () => {
//     try {
//       await fetch('https://dummyjson.com/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           username: 'emilys',
//           password: 'emilyspass',
//           expiresInMins: 30,
//         }),
//         credentials: 'include',
//       })
//         .then(res => res.json())
//         .then(res => setuser(res.json()))
//         .then(console.log);
//       console.log('yeh leh user kah ', user);
//     } catch (error) {
//       console.error('google login error:', error);
//     }
//   };
//   const { isDarkMode, colors } = useTheme();
//   return (
//     <View style={[styles.container, { backgroundColor: colors.background }]}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor="transparent"
//         translucent
//       />
//       <Text style={[styles.title1, { color: colors.text }]}>
//         Let's Get Started
//       </Text>

//       <TouchableOpacity style={styles.facebookBtn}>
//         <Image
//           style={styles.imgf}
//           source={require('../../assets/images/facebook.png')}
//           resizeMode="contain"
//         />
//         <Text style={styles.btnText}>Facebook</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.TwitterBtn}>
//         <Image
//           style={styles.imgf}
//           source={require('../../assets/images/twitter.png')}
//           resizeMode="contain"
//         />
//         <Text style={styles.btnText}>Twitter</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={() => {
//           ongooglebuttonpress();
//         }}
//         style={styles.GoogleBtn}
//       >
//         <Image
//           style={styles.imgf}
//           source={require('../../assets/images/google.png')}
//           resizeMode="contain"
//         />
//         <Text style={styles.btnText}>Google</Text>
//       </TouchableOpacity>

//       <View style={styles.bottomContainer}>
//         <TouchableOpacity
//           onPress={() => navigation.navigate(Routes.LOGIN)}
//           style={styles.loginPrompt}
//         >
//           <Text style={styles.acchave}>
//             Already have an account?{' '}
//             <Text style={[styles.signin, { color: colors.text }]}>Sigin </Text>
//           </Text>
//         </TouchableOpacity>
//         <Btn
//           onPress={() => navigation.navigate(Routes.SIGNUP)}
//           title="Create an Account"
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: '#ffffff',
//   },
//   title1: {
//     fontSize: 28,
//     marginTop: '40%',
//     marginBottom: '30%',
//     textAlign: 'center',
//     fontWeight: 'bold',
//     color: '#222222',
//     shadowOpacity: 0.5,
//     shadowColor: 'red',
//   },
//   facebookBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: Colors.navy,
//     padding: 15,
//     borderRadius: 8,
//     width: '85%',
//     marginBottom: 15,
//   },
//   TwitterBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: Colors.infoBlue,
//     padding: 15,
//     width: '85%',
//     borderRadius: 8,
//     marginBottom: 15,
//   },
//   GoogleBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: Colors.error,
//     padding: 15,
//     width: '85%',
//     borderRadius: 8,
//   },
//   btnText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   imgf: {
//     width: 22,
//     height: 22,
//     marginRight: 10,
//   },
//   bottomContainer: {
//     marginTop: 'auto',
//     width: '100%',
//     alignItems: 'center',
//   },
//   loginPrompt: {
//     marginBottom: 20,
//     padding: 30,
//   },
//   acchave: {
//     color: '#9E9E9E',
//     fontSize: 14,
//     // width: '100%',
//     textAlign: 'center',
//   },
//   signin: {
//     color: '#333333',
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
// });
