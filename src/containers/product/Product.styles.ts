import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
  },

  viewtop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  back: {
    width: 45,
    height: 45,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginHorizontal: 20,
    borderRadius: 25,
    fontWeight: 'bold',
  },
  wishlist: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginHorizontal: 20,
  },
  imagewish: {
    height: 25,
    width: 25,
    borderRadius: 20,
  },
  backtext: {
    fontSize: 30,
    color: 'black',
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
    color: '#b2b2b2',
    marginTop: 10,
  },
  view3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 22,
    fontWeight: '400',
    color: '#000',
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
    color: '#b4b4b4',
  },

  reviewpassage: {
    fontSize: 13,
    padding: 10,
    color: '#878787',
  },
  row: {
    flexDirection: 'row',
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
    color: '#ffffff',
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
