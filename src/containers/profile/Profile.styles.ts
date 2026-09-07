import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainview: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 25,
  },
  viewrow: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  img: {
    height: 35,
    width: 35,
    marginTop: 30,
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
  row: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 25,
    fontWeight: '600',
    marginHorizontal: 10,
  },
  text1: {
    fontSize: 20,
    color: '#acacac',
  },
  text2: {
    fontSize: 20,
    fontWeight: '400',
    marginLeft: 10,
  },
  text3: {
    fontSize: 20,
    fontWeight: '400',
    marginLeft: 10,
    color: '#ff000092',
  },
  lines: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10,
  },
  lines1: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    padding: 10,
    margin: 10,
    height: 55,
    width: 55,
  },
  image1: {
    padding: 10,
  },
  order: {
    backgroundColor: '#e9e9e9',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    color: 'red',
    margin: 15,
  },
});

export default styles;
