import { StyleSheet } from 'react-native';
import { Colors } from '../../utils';

const styles = StyleSheet.create({
  mainview: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 100, // clears the absolute-positioned button
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 45,
    marginBottom: 10,
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
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  head: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
    color: 'black',
  },
  imagecard: {
    marginVertical: 20,
    alignSelf: 'center',
    width: '100%',
    height: 200,
  },
  addnew: {
    backgroundColor: Colors.primarySoft,
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
    color: 'black',
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
    fontSize: 18,
    fontWeight: '600',
  },
});

export default styles;
