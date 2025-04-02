import {
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Orders, Profile} from '../screens';
import {ms, s, vs} from 'react-native-size-matters';
import COLORS from '../utils/COLORS';

const StackNavigator = () => {
  const Tab = createBottomTabNavigator();

  const HeaderLeft = ({onPress}) => (
    <TouchableOpacity onPress={onPress} style={styles.headerButton}>
      <Ionicons name="arrow-undo" size={s(20)} color="#fff" />
    </TouchableOpacity>
  );

  const HeaderRight = ({onPress}) => (
    <TouchableOpacity onPress={onPress} style={styles.headerButton}>
      <Ionicons name="log-out-outline" size={s(24)} color="#fff" />
    </TouchableOpacity>
  );

  const CustomTabButton = props => (
    <TouchableWithoutFeedback {...props}>
      <View style={styles.customButton}>{props.children}</View>
    </TouchableWithoutFeedback>
  );

  const TabBarIcon = ({route, focused, color, size}) => {
    const iconMap = {
      Profile: focused ? 'person' : 'person-outline',
      Orders: focused ? 'list' : 'list-outline',
    };

    return <Ionicons name={iconMap[route.name]} size={size} color={color} />;
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({focused, color, size}) => (
          <TabBarIcon
            route={route}
            focused={focused}
            color={color}
            size={size}
          />
        ),
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarButton: props => <CustomTabButton {...props} />,

        headerStyle: {
          backgroundColor: COLORS.primary,
          elevation: 0,
          shadowOpacity: 0,
          height: vs(50),
          paddingHorizontal: s(5),
          paddingVertical: vs(5),
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'Poppins-SemiBold',
          fontSize: s(16),
        },
      })}>
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={({navigation}) => ({
          title: 'Fulfillment Orders',
          headerLeft: () => <HeaderLeft onPress={() => navigation.goBack()} />,
        })}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={({navigation}) => ({
          title: 'SearchIN_DPartner',
          headerLeft: () => <HeaderLeft onPress={() => navigation.goBack()} />,
          headerRight: () => (
            <HeaderRight onPress={() => console.log('Logout pressed')} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({
  headerButton: {
    marginHorizontal: s(16),
    paddingHorizontal: ms(6),
    paddingVertical: vs(8),
  },
  customButton: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
