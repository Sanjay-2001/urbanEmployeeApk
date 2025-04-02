import {StyleSheet} from 'react-native';
import {s, ms, vs} from 'react-native-size-matters';
import COLORS from '../utils/COLORS';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: ms(20),
    elevation: 5,
  },
  modalTitle: {
    fontSize: s(16),
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Poppins-SemiBold',
    color: COLORS.black,
  },
  modalText: {
    fontSize: s(14),
    marginBottom: vs(20),
    fontFamily: 'Poppins-Regular',
    color: COLORS.black,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: s(10),
  },
  modalButton: {
    paddingVertical: vs(8),
    paddingHorizontal: s(15),
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: COLORS.gray,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
  },
  modalButtonText: {
    color: COLORS.white,
    fontFamily: 'Poppins-Regular',
    fontSize: s(14),
  },
});

export default globalStyles;
