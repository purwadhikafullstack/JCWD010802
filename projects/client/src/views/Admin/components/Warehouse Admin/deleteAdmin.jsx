import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  HStack,
} from '@chakra-ui/react';

export const DeleteUserModal = ({ isOpen, onClose, onDelete, adminName }) => {
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Remove Admin</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to remove {adminName} as admin?
        </ModalBody>

        <ModalFooter>
          <HStack gap={2}>

          <Button onClick={onClose} colorScheme='red'>Cancel</Button>
          <Button colorScheme="green" onClick={onDelete}>
            Remove
          </Button>
            </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

