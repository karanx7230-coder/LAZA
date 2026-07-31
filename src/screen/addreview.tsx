import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import Slider from '@react-native-community/slider';
import { useTheme } from '../context/ThemeContext';

export default function AddReview({ navigation }: any) {
  const [rating, setRating] = useState(0);
const {colors}=useTheme();

  return (
    <KeyboardAvoidingView style={[styles.mainview,{backgroundColor:colors.background}]}
  
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.viewrow}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backtext}>←</Text>
          </TouchableOpacity>
          <Text  style={[styles.head,{color:colors.text}]}>Add Review</Text>
          <View style={styles.placeholder} />
        </View>

        <View>
          <Text  style={[styles.name,{color:colors.text}]}>Name</Text>
          <TextInput
            placeholder="Type your name"
            placeholderTextColor={'#8F959E'}
            style={styles.nameinput}
          />

          <Text   style={[styles.name,{color:colors.text}]}>How was your experience ?</Text>
          <TextInput
            placeholder="Describe your experience?"
            placeholderTextColor={'#8F959E'}
            style={styles.reviewinput}
            multiline={true}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.sliderContainer}>
          <Text   style={[styles.sliderLabel,{color:colors.text}]}>Star</Text>
          <View style={styles.sliderRow}>
            <Text   style={[styles.sliderNumber,{color:colors.text}]}>0.0</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={5}
              step={0.1}
              value={rating}
              onValueChange={currentValue => setRating(currentValue)}
              minimumTrackTintColor="#9b6cff"
              maximumTrackTintColor="#f8f8f8"
              thumbTintColor="#9b6cff"
              thumbSize={20}
            />
            <Text   style={[styles.sliderNumber,{color:colors.text}]}>5.0</Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.submitBtn}>
        <Text style={styles.submitText}>Submit Review</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainview: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    flexGrow: 1,
  },
  viewrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 20,
  },
  back: {
    width: 45,
    height: 45,
    backgroundColor: '#F5F6FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  backtext: {
    fontSize: 24,
    color: 'black',
    marginBottom: 2,
  },
  head: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1D1E20',
  },
  placeholder: {
    width: 45,
  },
  name: {
    fontSize: 16,
    marginLeft: 20,
    fontWeight: '600',
    marginTop: 30,
    color: '#1D1E20',
  },
  nameinput: {
    backgroundColor: '#F5F6FA',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    color: 'black',
    marginTop: 10,
    fontSize: 15,
  },
  reviewinput: {
    backgroundColor: '#F5F6FA',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    color: 'black',
    marginTop: 10,
    height: 180,
    fontSize: 15,
  },
  sliderContainer: {
    marginTop: 30,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    color: '#1D1E20',
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
  },
  sliderNumber: {
    fontSize: 13,
    color: '#1D1E20',
    fontWeight: '600',
  },
  submitBtn: {
    backgroundColor: '#9b6cff',
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  submitText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
