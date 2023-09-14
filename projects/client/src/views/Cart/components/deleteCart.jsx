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

export const DeleteCart = ({ isOpen, onClose, onDelete }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to remove item from cart? 
        </ModalBody>

        <ModalFooter>
            <HStack gap={3}>
          <Button onClick={onClose} colorScheme='red'>No</Button>
          <Button colorScheme="green" onClick={onDelete}>
            Yes
          </Button>
            </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

