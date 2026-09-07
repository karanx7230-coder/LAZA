import { StyleSheet } from 'react-native';
import { Colors } from '../../utils';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
  },
  sectionPad: {
    marginHorizontal: 20,
  },
  priceviewbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  view1: {
    width: 50,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  head: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
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
  itemCard: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderColor: '#fafafa',
    borderWidth: 2,
    borderRadius: 20,
    padding: 4,
  },
  imageContainer: {
    backgroundColor: '#f4f5f9',
    borderRadius: 12,
    marginRight: 15,
  },
  productimage: {
    height: 100,
    width: 100,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#9ba0a5',
  },
  footerContainer: {
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  mapimage: {
    height: 60,
    width: 60,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  adress: {
    flex: 1,
    paddingHorizontal: 10,
  },
  adresshead: {
    fontSize: 16,
  },
  adresssubhead: {
    color: '#b4b4b4',
  },
  tick: {
    width: 25,
    height: 25,
    margin: 10,
  },
  visatick: {
    width: 25,
    height: 25,
    margin: 10,
    marginLeft: 150,
  },
  deletetouch: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#3a3a3a',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
    alignSelf: 'flex-end',
  },
  visa: {
    height: 50,
    width: 50,
    borderRadius: 10,
  },
  inforow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  last: {
    backgroundColor: Colors.primaryDark,
    height: 55,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 100,
  },
  lasttext: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
});

export default styles;
