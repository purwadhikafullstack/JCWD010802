import { Box, Button, Card, Flex, Heading, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import { Form, Formik } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProductCardModal } from "./ProductCardModal";
import { InputField } from "../../../../components/input/InputField";
import * as Yup from 'yup';
import axios from 'axios';


export const ManageProduct = ({ data, isOpen, onClose, triggerReload }) => {
    const token = localStorage.getItem("token")
    const initialValues = {
        description: "",
        quantity: "",
        productId: data.productId,
        warehouseId: data.warehouseId,
        stockId: data.id
    }
    const stockSchema = Yup.object().shape({
        description: Yup.string().required('Please enter product description'),
        quantity: Yup.number().required("Please enter product's price"),
    })
    const handleSubmit = async (value) => {
        console.log(value);
        try {
            const response = await axios.patch('http://localhost:8000/api/stock', value, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            onClose()
            triggerReload()
            console.log(response);
        } catch (error) {
            console.log(error);
        }
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
                    <Formik initialValues={initialValues} validationSchema={stockSchema} onSubmit={(value) => {
                        handleSubmit(value)
                    }}
                    >
                        {(props) => (
                            <Flex as={Form} w="full" direction="column">
                                <ProductCardModal data={data} />
                                <InputField name="description" id="description" className="description" type="text"
                                label="Description" />
                                <InputField name="quantity" id="quantity" className="quantity" type="number"
                                label="Add / Reduce Stock" />
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