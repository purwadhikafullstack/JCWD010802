import React from "react";
import {
  Box,
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const DeleteProduct = ({ product, isOpen, onClose, reload }) => {

  const finalRef = React.useRef(null);
  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/product/delete/${product.id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success('Product successfuly deleted', {
        position: "top-right",
        autoClose: 3000
      });
      reload()
      onClose();
      console.log(response);
    } catch (error) {
      toast.error('Error deleting product', {
        position: "top-right",
        autoClose: 3000
      });
      console.log(error);
    }
  };

  return (
    <Box>
      <ToastContainer />
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure you want to delete this product?</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="green" type="submit" onClick={handleSubmit}>
              Accept
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </Box>
  );
};
