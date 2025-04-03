import {View, Text, TouchableOpacity, Alert, Platform} from 'react-native';
import React, {useState} from 'react';
import componentStyles from '../styles/componentStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchCamera} from 'react-native-image-picker';
import ConfrimModal from './ConfrimModal';
import COLORS from '../utils/COLORS';

const OrderDetailDrawer = ({order, onClose}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);
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

  const handleTakePhoto = async () => {
    // Request camera permission
    try {
      const options = {
        mediaType: 'photo',
        quality: 0.8,
        saveToPhotos: true,
        cameraType: 'back',
      };

      launchCamera(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
          Alert.alert('Error', 'Failed to take photo');
        } else if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri;
          setPhotoUri(uri);
          console.log('Photo taken:', {
            uri: uri,
            width: response.assets[0].width,
            height: response.assets[0].height,
            fileSize: response.assets[0].fileSize,
            type: response.assets[0].type,
          });
          Alert.alert('Success', 'Photo captured successfully');
        }
      });
    } catch (err) {
      console.log('Camera error:', err);
      Alert.alert('Error', 'Failed to access camera');
    }
  };

  const handleConfirmDelivery = () => {
    if (!photoUri) {
      Alert.alert(
        'Photo required',
        'Please take a photo before confirming delivery',
      );
      return;
    }
    setShowConfirmModal(true);
  };

  const onConfirmDelivery = () => {
    console.log('Delivery confirmed with photo:', photoUri);
    setShowConfirmModal(false);
    onClose();
    // Here you would typically upload the photo to your server
  };

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

        {order?.status === 'delivery' && (
          <>
            <TouchableOpacity
              style={componentStyles.orderDrawerUploadButton}
              onPress={handleTakePhoto}>
              <MaterialCommunityIcons
                name={photoUri ? 'check-circle' : 'cloud-upload'}
                style={[
                  componentStyles.orderDrawerUploadButtonIcon,
                  photoUri && {color: COLORS.lightBackground},
                ]}
              />
              <Text style={componentStyles.orderDrawerUploadButtonText}>
                {photoUri ? 'PHOTO TAKEN' : 'UPLOAD PHOTO'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={componentStyles.orderDrawerConfirmButton}
              onPress={handleConfirmDelivery}>
              <Text style={componentStyles.orderDrawerConfirmText}>
                CONFIRM DELIVERY
              </Text>
            </TouchableOpacity>
          </>
        )}
        <ConfrimModal
          showModal={showConfirmModal}
          setShowModal={setShowConfirmModal}
          onConfirm={onConfirmDelivery}
          modalTitle="Confirm Delivery"
          modalDescription="Are you sure you want to confirm this delivery?"
          modalButtonText="CONFIRM"
        />
      </View>
    </View>
  );
};

export default OrderDetailDrawer;
