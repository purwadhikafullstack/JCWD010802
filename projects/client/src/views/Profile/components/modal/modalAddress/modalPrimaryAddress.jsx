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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../../../../../api/axios";
import headersGen from "../../../../../api/headers";

export const PrimaryAddress = ({ id, onOpen, onClose, reload, setReload }) => {
  const finalRef = React.useRef(null);
  const token = localStorage.getItem("token");
  const headers = headersGen(token)

  const handleSubmit = async () => {
    try {
      const response = await axios.patch(`/address/primary/${id}`, {}, { headers }
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
