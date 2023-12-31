import { Button, Flex, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import headersGen from "../../../../../api/headers";
import axios from "../../../../../api/axios";

export const ConfirmOrder = ({ isOpen, onClose, id, reload }) => {
    const token = localStorage.getItem("token")
    const headers = headersGen(token)
    const handleConfirm = async () => {
        try {
            const response = await axios.patch(`/userOrder/confirm/${id}`, {}, { headers })
            toast.success('Your order have arrived', {
                position: 'top-right',
                autoClose: 3000, 
            });
            reload()
            onClose()
        } catch (error) {
            toast.error("Failed to confirm your order arrival", {
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
                    <Heading fontSize="22px">Are you sure your order have arrived?</Heading>
                </ModalBody>
                <ModalFooter>
                    <Flex w="full" justifyContent="flex-end" gap={2}>
                        <Button bg={"red"} color={"white"} onClick={onClose}>Close</Button>
                        <Button bg={"#517664"} color={'white'} _hover={{bg:"#2d3319"}} onClick={handleConfirm}>Confirm</Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}