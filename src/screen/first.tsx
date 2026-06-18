import React, { useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function FirstScreen({ navigation }: any) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('screen1');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={styles.view}>
      <TouchableOpacity>
        <Image
          source={require('../assets/laza.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#48358b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 900,
    height: 900,
  },
});
