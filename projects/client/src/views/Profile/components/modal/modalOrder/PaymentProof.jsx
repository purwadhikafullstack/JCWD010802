import { Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import axios from "axios"


export const PaymentProof = ({ isOpen, onClose, id }) => {
    const token = localStorage.getItem("token")
    const headers = {
        Authorization: `Bearer ${token}`
    }
    const handleSubmit = async (value) => {
        try {
            const data = new FormData()
            data.append("file", value.file)
            const response = axios.patch(`http://localhost:8000/api/order/payment/${id}`, data, { headers })
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
                Upload Your Payment
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Formik initialValues={{ file: "" }} validationSchema={Yup.object().shape({
                file: Yup.mixed().required("Please attach your payment proof")})}
                onSubmit={(value) => handleSubmit(value)}>
                    {(props) => (
                        <Flex as={Form} direction="column" w="full" gap={3}>
                            <Input type="file" variant="flushed" />
                            <Flex w="full" gap={2} justify="flex-end">
                                <Button onClick={onClose} >Close</Button>
                                <Button bg={"#517664"} color={'white'} _hover={{bg:"#2d3319"}} type="submit">Submit</Button>
                            </Flex>
                        </Flex>
                    )}
                </Formik>
            </ModalBody>
        </ModalContent>
    </Modal> 
    )
}