import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import { useTheme } from '../context/ThemeContext';
export default function Reviews({ navigation, route }: any) {
  const { reviews: reviewList } = route.params;
  const { colors } = useTheme();

  return (
    <View style={[styles.mainview, { backgroundColor: colors.background }]}>
      <View style={styles.viewrow}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backtext}> ← </Text>
        </TouchableOpacity>
        <Text style={[styles.head, { color: colors.text }]}>Reviews</Text>
      </View>
      <View style={styles.viewrow}>
        <View>
          <Text style={[styles.head, { color: colors.text }]}>{reviewList?.length || 0} Reviews</Text>
          <Text>
            4.8
            <Image
              source={require('../assets/Star.png')}
              resizeMode="contain"
            />
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('addreview')}>
            <Image
              source={require('../assets/addreview.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={reviewList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.view}>
              <View style={styles.reviewrow}>
                <View style={styles.rname}>
                  <Text style={{ fontWeight: 'bold', color: '#9B72FF' }}>
                    {item.reviewerName?.charAt(0).toUpperCase()}
                  </Text>
                </View>

                <View style={{ marginLeft: 10, flex: 1 }}>
                  <Text style={{ fontWeight: 'bold' }}>
                    {item.reviewerName}
                  </Text>
                  <Text style={styles.date}>
                    🕒 {new Date(item.date).toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.rating}>
                  <Text style={styles.ratingtext}>
                    {item.rating} <Text style={styles.date}>rating</Text>
                  </Text>
                </View>
              </View>
              <Text style={styles.passage}>{item.comment}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
  },
  mainview: {
    backgroundColor: '#ffffff',
    flex: 1,
    paddingHorizontal: 20,
  },
  viewrow: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  head: {
    fontSize: 24,
    marginHorizontal: 50,
    alignSelf: 'center',
    marginTop: 20,
  },
  name: {
    color: '#3e3e3e',
    fontSize: 18,
  },
  back: {
    width: 45,
    height: 45,
    backgroundColor: '#f7f7f7',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 25,
    fontWeight: 'bold',
  },
  backtext: {
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    lineHeight: 30,
  },
  reviewrow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  viewreview: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 120,
  },
  ratingtext: {
    color: '#494949',
    marginLeft: 10,
  },
  date: {
    color: '#a7a7a7',
  },
  passage: {
    color: '#8f8f8f',
    fontSize: 15,
    padding: 10,
  },
  rname: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
