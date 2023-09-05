import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";


export const ModalLogout = ({onLogout}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box>
          <Button size={"xs"} onClick={onOpen} w="full" 
          variant="ghost" h="40px" color="red">
            Sign Out
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Sign Out</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>Are you sure you want to sign out?</Text>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="red" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button colorScheme="green" onClick={onLogout}>
                  Accept
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
    )
}