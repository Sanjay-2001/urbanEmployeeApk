import {View, Text, TouchableOpacity, Alert, Image} from 'react-native';
import React, {useState} from 'react';
import componentStyles from '../styles/componentStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchCamera} from 'react-native-image-picker';
import ConfrimModal from './ConfrimModal';
import COLORS from '../utils/COLORS';
import {api} from '../utils/apiServices';
import Loading from './Loading';

const OrderDetailDrawer = ({order, onClose, employeeId, refreshOrders}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const orderDetails = [
    {
      field: 'Name',
      value: order?.order?.recipientName,
    },
    {
      field: 'Phone',
      value: order?.order?.recipientPhoneNo,
    },
    {
      field: 'Location Type',
      value: order?.order?.locationType,
    },
    {
      field: 'Address',
      value: order?.order?.addressLine,
    },
  ];

  const handleImageupload = async downloadURL => {
    try {
      const response = await api.patch(
        `update-employee-order/employeeOrder?employeeId=${employeeId}&orderId=${order?.order?._id}`,
        {imageUrl: [downloadURL], imageCaptureTime: new Date()},
      );
      console.log('response', response);
      setUploadSuccess(true);
      Alert.alert('Success', 'Photo uploaded successfully');
    } catch (error) {
      console.log('error', error);
      Alert.alert('Error', 'Something went wrong during the upload');
    } finally {
      setIsUploading(false);
    }
  };

  const imageUpload = async (uploadURL, downloadURL, file) => {
    try {
      const response = await fetch(uploadURL, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      await handleImageupload(downloadURL);
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Error', 'Something went wrong during the upload');
    } finally {
      setIsUploading(false);
    }
  };

  const getImageUrl = async (fileType, file) => {
    try {
      setIsUploading(true);
      setUploadSuccess(false);
      const fileName = String(Date.now());

      const response = await api.get(
        `get-upload-url?fileName=${fileName}&fileType=${fileType}`,
      );

      if (response?.uploadURL && response?.downloadURL) {
        await imageUpload(response?.uploadURL, response?.downloadURL, file);
      }
    } catch (error) {
      console.log('error', error);
      Alert.alert('Error', 'Something went wrong during the upload');
    } finally {
      setIsUploading(false);
    }
  };

  const handleTakePhoto = async () => {
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
          setPhoto(response.assets[0]);

          getImageUrl(response.assets[0].type, response.assets[0]);
        }
      });
    } catch (err) {
      console.log('Camera error:', err);
      Alert.alert('Error', 'Failed to access camera');
    }
  };

  const handleConfirmDelivery = () => {
    if (!photo) {
      Alert.alert(
        'Photo required',
        'Please take a photo before confirming delivery',
      );
      return;
    }
    setShowConfirmModal(true);
  };

  const handleDeliveryEndTime = async () => {
    try {
      const response = await api.patch(
        `/update-employee-order/employeeOrder?employeeId=${employeeId}&orderId=${order?.order?._id}`,
        {
          deliveryEndTime: new Date(),
        },
      );

      if (response) {
        Alert.alert('Success', 'Delivery completed successfully');
        await refreshOrders();
      }
    } catch (error) {
      console.log(' error:', error);
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setIsConfirming(false);
    }
  };

  const onConfirmDelivery = async () => {
    setIsConfirming(true);
    try {
      const response = await api.put(`orders/update/${order?.order?._id}`, {
        status: 'delivered',
      });

      if (response) {
        await handleDeliveryEndTime();
      }
    } catch (error) {
      console.log(' error:', error);
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setIsConfirming(false);
    }
    setShowConfirmModal(false);
    onClose();
  };

  return (
    <>
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

          {order?.deliveryStartTime &&
            order?.order?.status === 'inprogress' && (
              <>
                <View>
                  <TouchableOpacity
                    style={componentStyles.orderDrawerUploadButton}
                    onPress={handleTakePhoto}>
                    <MaterialCommunityIcons
                      name={photo ? 'check-circle' : 'cloud-upload'}
                      style={[
                        componentStyles.orderDrawerUploadButtonIcon,
                        photo && {color: COLORS.lightBackground},
                      ]}
                    />
                    <Text style={componentStyles.orderDrawerUploadButtonText}>
                      {photo ? 'PHOTO TAKEN' : 'UPLOAD PHOTO'}
                    </Text>
                  </TouchableOpacity>
                  {photo && (
                    <Image
                      source={{uri: photo.uri}}
                      style={componentStyles.capturedImage}
                    />
                  )}
                </View>

                <TouchableOpacity
                  style={[
                    componentStyles.orderDrawerConfirmButton,
                    !uploadSuccess && {backgroundColor: COLORS.gray},
                  ]}
                  disabled={!uploadSuccess}
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

      {(isUploading || isConfirming) && <Loading />}
    </>
  );
};

export default OrderDetailDrawer;
