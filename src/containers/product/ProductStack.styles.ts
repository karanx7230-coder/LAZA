import { StyleSheet } from 'react-native';
import { Colors } from '../../utils';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollview: {
    flex: 1,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginTop: 20,
  },
  priceSection: {
    marginTop: 10,
  },
  reviewSummaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  profileAvatar: {
    backgroundColor: Colors.bgSoft,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexOne: {
    flex: 1,
    marginLeft: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  viewtop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  back: {
    width: 45,
    height: 45,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginHorizontal: 20,
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
  image: {
    width: '100%',
    height: 350,
    backgroundColor: '#e9e9e998',
  },
  imagetop: {
    height: 45,
    width: 45,
    borderRadius: 20,
  },
  mainview: {
    paddingHorizontal: 20,
  },
  view2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  subname: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 10,
  },
  view3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  price: {
    fontSize: 22,
    fontWeight: '400',
    color: Colors.black,
    marginTop: 5,
  },
  viewdescription: {
    marginTop: 5,
  },
  profileimg: {
    height: 40,
    width: 40,
    marginRight: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  rating: {
    color: 'grey',
  },
  date: {
    color: Colors.textMuted,
  },
  reviewpassage: {
    fontSize: 13,
    padding: 10,
    color: Colors.textMedium,
    marginTop: 10,
  },
  priceviewbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  tax: {
    fontSize: 11,
    color: '#b1b1b1',
    marginTop: 2,
  },
  cart: {
    color: Colors.white,
    fontSize: 20,
  },
  addtocart: {
    alignItems: 'center',
    marginHorizontal: -20,
    paddingVertical: 18,
    marginTop: 20,
  },
  viewrating: {
    marginLeft: 130,
    marginTop: 10,
  },
});

export default styles;
