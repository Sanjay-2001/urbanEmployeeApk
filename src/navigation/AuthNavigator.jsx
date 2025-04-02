import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from '../screens';

const AuthStack = createStackNavigator();

const AuthNavigator = ({handleLogin}) => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Login">
        {props => <Login {...props} handleLogin={handleLogin} />}
      </AuthStack.Screen>
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
