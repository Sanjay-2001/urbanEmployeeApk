import React, {useEffect, useRef} from 'react';
import {Animated, TouchableOpacity, View, StyleSheet} from 'react-native';
import COLORS from '../utils/COLORS';
import {ms, s, vs} from 'react-native-size-matters';

const CustomSwitch = ({value, onValueChange}) => {
  const offset = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(offset, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const translateX = offset.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  return (
    <TouchableOpacity onPress={() => onValueChange(!value)} activeOpacity={0.9}>
      <View
        style={[
          styles.track,
          {backgroundColor: value ? COLORS.primary : COLORS.lightGray},
        ]}>
        <Animated.View style={[styles.thumb, {transform: [{translateX}]}]} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  track: {
    width: s(40),
    height: vs(20),
    borderRadius: 30,
    justifyContent: 'center',
  },
  thumb: {
    width: ms(26),
    height: ms(26),
    borderRadius: 13,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default CustomSwitch;
