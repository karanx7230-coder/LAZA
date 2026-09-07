import { StyleSheet } from 'react-native';
import { Colors } from '../../utils';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
  },
  login: {
    flex: 1,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  spacer: {
    flex: 0.4,
  },
  back: {
    width: 50,
    height: 50,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  backtext: {
    fontSize: 40,
    color: Colors.black,
    textAlign: 'center',
  },
  signup: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 0,
  },
  line1: {
    fontSize: 15,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 0,
  },
  textinput: {
    marginBottom: 25,
  },
  type: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 10,
  },
  line: {
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: '500',
    padding: 0,
    borderBottomWidth: 1,
  },
  inputFocused: {
    borderBottomColor: 'blue',
  },
  inputBlurred: {
    borderBottomColor: 'grey',
  },
  passwordIcon: {
    marginRight: 10,
    width: 24,
    height: 24,
    marginLeft: -25,
    marginBottom: 10,
  },
  rememberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  forgotbtn: {
    marginLeft: 'auto',
  },
  forget: {
    color: Colors.error,
  },
  rememberText: {
    fontSize: 16,
  },
  term: {
    fontWeight: 'bold',
  },
  endview: {
    margin: 20,
  },
  endline: {
    fontSize: 14,
  },
  signupButton: {
    backgroundColor: Colors.primaryDark,
    paddingVertical: 20,
    alignItems: 'center',
    height: 80,
    width: '100%',
  },
  signupButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: -20,
  },
  error: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 5,
  },
});

export default styles;
