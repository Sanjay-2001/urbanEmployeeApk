import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/stack/StackNavigator';
import {SafeAreaView, StyleSheet} from 'react-native';
import COLORS from './src/utils/COLORS';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
