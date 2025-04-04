import {StyleSheet} from 'react-native';
import {s, ms, vs} from 'react-native-size-matters';
import COLORS from '../utils/COLORS';

const componentStyles = StyleSheet.create({
  // order card
  orderCard: {
    padding: ms(20),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: s(20),
  },
  basketIcon: {
    backgroundColor: COLORS.secondary,
    color: COLORS.white,
    fontSize: s(26),
    borderRadius: 50,
    alignSelf: 'flex-start',
    padding: ms(5),
  },
  truckIcon: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    fontSize: s(26),
    borderRadius: 50,
    alignSelf: 'flex-start',
    padding: ms(5),
  },
  detailColumn: {
    flex: 1,
  },
  orderId: {
    fontSize: s(14),
    color: COLORS.text.primary,
    fontFamily: 'Poppins-SemiBold',
  },
  name: {
    fontSize: s(14),
    color: COLORS.primary,
    fontFamily: 'Poppins-SemiBold',
  },
  phone: {
    fontSize: s(14),
    color: COLORS.text.secondary,
    fontFamily: 'Poppins-Regular',
  },
  actionColumn: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  priceTextHighlighted: {
    backgroundColor: COLORS.white,
    paddingHorizontal: s(5),
    paddingTop: vs(2),
    borderRadius: 8,
  },
  priceText: {
    fontSize: s(16),
    color: COLORS.warning,
    fontFamily: 'Poppins-SemiBold',
  },
  button: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: s(15),
    paddingVertical: s(5),
    borderRadius: 8,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: s(14),
    color: COLORS.white,
    fontFamily: 'Poppins-Regular',
  },
  capturedImage: {
    width: s(50),
    height: s(50),
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.primary,
    position: 'absolute',
    top: vs(5),
    left: s(5),
  },
  // order drawer
  orderDrawerContainer: {
    backgroundColor: 'rgba(0, 0, 0,0.2)',
    position: 'absolute',
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  orderDrawer: {
    backgroundColor: COLORS.white,
    width: '100%',
    paddingHorizontal: s(15),
    paddingTop: vs(20),
    paddingBottom: vs(40),
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  orderDrawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderDrawerTitle: {
    fontSize: s(18),
    fontFamily: 'Poppins-SemiBold',
    color: COLORS.text.primary,
  },
  orderDrawerCloseIcon: {
    color: COLORS.gray,
    fontSize: s(26),
  },
  orderDrawerDetailBox: {
    backgroundColor: 'rgba(198, 253, 215, 0.31)',
    borderRadius: 6,
    padding: ms(8),
    marginTop: vs(10),
  },
  orderDrawerDetailTitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(5),
  },
  orderDrawerLocationIcon: {
    color: COLORS.text.primary,
    fontSize: s(20),
  },
  orderDrawerLocationTitle: {
    color: COLORS.text.primary,
    fontSize: s(15),
    fontFamily: 'Poppins-SemiBold',
  },
  orderDetailRow: {
    flexDirection: 'row',
    marginTop: vs(5),
    gap: s(5),
    alignItems: 'flex-start',
  },
  orderDetailField: {
    fontSize: s(14),
    fontFamily: 'Poppins-SemiBold',
    color: COLORS.text.primary,
  },
  orderDetailValue: {
    fontSize: s(14),
    fontFamily: 'Poppins-Regular',
    color: COLORS.text.primary,
    flexShrink: 1,
  },
  orderDrawerUploadButton: {
    backgroundColor: COLORS.secondary,
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: s(20),
    paddingVertical: vs(5),
    borderRadius: 8,
    gap: s(10),
    alignItems: 'center',
    marginVertical: vs(15),
  },
  orderDrawerUploadButtonIcon: {
    color: COLORS.white,
    fontSize: s(20),
  },
  orderDrawerUploadButtonText: {
    color: COLORS.white,
    fontSize: s(14),
    fontFamily: 'Poppins-Regular',
  },
  orderDrawerConfirmButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: s(20),
    paddingVertical: vs(5),
    borderRadius: 8,
    gap: s(10),
    alignItems: 'center',
  },
  orderDrawerConfirmText: {
    color: COLORS.white,
    fontSize: s(14),
    fontFamily: 'Poppins-SemiBold',
  },
});

export default componentStyles;
