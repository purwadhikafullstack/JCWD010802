import { Button, Flex, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"


export const ModalPayment = ({ isOpen, onClose, image }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Payment Proof</ModalHeader>
                <ModalBody>
                    <Flex justify="center">
                        <Image src={`${process.env.REACT_APP_BASE_URL}/paymentImg/${image}`} />
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}