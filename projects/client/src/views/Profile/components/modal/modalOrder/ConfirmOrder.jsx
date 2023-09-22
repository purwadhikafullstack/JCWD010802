import { Button, Flex, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import axios from "axios"

export const ConfirmOrder = ({ isOpen, onClose, id }) => {
    const token = localStorage.getItem("token")
    const headers = {
        Authorization: `Bearer ${token}`
    }
    const handleConfirm = async () => {
        try {
            const response = await axios.patch(`http://localhost:8000/api/userOrder/confirm/${id}`, headers)
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Order Detail
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Heading>Are you sure your order have arrived?</Heading>
                </ModalBody>
                <ModalFooter>
                    <Flex w="full" justifyContent="flex-end">
                        <Button onClick={onClose}>Close</Button>
                        <Button onClick={onClose}>Confirm</Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}