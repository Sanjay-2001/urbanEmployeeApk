import {View, Text, Switch} from 'react-native';
import React, {useState} from 'react';
import {profileStyles} from '../../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../../utils/COLORS';

const Profile = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  const toggleAvailability = () =>
    setIsAvailable(previousState => !previousState);

  const users = [
    {
      field: 'Mobile',
      value: '9730012672',
    },
    {
      field: 'Store',
      value: 'Urban Bazaar',
    },
    {
      field: 'Department',
      value: 'Delivery',
    },
    {
      field: 'Position',
      value: 'Employee',
    },
  ];

  return (
    <View style={profileStyles.container}>
      {/* User Card */}
      <View style={profileStyles.card}>
        <Ionicons name="person-circle" style={profileStyles.profileIcon} />
        <Text style={profileStyles.title}>SearchIN_DPartner</Text>
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
            <Text style={profileStyles.availabilityText}>
              {isAvailable ? 'Present' : 'Absent'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;
