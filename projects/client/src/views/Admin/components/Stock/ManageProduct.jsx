import { Box, Button, Card, Flex, Heading, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import { Form, Formik } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProductCardModal } from "./ProductCardModal";
import { InputField } from "../../../../components/input/InputField";


export const ManageProduct = ({ data, isOpen, onClose, triggerReload }) => {
    const initialValues = {
        
    }
    const stockSchema = {
        
    }
    return (
        <>
        <ToastContainer />
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Manage Product Stock
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Formik initialValues={initialValues} validationSchema={stockSchema} 
                    >
                        {(props) => (
                            <Flex as={Form} w="full" direction="column">
                                <ProductCardModal data={data} />
                                <Flex w="full" mt="10px" justifyContent="space-between">
                                    <InputField name="stock" id="stock" className="stock" type="number"
                                    label="Add / Reduce Stock" />
                                </Flex>
                                <Flex gap={3} justifyContent="flex-end">
                                    <Button  onClick={onClose} mt={4} bg={"red.500"} color={"white"} _hover={{ bg: "red.700" }}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" mt={4} bg="#517664" color="white" _hover={{ bg: "#2d3319" }}>
                                        Confirm
                                    </Button>
                                </Flex>
                            </Flex>
                        )}
                    </Formik>
                </ModalBody>
            </ModalContent>
        </Modal>
        </>
    )
}