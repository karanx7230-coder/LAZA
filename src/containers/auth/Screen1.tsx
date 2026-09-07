import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import { Colors, Routes } from '../../utils';

export default function Screen1({ navigation }: any) {
  const { colors } = useTheme();

  return (
    <LinearGradient
      colors={['#7231eb', '#a594b2']}
      style={styles.mainContainer}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <ImageBackground
        source={require('../../assets/images/man.png')}
        style={styles.image}
        resizeMode="cover"
      >
        <View style={[styles.box, { backgroundColor: colors.card }]}>
          <Text style={[styles.boxheading, { color: colors.text }]}>
            Look Good, Feel Good
          </Text>
          <Text style={styles.line}>
            Create your individual & unique style and look amazing everyday.
          </Text>

          <View style={styles.btns}>
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.SIGNUP)}
              style={styles.men}
            >
              <Text style={styles.menText}>Men</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.SIGNUP)}
              style={styles.women}
            >
              <Text style={styles.womenText}>Women</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.SIGNUP)}
            style={styles.skip}
          >
            <Text style={styles.skiptext}>Skip</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },
  box: {
    width: 350,
    height: 270,
    borderRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 25,
  },
  boxheading: {
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 12,
    textAlign: 'center',
    color: '#222',
  },
  line: {
    fontSize: 15,
    textAlign: 'center',
    color: '#8C8C8C',
    lineHeight: 22,
  },
  btns: {
    flexDirection: 'row',
    marginTop: 35,
    justifyContent: 'space-between',
  },
  men: {
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    width: 140,
    backgroundColor: '#d8d6d9',
  },
  women: {
    borderRadius: 15,
    padding: 15,
    width: 140,
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  menText: {
    color: '#5b5858',
    fontWeight: 'bold',
    fontSize: 16,
  },
  womenText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  skip: {
    alignItems: 'center',
    padding: 10,
  },
  skiptext: {
    fontWeight: 'bold',
    color: '#625e5e',
  },
});
