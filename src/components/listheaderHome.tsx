import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { DrawerActions } from '@react-navigation/native';
import { Colors, Routes } from '../utils';

type Props = {
  navigation: any;
  colors: any;
  searchQuery: string;
  setSearchQuery: (text: string) => void;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
};

export default function HomeListHeader({
  navigation,
  colors,
  searchQuery,
  setSearchQuery,
  categories,
  selectedCategory,
  setSelectedCategory,
}: Props) {
  return (
    <View>
      <View style={styles.viewtop}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Image
            style={styles.imagetop}
            source={require('../assets/images/Menu.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.navigate(Routes.ORDER)}
        >
          <Image
            style={styles.imagetop}
            source={require('../assets/images/Cart.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <Text style={[styles.hello, { color: colors.text }]}>Hello</Text>
      <Text style={[styles.welcome, { color: colors.text }]}>
        Welcome to Laza.
      </Text>
      <View style={styles.searchrow}>
        <View style={styles.search}>
          <Image
            source={require('../assets/images/searchgrey.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <TextInput
            style={styles.textput}
            placeholder="Search..."
            placeholderTextColor={'#9a9797'}
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
        </View>
      </View>
      <View style={styles.space}>
        <Text style={[styles.choose, { color: colors.text }]}>
          Choose Category
        </Text>
        <Text style={styles.viewall}>View All</Text>
      </View>
      <View style={styles.categoryrow}>
        <ScrollView
          horizontal={true}
          style={styles.brandbox}
          showsHorizontalScrollIndicator={false}
        >
          {categories.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.brand,
                selectedCategory === cat && { backgroundColor: Colors.primary },
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.brandname,
                  selectedCategory === cat && { color: '#fff' },
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.space}>
        <Text style={[styles.choose, { color: colors.text }]}>
          New Arrivals
        </Text>
        <TouchableOpacity>
          <Text style={styles.viewall}>View All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewtop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  back: {
    width: 50,
    height: 50,
    backgroundColor: '#ffffff9d',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    fontWeight: 'bold',
    borderRadius: 100,
  },
  imagetop: {
    height: 52,
    width: 52,
    borderRadius: 20,
  },
  hello: {
    fontWeight: '900',
    fontSize: 40,
  },
  welcome: {
    fontSize: 17,
    color: '#b4b4b4',
  },
  searchrow: {
    flexDirection: 'row',
  },
  image: {
    height: 25,
    width: 25,
    padding: 15,
    margin: 5,
  },
  textput: {
    color: 'black',
    flex: 1,
    height: '100%',
  },
  search: {
    backgroundColor: '#f6f6f6c0',
    marginVertical: 15,
    height: 50,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  space: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  choose: {
    fontSize: 22,
  },
  viewall: {
    fontSize: 12,
    color: '#b4b4b4',
  },
  categoryrow: {
    height: 60,
    marginVertical: 10,
  },
  brandbox: {
    marginTop: 20,
    flexDirection: 'row',
  },
  brand: {
    flexDirection: 'row',
    backgroundColor: '#dbdbdb88',
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    alignItems: 'center',
  },
  brandname: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
