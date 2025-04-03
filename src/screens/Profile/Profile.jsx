import {View, Text, Switch} from 'react-native';
import React, {useEffect, useState} from 'react';
import {profileStyles} from '../../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../../utils/COLORS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from '../../utils/apiServices';
import Loading from '../../components/Loading';

const Profile = () => {
  const [isAvailable, setIsAvailable] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleAvailability = async () => {
    setIsLoading(true);
    const employeeId = userData?._id;
    try {
      const result = await api.patch(`employees/update/${employeeId}`, {
        isActive: !isAvailable,
      });
      setIsAvailable(!isAvailable);
      console.log('result', result?.isActive);
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          const parsedUser = JSON.parse(user);
          setUserData(parsedUser);
          setIsAvailable(parsedUser.isActive);
        } else {
          console.log('No user data found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const users = [
    {
      field: 'Mobile',
      value: userData?.mobile,
    },
    {
      field: 'Store',
      value: 'Urban Bazaar',
    },
    {
      field: 'Department',
      value: userData?.role,
    },
    {
      field: 'Position',
      value: 'Employee',
    },
  ];

  return (
    <>
      <View style={profileStyles.container}>
        {/* User Card */}
        <View style={profileStyles.card}>
          <Ionicons name="person-circle" style={profileStyles.profileIcon} />
          <Text style={profileStyles.title}>{userData?.name || ''}</Text>
          <Text style={profileStyles.subTitle}>Employee</Text>
          <Text style={profileStyles.subTitle}>Dispatch</Text>
        </View>

        {/* User Detail Card */}
        <View style={profileStyles.card2}>
          <Text style={profileStyles.title2}>Employee Information</Text>

          {users.map((user, index) => (
            <View style={profileStyles.detailRow} key={index}>
              <Text style={profileStyles.detailTitle}>{user?.field}:</Text>
              <Text
                style={profileStyles.detailValue}
                numberOfLines={1}
                ellipsizeMode="tail">
                {user?.value}
              </Text>
            </View>
          ))}

          <View style={profileStyles.detailRow}>
            <Text style={profileStyles.detailTitle}>Availability:</Text>
            <View style={profileStyles.availabilityContainer}>
              <Switch
                trackColor={{false: COLORS.lightGray, true: COLORS.primary}}
                thumbColor={COLORS.white}
                ios_backgroundColor={COLORS.lightGray}
                onValueChange={toggleAvailability}
                value={isAvailable}
                style={profileStyles.switch}
              />
              <Text
                style={[
                  profileStyles.availabilityText,
                  isAvailable
                    ? profileStyles.availabilityTextHighlighted
                    : profileStyles.nonavailabilityTextHighlighted,
                ]}>
                {isAvailable ? 'Present' : 'Absent'}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {isLoading && <Loading />}
    </>
  );
};

export default Profile;
