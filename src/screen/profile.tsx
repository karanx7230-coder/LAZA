import auth from '@react-native-firebase/auth';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Switch,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
export default function Profile({ navigation }: any) {
  const {isDarkMode, toggleTheme,colors } = useTheme();
  const handleLogout = () => {
  auth().signOut()
};
  return (
    <View style={[styles.mainview,{backgroundColor:colors.background}]}>
      <View style={styles.viewrow}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.closeDrawer()}
        >
          <Image source={require('../assets/Menu.png')} />
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity>
          <Image
            style={styles.image}
            source={require('../assets/profile.png')}
            resizeMode="cover"
          />

          <Text style={[styles.text,{ color: colors.text }]}>Mr Mou</Text>
          <Text style={styles.text1}>
            verified Profile
            <Image
              source={require('../assets/verify.png')}
              resizeMode="contain"
            />
          </Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity style={styles.order}>
            <Text>3 order</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.lines}>
        <View style={styles.row}>
          <Image
            style={styles.image1}
            source={require('../assets/sun.png')}
            resizeMode="contain"
          />
          <Text style={[styles.text2, { color: colors.text }]}>Dark Mode</Text>
        </View>
        <View>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{ true: '#16a2148f', false: '#c3c3c3' }}
            thumbColor="#ffffff"
          />
        </View>
      </View>
      <View style={styles.lines}>
        <TouchableOpacity
          style={styles.row}
        >
          <Image
            style={styles.image1}
            source={require('../assets/Info.png')}
            resizeMode="contain"
          />
          <Text    style={[styles.text2, { color: colors.text }]}>Account Information</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lines}>
        <TouchableOpacity
          onPress={() => navigation.navigate('newpassword')}
          style={styles.row}
        >
          <Image
            style={styles.image1}
            source={require('../assets/lock.png')}
            resizeMode="contain"
          />
          <Text    style={[styles.text2, { color: colors.text }]}>Password</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lines}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          style={styles.row}
        >
          <Image
            style={styles.image1}
            source={require('../assets/Bag.png')}
            resizeMode="contain"
          />
          <Text    style={[styles.text2, { color: colors.text }]}>Order</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lines}>
        <TouchableOpacity
          onPress={() => navigation.navigate('payment')}
          style={styles.row}
        >
          <Image
            style={styles.image1}
            source={require('../assets/Wallet.png')}
            resizeMode="contain"
          />
          <Text    style={[styles.text2, { color: colors.text }]}>My Cards</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lines}>
        <TouchableOpacity
          onPress={() => navigation.navigate('wishlist')}
          style={styles.row}
        >
          <Image
            style={styles.image1}
            source={require('../assets/Heart.png')}
            resizeMode="contain"
          />
          <Text    style={[styles.text2, { color: colors.text }]}>Wishlist</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lines1}>
        <TouchableOpacity
          onPress={handleLogout}
          style={styles.row}
        >
          <Image
            style={styles.image1}
            source={require('../assets/Logout.png')}
            resizeMode="contain"
          />
          <Text style={styles.text3}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainview: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 25,
  },
  viewrow: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  back: {
    width: 45,
    height: 45,
    backgroundColor: '#f7f7f7',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 25,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    width: 260,
  },

  text: {
    fontSize: 25,
    fontWeight: '600',
    marginHorizontal: 10,
  },
  text1: {
    fontSize: 20,
    color: '#acacac',
  },
  text2: {
    fontSize: 20,
    fontWeight: '400',
    marginLeft: 10,
  },
  text3: {
    fontSize: 20,
    fontWeight: '400',
    marginLeft: 10,
    color: '#ff000092',
  },
  lines: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight:10,
  },
  lines1: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    padding: 10,
    margin: 10,
    height: 55,
    width: 55,
  },
  image1: {
    padding: 10,
  },
  order: {
    backgroundColor: '#e9e9e9',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    color: 'red',
    margin: 15,
  },
});
