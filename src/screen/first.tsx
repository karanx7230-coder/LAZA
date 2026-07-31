import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

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
        <Text style={styles.text}> LAZA</Text>
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
  text: { fontSize: 25, color: 'white' },
});
