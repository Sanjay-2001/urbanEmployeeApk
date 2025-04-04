import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import componentStyles from '../styles/componentStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../utils/COLORS';
import ConfrimModal from './ConfrimModal';
import {api} from '../utils/apiServices';
import Loading from './Loading';

const OrderCard = ({order, onPress, employeeId, refreshOrders}) => {
  const {orderId, recipientName, recipientPhoneNo, totalAmount, status, _id} =
    order.order;
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const handleStart = async () => {
    setIsLoading(true);
    try {
      const result = api.patch(
        `update-employee-order/employeeOrder?employeeId=${employeeId}&orderId=${_id}`,
        {
          deliveryStartTime: new Date(),
        },
      );

      console.log('result::', result);
      await refreshOrders();
    } catch (error) {
      console.log('error:', error);
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setIsLoading(false);
      setShowModal(false);
    }
  };

  return (
    <>
      {status === 'inprogress' && (
        <TouchableOpacity onPress={onPress}>
          <View
            style={[
              componentStyles.orderCard,
              {
                backgroundColor:
                  order?.deliveryStartTime && status === 'inprogress'
                    ? COLORS.opaqueBackground
                    : COLORS.white,
              },
            ]}>
            <View>
              {order?.deliveryStartTime && status === 'inprogress' ? (
                <MaterialCommunityIcons
                  name="truck-fast-outline"
                  style={componentStyles.truckIcon}
                />
              ) : (
                <Ionicons
                  name="basket-outline"
                  style={componentStyles.basketIcon}
                />
              )}
            </View>
            {/* detail columm */}
            <View style={componentStyles.detailColumn}>
              <Text
                style={componentStyles.orderId}
                numberOfLines={1}
                ellipsizeMode="tail">
                Order #{orderId}
              </Text>
              <Text
                style={componentStyles.name}
                numberOfLines={1}
                ellipsizeMode="tail">
                {recipientName}
              </Text>
              <Text
                style={componentStyles.phone}
                numberOfLines={1}
                ellipsizeMode="tail">
                {recipientPhoneNo}
              </Text>
            </View>
            {/* action colum */}
            <View style={componentStyles.actionColumn}>
              <Text
                style={[
                  componentStyles.priceText,
                  order?.deliveryStartTime &&
                    status === 'inprogress' &&
                    componentStyles.priceTextHighlighted,
                ]}
                numberOfLines={1}
                ellipsizeMode="tail">
                ₹{totalAmount}
              </Text>
              {!order?.deliveryStartTime && status === 'inprogress' && (
                <TouchableOpacity
                  style={componentStyles.button}
                  onPress={openModal}>
                  <Text style={componentStyles.buttonText}>Start</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </TouchableOpacity>
      )}

      <ConfrimModal
        showModal={showModal}
        setShowModal={setShowModal}
        onConfirm={handleStart}
        modalTitle={'Please Confrim'}
        modalDescription={'Are you sure you want to start the delivery?'}
        modalButtonText={'Start'}
      />

      {isLoading && <Loading />}
    </>
  );
};

export default OrderCard;
