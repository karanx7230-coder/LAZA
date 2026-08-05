import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';

interface Props {
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
  valueStyle?: StyleProp<TextStyle>;
}

export default function QuantityStepper({
  value,
  onDecrease,
  onIncrease,
  valueStyle,
}: Props) {
  return (
    <>
      <TouchableOpacity onPress={onDecrease} style={styles.button}>
        <Text style={styles.icon}>-</Text>
      </TouchableOpacity>
      <Text style={[styles.value, valueStyle]}>{value}</Text>
      <TouchableOpacity onPress={onIncrease} style={styles.button}>
        <Text style={styles.icon}>+</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#949494',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  icon: {
    fontSize: 16,
    color: '#242424',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
