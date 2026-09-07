import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#f9d7d719',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
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
  just: { justifyContent: 'space-between' },

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

export default styles;
