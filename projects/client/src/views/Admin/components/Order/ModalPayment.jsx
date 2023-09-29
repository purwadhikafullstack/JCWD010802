import { Button, Flex, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"


export const ModalPayment = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Payment Proof</ModalHeader>
                <ModalBody>
                    <Flex justify="center">
                        <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk665Ue9M9kBObLzpjh0TcMmfQR0zkQvF1Hg&usqp=CAU" />
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}