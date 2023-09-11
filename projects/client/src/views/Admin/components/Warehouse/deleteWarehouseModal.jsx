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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


export const DeleteWarehouseModal = ({ isOpen,id, onClose, warehouseName, setReload, reload}) => {

  const handleSubmit = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/warehouse/${id}`
      );
      toast.success('Warehouse deleted successfully');
      onClose()
      setReload(!reload)
      console.log(response);
    } catch (error) {
      toast.error('Error deleting address');
      console.log(error);
    }
  };
  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Warehouse</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure you want to delete {warehouseName}?</ModalBody>
        <ModalFooter>
            <HStack>

          <Button color="black" borderColor={"black"} bg={'transparent'} ml={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="red"  onClick={handleSubmit}>
            Delete
          </Button>
            </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </>
  );
};

