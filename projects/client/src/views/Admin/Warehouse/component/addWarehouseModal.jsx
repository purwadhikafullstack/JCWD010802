import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import { AddWarehouse } from './addWarehouse';

export const AddWarehouseModal = ({ isOpen, onAdd, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Warehouse</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <AddWarehouse onAdd={onAdd} onCancel={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

