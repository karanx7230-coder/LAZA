import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addName } from '../store/redux/slice/userslice';
import { Routes } from '../utils';

export default function FillDetails({ navigation }: any) {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(addName({ name }));
    navigation.navigate(Routes.MAIN_TABS);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.caption}>UID</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter UID"
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  caption: { fontSize: 14, color: '#9ca3af', marginBottom: 6 },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    marginBottom: 20,
  },
});
