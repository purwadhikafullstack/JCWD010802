import React from "react";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import 'react-toastify/dist/ReactToastify.css';
import { AddressCheckout } from "../AddressCheckout";

export const ModalChooseAddress = ({ id, onOpen, onClose, handleClick, selectedId  }) => {
  const finalRef = React.useRef(null);

  return (
    <Box>
      <Modal finalFocusRef={finalRef} isOpen={onOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose address to deliver</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddressCheckout handleClick={handleClick} selectedId={selectedId}/>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
