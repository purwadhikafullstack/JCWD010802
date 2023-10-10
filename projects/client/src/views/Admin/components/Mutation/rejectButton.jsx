import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../../../../api/axios";

export const Reject = ({requestId,reload,setReload})=>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleReject = async() =>{
        try {
            await axios.patch(`/mutation/reject/${requestId}`)
            setIsModalOpen(false)
            toast.success("Stock request has been rejected")
            setReload(!reload)
        } catch (error) {
            console.log(error);
        }
    }
    const handleRejectClick = () => {
        setIsModalOpen(true);
    };

  

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    return( 
        <>
            <Button colorScheme="red" onClick={handleRejectClick}>
                REJECT
            </Button>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Reject Stock Request</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    Are you sure you want to <span style={{ fontWeight: 'bold' }}>REJECT</span> product request?
                    </ModalBody>
                    <ModalFooter>
                        <HStack gap={4}>

                        <Button colorScheme="green" onClick={handleReject}>Yes</Button>
                        <Button onClick={handleCloseModal} colorScheme="red">No</Button>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
    
}