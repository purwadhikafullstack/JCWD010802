import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import { DetailProductOrder } from "./ProductOrder"
import formatIDR from "../../../../../helpers/formatIDR";


export const DetailOrder = ({ isOpen, onClose, data }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Order Detail
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <DetailProductOrder data={data} />
                    <Flex w="full" justify="space-between">
                        <Text mt="10px">Shipping Cost:</Text>
                        <Text mt="10px">{formatIDR(data.shippingCost)}</Text>
                    </Flex>
                    <Flex w="full" justify="space-between">
                        <Text fontWeight="bold" mt="10px">Total:</Text>
                        <Text fontWeight="bold" mt="10px">{formatIDR(data.totalPrice + data.shippingCost)}</Text>
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Flex w="full" justifyContent="flex-end">
                        <Button onClick={onClose}>Close</Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}