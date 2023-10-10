import axios from '../../../../../api/axios';
import headersGen from '../../../../../api/headers';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Flex, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"

export const CancelOrder = ({ isOpen, onClose, id, reload }) => {
    const token = localStorage.getItem("token")
    const headers = headersGen(token)
    const handleCancel = async () => {
        try {
            const response = await axios.put(`/userOrder/cancel/${id}`, {}, { headers })
            toast.success('You have canceled your order', {
                position: 'top-right',
                autoClose: 3000, 
            });
            reload()
            onClose()
        } catch (error) {
            toast.error("Failed to cancel your order", {
                position: "top-right",
                autoClose: 3000
            })
        }
    }
    return (
        <>
        <ToastContainer />
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Order Detail
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Heading fontSize="22px">Are you sure you want to cancel your order?</Heading>
                </ModalBody>
                <ModalFooter>
                    <Flex w="full" justifyContent="flex-end">
                        <Button onClick={handleCancel}>Confirm</Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}