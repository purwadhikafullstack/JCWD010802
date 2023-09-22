import { Button, Flex, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import axios from "axios"

export const CancelOrder = ({ isOpen, onClose, id }) => {
    const handleCancel = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/api/userOrder/cancel/${id}`)
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
                    <Heading>Are you sure you want to cancel your order?</Heading>
                </ModalBody>
                <ModalFooter>
                    <Flex w="full" justifyContent="flex-end">
                        <Button onClick={handleCancel}>Confirm</Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}