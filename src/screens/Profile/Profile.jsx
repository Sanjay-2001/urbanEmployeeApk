import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {profileStyles} from '../../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from '../../utils/apiServices';
import Loading from '../../components/Loading';
import CustomSwitch from '../../components/CustomSwitch';

const Profile = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleAvailability = async () => {
    setIsLoading(true);
    const employeeId = userData?._id;
    try {
      const result = await api.patch(`employees/update/${employeeId}`, {
        isActive: !userData.isActive,
      });

      await fetchUserData();
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);

        const result = await api.get(`employees/${parsedUser._id}`);

        setUserData(result.data);
        setIsAvailable(result.data.isActive);
      } else {
        console.log('No user data found');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
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
              <CustomSwitch
                value={isAvailable}
                onValueChange={toggleAvailability}
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
