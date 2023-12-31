import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../../../../api/axios";

export const Accept = ({ requestId, reload, setReload }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAccept = async () => {
    try {
      await axios.patch(`/mutation/accept/${requestId}`)
      setIsModalOpen(false)
      toast.success("Stock request has been accepted")
      setReload(!reload)
    } catch (error) {
      console.log(error);
    }
  }

  const handleAcceptClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button colorScheme="green" onClick={handleAcceptClick}>
        ACCEPT
      </Button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Accept Stock Request</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
  Are you sure you want to <span style={{ fontWeight: 'bold' }}>ACCEPT</span> product request?
</ModalBody>

          <ModalFooter>
            <HStack gap={4}>

            <Button colorScheme="green" onClick={handleAccept}>Yes</Button>
            <Button onClick={handleCloseModal} colorScheme="red">No</Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
