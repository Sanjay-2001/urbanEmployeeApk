import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import COLORS from '../../utils/COLORS';
import {ms} from 'react-native-size-matters';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Profile');
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/app_logo.png')}
        style={styles.app_logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  app_logo: {
    height: ms(150),
    width: ms(150),
  },
});

export default Splash;
