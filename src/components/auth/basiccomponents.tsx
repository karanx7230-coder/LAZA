import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../../utils';
interface Props {
  onPress: () => void;
  title: string;
}

const Btn = ({ onPress, title }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.createacc}>
      <Text style={styles.textsignin}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  createacc: {
    backgroundColor: Colors.primaryLight,
    width: '100%',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
  textsignin: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default Btn;
