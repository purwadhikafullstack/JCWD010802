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
  useDisclosure,
} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../../../../api/axios";
import headersGen from "../../../../../api/headers";

export const DeleteAddress = ({ id, reload, setReload }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  const token = localStorage.getItem("token");
  const headers = headersGen(token)

  const handleSubmit = async () => {
    try {
      const response = await axios.patch(`/address/delete/${id}`, {}, { headers });
      toast.success("Address deleted successfully");
      setReload(!reload);
      onClose();
      console.log(response);
    } catch (error) {
      toast.error("Error deleting address");
      console.log(error);
    }
  };

  return (
    <Box>
      <Button mb={5} colorScheme="red" size={"xs"} onClick={onOpen}>
        Delete
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Are you sure you want to delete this address?
          </ModalHeader>
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </Box>
  );
};
