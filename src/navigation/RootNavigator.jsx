import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image, StyleSheet, View} from 'react-native';
import COLORS from '../utils/COLORS';
import {ms} from 'react-native-size-matters';

const RootStack = createStackNavigator();

const RootNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);

  const handleLogin = async token => {
    setLoginLoading(true);
    try {
      await AsyncStorage.setItem('userToken', token);
      setUserToken(token);
    } catch (e) {
      console.error('Failed to save token', e);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('user');
      setUserToken(null);
    } catch (e) {
      console.error('Failed to remove token', e);
    }
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setUserToken(token);
      } catch (e) {
        console.error('Failed to load token', e);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/images/app_logo.png')}
          style={styles.app_logo}
        />
      </View>
    );
  }

  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      {userToken ? (
        <RootStack.Screen name="Main">
          {props => <MainTabNavigator {...props} handleLogout={handleLogout} />}
        </RootStack.Screen>
      ) : (
        <RootStack.Screen name="Auth">
          {props => (
            <AuthNavigator
              {...props}
              handleLogin={handleLogin}
              loginLoading={loginLoading}
            />
          )}
        </RootStack.Screen>
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;

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
