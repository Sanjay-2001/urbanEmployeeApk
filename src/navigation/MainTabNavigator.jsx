import React, {useState} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Orders, Profile} from '../screens';
import {ms, s, vs} from 'react-native-size-matters';
import COLORS from '../utils/COLORS';
import {ConfrimModal} from '../components';

const MainTabNavigator = ({handleLogout}) => {
  const Tab = createBottomTabNavigator();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const HeaderLeft = ({onPress}) => (
    <TouchableOpacity onPress={onPress} style={styles.headerButton}>
      <Ionicons name="arrow-undo" size={s(20)} color="#fff" />
    </TouchableOpacity>
  );

  const onLogoutConfirm = async () => {
    await handleLogout();
    setShowLogoutModal(false);
  };

  const HeaderRight = () => {
    return (
      <TouchableOpacity
        onPress={() => setShowLogoutModal(true)}
        style={styles.headerButton2}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    );
  };

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
    <>
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
            headerLeft: () => (
              <HeaderLeft onPress={() => navigation.goBack()} />
            ),
          })}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={({navigation}) => ({
            title: 'SearchIN_DPartner',
            headerLeft: () => (
              <HeaderLeft onPress={() => navigation.goBack()} />
            ),
            headerRight: () => <HeaderRight />,
          })}
        />
      </Tab.Navigator>

      {/* Logout Confirmation Modal */}

      <ConfrimModal
        showModal={showLogoutModal}
        setShowModal={setShowLogoutModal}
        onConfirm={onLogoutConfirm}
        modalTitle={'Confirm Logout'}
        modalDescription={'Are you sure you want to logout?'}
        modalButtonText={'Logout'}
      />
    </>
  );
};

const styles = StyleSheet.create({
  headerButton: {
    marginHorizontal: s(16),
    paddingHorizontal: ms(6),
    paddingVertical: vs(8),
  },
  headerButton2: {
    marginHorizontal: s(16),
    paddingHorizontal: ms(8),
    paddingVertical: vs(6),
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
  },
  customButton: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  logoutText: {
    color: COLORS.white,
    fontSize: s(12),
    fontFamily: 'Poppins-Regular',
  },
});

export default MainTabNavigator;
