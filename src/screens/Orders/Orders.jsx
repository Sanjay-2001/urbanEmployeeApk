import {RefreshControl, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {OrderCard, OrderDetailDrawer} from '../../components';
import {globalStyles} from '../../styles';
import {FlatList} from 'react-native-gesture-handler';
import {api} from '../../utils/apiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../components/Loading';
import COLORS from '../../utils/COLORS';

const Orders = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [orders, setOrders] = useState([]);

  const handleOpenDrawer = order => {
    setSelectedOrder(order);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          const parsedUser = JSON.parse(user);
          setUserData(parsedUser);
        } else {
          console.log('No user data found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      getOrderDetails();
    }
  }, [userData]);

  const getOrderDetails = async () => {
    setIsLoading(true);
    const employeeId = userData?._id;
    try {
      const result = await api.get(`employee-orders/${employeeId}`);
      setOrders(result);
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getOrderDetails();
  };

  return (
    <>
      <View style={globalStyles.container}>
        <FlatList
          data={orders}
          keyExtractor={item => item.order.orderId}
          renderItem={({item}) => (
            <OrderCard
              order={item}
              onPress={() => handleOpenDrawer(item)}
              employeeId={userData._id}
            />
          )}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.primary]}
              tintColor={COLORS.primary}
            />
          }
        />
        {isDrawerOpen && (
          <OrderDetailDrawer
            order={selectedOrder}
            onClose={handleCloseDrawer}
            employeeId={userData._id}
            refreshOrders={getOrderDetails}
          />
        )}
      </View>
      {isLoading && <Loading />}
    </>
  );
};

export default Orders;
