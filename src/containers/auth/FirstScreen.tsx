import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Colors, Routes } from '../../utils';

export default function FirstScreen({ navigation }: any) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace(Routes.SCREEN1);
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <View style={styles.view}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <TouchableOpacity>
        <Text style={styles.text}> LAZA</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { fontSize: 25, color: Colors.white },
});
