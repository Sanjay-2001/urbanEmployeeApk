import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import componentStyles from '../styles/componentStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const OrderDetailDrawer = ({order, onClose}) => {
  const orderDetails = [
    {
      field: 'Name',
      value: 'Kamal Paygude',
    },
    {
      field: 'Phone',
      value: '8888851112',
    },
    {
      field: 'Location',
      value: 'Wadgaon Budruk, Jadhavnagar',
    },
    {
      field: 'Address',
      value: 'Near Chintamani Apartment, Pune - 411041',
    },
  ];

  return (
    <View style={componentStyles.orderDrawerContainer}>
      <View style={componentStyles.orderDrawer}>
        {/* header */}
        <View style={componentStyles.orderDrawerHeader}>
          <Text style={componentStyles.orderDrawerTitle}>Order Details</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons
              name="close"
              style={componentStyles.orderDrawerCloseIcon}
            />
          </TouchableOpacity>
        </View>

        {/* detail box */}
        <View style={componentStyles.orderDrawerDetailBox}>
          <View style={componentStyles.orderDrawerDetailTitleBox}>
            <MaterialIcons
              name="location-pin"
              style={componentStyles.orderDrawerLocationIcon}
            />
            <Text style={componentStyles.orderDrawerLocationTitle}>
              Drop Location
            </Text>
          </View>

          {orderDetails.map((orderDetail, index) => (
            <View key={index} style={componentStyles.orderDetailRow}>
              <Text style={componentStyles.orderDetailField}>
                {orderDetail.field}:
              </Text>
              <Text style={componentStyles.orderDetailValue}>
                {orderDetail.value}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={componentStyles.orderDrawerUploadButton}>
          <MaterialCommunityIcons
            name="cloud-upload"
            style={componentStyles.orderDrawerUploadButtonIcon}
          />
          <Text style={componentStyles.orderDrawerUploadButtonText}>
            UPLOAD PHOTO
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={componentStyles.orderDrawerConfirmButton}>
          <Text style={componentStyles.orderDrawerConfirmText}>
            CONFIRM DELIVERY
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderDetailDrawer;
