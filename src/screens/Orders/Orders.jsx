import {View} from 'react-native';
import React, {useState} from 'react';
import {OrderCard, OrderDetailDrawer} from '../../components';
import {globalStyles} from '../../styles';
import {FlatList} from 'react-native-gesture-handler';

const Orders = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const orders = [
    {
      orderId: '1538',
      name: 'Pritam Raut',
      phone: '9876543210',
      price: '4610.00',
      status: 'delivery',
    },
    {
      orderId: '1539',
      name: 'Amit Sharma',
      phone: '9823456789',
      price: '599.50',
      status: 'pending',
    },
    {
      orderId: '1540',
      name: 'Neha Verma',
      phone: '9012345678',
      price: '720.25',
      status: 'pending',
    },
    {
      orderId: '1541',
      name: 'Ravi Kumar',
      phone: '9876541230',
      price: '312.75',
      status: 'pending',
    },
    {
      orderId: '1542',
      name: 'Suman Das',
      phone: '9785634120',
      price: '850.00',
      status: 'pending',
    },
    {
      orderId: '1543',
      name: 'Kiran Joshi',
      phone: '9945123789',
      price: '689.90',
      status: 'pending',
    },
    {
      orderId: '1544',
      name: 'Anjali Singh',
      phone: '9108765432',
      price: '430.60',
      status: 'pending',
    },
    {
      orderId: '1545',
      name: 'Rohan Mehta',
      phone: '9087563412',
      price: '499.99',
      status: 'pending',
    },
    {
      orderId: '1546',
      name: 'Swati Patil',
      phone: '9234567890',
      price: '560.30',
      status: 'pending',
    },
    {
      orderId: '1547',
      name: 'Vikram Rao',
      phone: '9876123456',
      price: '295.20',
      status: 'pending',
    },
  ];

  const handleOpenDrawer = order => {
    setSelectedOrder(order);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={orders}
        keyExtractor={item => item.orderId}
        renderItem={({item}) => (
          <OrderCard order={item} onPress={() => handleOpenDrawer(item)} />
        )}
        showsVerticalScrollIndicator={false}
      />
      {isDrawerOpen && (
        <OrderDetailDrawer order={selectedOrder} onClose={handleCloseDrawer} />
      )}
    </View>
  );
};

export default Orders;
