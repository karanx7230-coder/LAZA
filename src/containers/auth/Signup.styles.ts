import { StyleSheet } from 'react-native';
import { Colors } from '../../utils';

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 45,
    height: 45,
    backgroundColor: Colors.bgLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    borderRadius: 25,
  },
  backArrow: {
    fontSize: 22,
    color: Colors.textDark,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    color: Colors.textMedium,
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
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
    borderBottomColor: Colors.border,
  },
  checkMark: {
    color: Colors.success,
    fontSize: 18,
    fontWeight: 'bold',
  },
  strongText: {
    color: Colors.success,
    fontSize: 14,
    fontWeight: '500',
  },
  rememberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  rememberText: {
    fontSize: 15,
    fontWeight: '500',
  },
  createacc: {
    backgroundColor: Colors.primaryLight,
    width: '120%',
    paddingVertical: 20,
    marginHorizontal: -20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
  textsignin: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    },
  error: {
    color: Colors.googleRed,
    fontSize: 12,
    marginTop: 5,
  },
});

export default styles;
