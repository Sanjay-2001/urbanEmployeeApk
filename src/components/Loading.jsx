import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import React from 'react';
import COLORS from '../utils/COLORS';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.lightBackground} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});

export default Loading;
