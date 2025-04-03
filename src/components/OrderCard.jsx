import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import componentStyles from '../styles/componentStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../utils/COLORS';

const OrderCard = ({order, onPress}) => {
  const {orderId, name, phone, price, status} = order;
  return (
    <View
      style={[
        componentStyles.orderCard,
        {
          backgroundColor:
            status === 'delivery' ? COLORS.opaqueBackground : COLORS.white,
        },
      ]}>
      <View>
        <TouchableOpacity onPress={onPress}>
          {status === 'delivery' && (
            <MaterialCommunityIcons
              name="truck-fast-outline"
              style={componentStyles.truckIcon}
            />
          )}
          {status === 'pending' && (
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
          {name}
        </Text>
        <Text
          style={componentStyles.phone}
          numberOfLines={1}
          ellipsizeMode="tail">
          {phone}
        </Text>
      </View>
      {/* action colum */}
      <View style={componentStyles.actionColumn}>
        <Text
          style={[
            componentStyles.priceText,
            status === 'delivery' && componentStyles.priceTextHighlighted,
          ]}
          numberOfLines={1}
          ellipsizeMode="tail">
          ₹{price}
        </Text>
        {status === 'pending' && (
          <TouchableOpacity style={componentStyles.button}>
            <Text style={componentStyles.buttonText}>Start</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default OrderCard;
