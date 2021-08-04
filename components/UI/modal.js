import React from 'react';
import {StyleSheet} from 'react-native';
import {Modal as PaperModal, Portal} from 'react-native-paper';

export const Modal = ({visible, hideModal, children}) => {
  return (
    <Portal>
      <PaperModal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modal}
      >
        {children}
      </PaperModal>
    </Portal>
  )
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    borderRadius: 4
  }
});
