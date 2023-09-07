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

export const PrimaryAddress = ({ id, onOpen, onClose, reload, setReload }) => {
  const finalRef = React.useRef(null);
  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/address/primary/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success('Primary address changed successfully');
      setReload(!reload)
      onClose();
    } catch (error) {
      toast.error('Error changing primary address');
      console.log(error);
    }
  };

  return (
    <Box>
      <Modal finalFocusRef={finalRef} isOpen={onOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure you want to change your primary address?</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button colorScheme="whatsapp" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" type="submit" onClick={handleSubmit}>
              Change
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </Box>
  );
};
