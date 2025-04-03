import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from '../screens';

const AuthStack = createStackNavigator();

const AuthNavigator = ({handleLogin, loginLoading}) => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Login">
        {props => (
          <Login
            {...props}
            handleLogin={handleLogin}
            loginLoading={loginLoading}
          />
        )}
      </AuthStack.Screen>
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
