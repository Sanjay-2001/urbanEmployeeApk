import {StyleSheet} from 'react-native';
import {s, ms, vs} from 'react-native-size-matters';
import COLORS from '../utils/COLORS';

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginImage: {
    width: s(100),
    height: s(100),
  },
  loginTitle: {
    fontSize: s(16),
    fontFamily: 'Poppins-SemiBold',
    marginTop: vs(5),
    color: COLORS.text.primary,
  },
  loginSubTitle: {
    fontSize: s(18),
    lineHeight: vs(25),
    fontFamily: 'Poppins-SemiBold',
    marginTop: vs(10),
    color: COLORS.text.primary,
  },
  loginText: {
    fontSize: s(11),
    width: '100%',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    color: COLORS.text.secondary,
    marginBottom: vs(10),
  },
  loginForm: {
    width: '100%',
    marginTop: vs(20),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 8,
    marginBottom: vs(15),
    paddingHorizontal: s(10),
  },
  inputIcon: {
    marginRight: s(10),
  },
  input: {
    flex: 1,
    height: vs(50),
    fontFamily: 'Poppins-Regular',
    color: COLORS.text.primary,
  },
  eyeIcon: {
    padding: s(10),
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: s(15),
    paddingVertical: vs(10),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: vs(10),
    flexDirection: 'row',
    gap: s(10),
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: 'Poppins-SemiBold',
    fontSize: s(16),
  },
  errorText: {
    color: COLORS.danger,
    fontFamily: 'Poppins-Regular',
    fontSize: s(12),
    marginBottom: vs(5),
    textAlign: 'center',
  },
});

export default loginStyles;
