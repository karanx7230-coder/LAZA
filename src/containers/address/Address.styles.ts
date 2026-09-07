import { StyleSheet } from 'react-native';
import { Colors } from '../../utils';

const styles = StyleSheet.create({
  mainview: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerRow: {
    flexDirection: 'row',
    marginTop: 45,
    marginBottom: 20,
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
  pagehead: {
    paddingLeft: 110,
    marginTop: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
  head: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 20,
  },
  input: {
    backgroundColor: '#dbdbdb',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 20,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  input1: {
    backgroundColor: '#dbdbdb',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    width: 160,
    paddingHorizontal: 10,
  },
  headbtn: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 20,
    marginHorizontal: 30,
  },
  card: {
    alignSelf: 'center',
    height: 300,
    width: 350,
  },
  last: {
    backgroundColor: Colors.primaryDark,
    height: 80,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  lasttext: {
    alignSelf: 'center',
    padding: 10,
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default styles;
