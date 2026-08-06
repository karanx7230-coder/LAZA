import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Colors, Routes } from '../utils';

export default function Reviews({ navigation, route }: any) {
  const { reviews: reviewList } = route.params;
  const { colors } = useTheme();

  const themeStyles = useMemo(
    () =>
      StyleSheet.create({
        background: {
          backgroundColor: colors.background,
        },
        textColor: {
          color: colors.text,
        },
      }),
    [colors.background, colors.text],
  );

  return (
    <View style={[styles.mainview, themeStyles.background]}>
      <View style={styles.viewrow}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backtext}> ← </Text>
        </TouchableOpacity>
        <Text style={[styles.head, themeStyles.textColor]}>Reviews</Text>
      </View>

      <View style={styles.viewrow}>
        <View>
          <View style={styles.ratingSummary}>
            <Text
              style={[styles.head, styles.ratingHead, themeStyles.textColor]}
            >
              {reviewList?.length || 0} Reviews
            </Text>
            <View style={styles.ratingValueRow}>
              <Text style={[styles.ratingValue, themeStyles.textColor]}>
                4.8
              </Text>
              <Image
                source={require('../assets/images/Star.png')}
                resizeMode="contain"
                style={styles.starIcon}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate(Routes.ADD_REVIEW)}
          style={styles.addReviewBtn}
        >
          <Image
            source={require('../assets/images/addreview.png')}
            resizeMode="contain"
            style={styles.addReviewIcon}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={reviewList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.view}>
              <View style={styles.reviewrow}>
                <View style={styles.rname}>
                  <Text style={styles.reviewInitialText}>
                    {item.reviewerName?.charAt(0).toUpperCase()}
                  </Text>
                </View>

                <View style={styles.reviewDetails}>
                  <Text style={[styles.reviewName, themeStyles.textColor]}>
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
    backgroundColor: Colors.bgCard,
    borderRadius: 20,
  },
  mainview: {
    backgroundColor: Colors.white,
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
  ratingHead: {
    marginHorizontal: 0,
    marginTop: 20,
  },
  ratingSummary: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  ratingValue: {
    fontSize: 16,
    marginRight: 8,
  },
  starIcon: {
    width: 16,
    height: 16,
  },
  addReviewBtn: {
    marginTop: 20,
  },
  addReviewIcon: {
    width: 30,
    height: 30,
  },
  back: {
    width: 45,
    height: 45,
    backgroundColor: Colors.bgLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 25,
  },
  backtext: {
    fontSize: 30,
    color: Colors.black,
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
  rname: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: Colors.bgSoft,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewInitialText: {
    fontWeight: 'bold',
    color: Colors.primary,
  },
  reviewDetails: {
    flex: 1,
    marginLeft: 10,
  },
  reviewName: {
    fontWeight: 'bold',
  },
  rating: {
    marginLeft: 120,
  },
  ratingtext: {
    color: Colors.textPrimary,
    marginLeft: 10,
  },
  date: {
    color: '#a7a7a7',
  },
  passage: {
    color: Colors.textMedium,
    fontSize: 15,
    padding: 10,
  },
});
