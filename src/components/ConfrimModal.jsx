import React from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {globalStyles} from '../styles';

const ConfrimModal = ({
  showModal,
  setShowModal,
  onConfirm,
  modalTitle,
  modalDescription,
  modalButtonText,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showModal}
      onRequestClose={() => setShowModal(false)}>
      <View style={globalStyles.modalContainer}>
        <View style={globalStyles.modalContent}>
          <Text style={globalStyles.modalTitle}>
            {modalTitle || 'Please Confrim'}
          </Text>
          <Text style={globalStyles.modalText}>
            {modalDescription || 'Are you sure you want to confirm?'}
          </Text>

          <View style={globalStyles.modalButtons}>
            <TouchableOpacity
              style={[globalStyles.modalButton, globalStyles.cancelButton]}
              onPress={() => setShowModal(false)}>
              <Text style={globalStyles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[globalStyles.modalButton, globalStyles.confirmButton]}
              onPress={onConfirm}>
              <Text style={globalStyles.modalButtonText}>
                {modalButtonText || 'Confirm'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfrimModal;
