import 'react-native-gesture-handler';
import 'react-native-reanimated';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import {globalStyles} from './src/styles';

export default function App() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}
