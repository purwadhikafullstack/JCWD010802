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

export const DeleteWarehouseModal = ({ isOpen, onDelete, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Warehouse</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure you want to delete this warehouse?</ModalBody>
        <ModalFooter>
            <HStack>

          <Button color="black" borderColor={"black"} bg={'transparent'} ml={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="red"  onClick={onDelete}>
            Delete
          </Button>
            </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

