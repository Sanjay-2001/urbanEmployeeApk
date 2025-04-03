import {StyleSheet} from 'react-native';
import {s, ms, vs} from 'react-native-size-matters';
import COLORS from '../utils/COLORS';

const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: s(20),
    gap: vs(20),
  },
  card: {
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    padding: ms(10),
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
  profileIcon: {
    fontSize: s(100),
    color: COLORS.lightBackground,
  },
  title: {
    fontSize: s(14),
    fontFamily: 'Poppins-SemiBold',
    marginVertical: vs(8),
    color: COLORS.text.primary,
  },
  subTitle: {
    fontSize: s(12),
    fontFamily: 'Poppins-Regular',
    color: COLORS.text.placeholder,
  },
  card2: {
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
  title2: {
    fontSize: s(14),
    fontFamily: 'Poppins-SemiBold',
    color: COLORS.white,
    backgroundColor: COLORS.primary,
    paddingHorizontal: ms(10),
    paddingVertical: ms(6),
    marginBottom: vs(5),
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  detailRow: {
    flexDirection: 'row',
    gap: s(5),
    alignItems: 'center',
    marginBottom: vs(10),
    paddingHorizontal: ms(10),
  },
  detailTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: s(12),
    color: COLORS.text.primary,
  },
  detailValue: {
    fontFamily: 'Poppins-Regular',
    fontSize: s(12),
    color: COLORS.text.secondary,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(10),
  },
  availabilityText: {
    fontFamily: 'Poppins-Regular',
    fontSize: s(12),
    color: COLORS.white,
    borderRadius: 5,
    paddingHorizontal: s(6),
  },
  availabilityTextHighlighted: {
    backgroundColor: COLORS.lightBackground,
  },
  nonavailabilityTextHighlighted: {
    backgroundColor: '#f47575',
  },
  switch: {
    transform: [{scaleX: 0.8}, {scaleY: 0.8}],
  },
});

export default profileStyles;
