import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Switch,
} from 'react-native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from '../context/ThemeContext';
export default function payment({ navigation }: any) {
  const [isrememberd, setIsRemembered] = useState(true);
const {  colors } = useTheme();
  const [name,setname]=useState("")
  const [numb,setnumb]=useState("")
  const [exp,setexp]=useState("")
  const [cvv,setcvv]=useState("")

  return (
     <View style={[styles.view, { backgroundColor: colors.background }]}>
    <ScrollView  style={styles.view1}>
     
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text  style={[styles.headTitle,{color:colors.text}]}>Payment</Text>
          <View style={styles.viewgap} />
        </View>

        <Image
          source={require('../assets/Card.png')}
          resizeMode="contain"
          style={styles.imagecard}
        />

        <View>
          <TouchableOpacity
            style={styles.addnew}
            onPress={() => navigation.navigate('addcard')}
          >
            <Image
              source={require('../assets/Plus.png')}
              style={styles.imgplus}
            />
            <Text style={styles.addtext}>Add new card</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text  style={[styles.head,{color:colors.text}]}>Card Owner</Text>
          <TextInput
            placeholder="Mrh Raju"
            placeholderTextColor={'#959595'}
            style={styles.input}
            value={name}
            onChangeText={setname}
          />
        </View>

        <View>
          <Text  style={[styles.head,{color:colors.text}]}>Card Number</Text>
          <TextInput
            placeholder="5254 7634 8734 7690"
            placeholderTextColor={'#959595'}
            style={styles.input}
            value={numb}
            onChangeText={setnumb}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.input2}>
            <Text style={[styles.head,{color:colors.text}]}>EXP</Text>
            <TextInput
              placeholder="24/24"
              placeholderTextColor={'#959595'}
              style={styles.input1}
              value={exp}
            onChangeText={setexp}
            />
          </View>
          <View style={styles.input2}>
            <Text style={[styles.head,{color:colors.text}]}>CVV</Text>
            <TextInput
              placeholder="7763"
              placeholderTextColor={'#959595'}
              style={styles.input1}
              value={cvv}
            onChangeText={setcvv}
            />
          </View>
        </View>

        <View style={styles.head1}>
          <Text  style={[styles.head,{color:colors.text}]}>Save card info</Text>
          <Switch
            value={isrememberd}
            onValueChange={setIsRemembered}
            trackColor={{ false: '#d3d3d3', true: '#41b1008e' }}
          />
        </View>
       </ScrollView>

      <TouchableOpacity style={styles.last} onPress={navigation.goBack}>
        <Text style={styles.lasttext}>Save Card</Text>
      </TouchableOpacity>
   </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  view1: {
    flex: 1,
    marginTop: 30,
  },
  viewgap: {
    width: 50,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },
  headTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  head: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
    color: 'black',
  },
  backButton: {
    width: 50,
    height: 50,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  backArrow: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  imagecard: {
    marginVertical: 20,
    alignSelf: 'center',
    width: '100%',
    height: 200,
  },
  addnew: {
    backgroundColor: '#f4e8ff',
    borderColor: '#c77af3',
    borderWidth: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  imgplus: {
    marginRight: 8,
  },
  addtext: {
    color: '#a85cff',
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 15,
    height: 50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input2: {
    flex: 1,
    marginRight: 5,
  },
  input1: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginTop: 5,
    height: 50,
    paddingHorizontal: 15,
  },
  head1: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  last: {
    backgroundColor: '#8b5cf6',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: -20,
  },
  lasttext: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
