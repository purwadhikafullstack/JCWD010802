import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../../../../api/axios";

export const ModalDeleteCategory = ({ id, isOpen, onClose, reload, setReload }) => {
  const finalRef = React.useRef(null);

  const handleSubmit = async () => {
    try {
      const response = await axios.patch(
        `/category/delete/${id}`
      );
      toast.success("Category deleted successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setReload(!reload);
      onClose();
    } catch (err) {
      console.log(err);
      toast.error("Error deleting category", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Are you sure you want to delete this category?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button colorScheme="whatsapp" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="red" onClick={handleSubmit}>
              Accept
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ToastContainer />
    </>
  );
};
