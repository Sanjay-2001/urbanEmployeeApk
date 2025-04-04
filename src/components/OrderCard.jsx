import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import componentStyles from '../styles/componentStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../utils/COLORS';
import ConfrimModal from './ConfrimModal';
import {api} from '../utils/apiServices';
import Loading from './Loading';

const OrderCard = ({order, onPress, employeeId}) => {
  const {orderId, recipientName, recipientPhoneNo, totalAmount, status, _id} =
    order.order;
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (status !== 'inprogress') {
    return;
  }

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
    } catch (error) {
      console.log('error:', error);
    } finally {
      setIsLoading(false);
      setShowModal(false);
    }
  };

  return (
    <>
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
          <TouchableOpacity onPress={onPress}>
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
          </TouchableOpacity>
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
