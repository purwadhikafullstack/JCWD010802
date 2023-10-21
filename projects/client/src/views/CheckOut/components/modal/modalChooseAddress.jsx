import React from "react";
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import "react-toastify/dist/ReactToastify.css";
import { AddressCheckout } from "../AddressCheckout";

export const ModalChooseAddress = ({
  id,
  onOpen,
  onClose,
  handleClick,
  address,
  selectedAddress,
  setSelectedAddress,
  reload,
  setReload,
  page,
}) => {
  const finalRef = React.useRef(null);
  return (
    <Box>
      <Modal finalFocusRef={finalRef} isOpen={onOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose address to deliver</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddressCheckout
              handleClick={handleClick}
              address={address}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
              reload={reload}
              setReload={setReload}
              page={page}
            />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
